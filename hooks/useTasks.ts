import { useEffect, useState } from "react";
import { TaskListResponse } from "../components/task/TaskList";
import { useSelector } from "react-redux";
import { state } from "../redux/store";
import requestApi from "../helper/api";
import { LabelSlice } from "../redux/reducer/labelSlice";
import { SectionItem } from "../components/form/FormProject";
import { priority } from "../components/form/FormPriority";
import { useDispatch } from "react-redux";
import {
  TaskSliceKey,
  TasksSlice,
  setTasks,
} from "../redux/reducer/tasksSlice";
import { formatDate } from "../utils/formatDate";
import { Filter } from "../redux/reducer/stateSlice";

const useTasks = (
  type: TaskSliceKey,
  group: group,
  filter?: Filter,
  projectCode?: string,
  labelCode?: string
) => {
  const isRender = useSelector((state: state) => state.status.isRender);
  const task = useSelector((state: state) => state.tasks[`${type}`]);
  const label = useSelector((state: state) => state.label);
  const priority = useSelector((state: state) => state.priority);
  const [sections, setSection] = useState<SectionItem[]>([]);
  const [titles, setTitle] = useState<string[]>();
  const dispatch = useDispatch();
  const currentDate = new Date();

  const daysToAdd = 18;
  currentDate.setDate(currentDate.getDate() + daysToAdd);
  const [upcoming, setUpcoming] = useState<{ [key in "from" | "to"]: string }>({
    from: "",
    to: formatDate(currentDate),
  });
  console.log(filter);
  const converArrToStr = (values: string[]) => {
    return values
      ? values.length > 0
        ? values
            .map((value, index, arr) =>
              index === arr.length - 1 ? value : `${value},`
            )
            .join("")
        : ""
      : "";
  };
  useEffect(() => {
    
    const handleUpdateTask = (taskO: Task) => {
      const data: ProjectGroup = taskO.getTask(group);
      setTitle(taskO.getTitle(group));
       
      dispatch(setTasks({ key: type, data}));
    };
    const handleTask = async () => {
      try {
        if (type == "project") {
          console.log(converArrToStr(filter ? filter.priorityCode : []));

          const response = await requestApi(
            `/tasks/${projectCode}?priorityCode=${
              filter ? converArrToStr(filter.priorityCode) : ""
            }&labelCode=${filter ? converArrToStr(filter.labelCode) : ""}`,
            "GET"
          );
          console.log(response);

          const sectionResponse = await requestApi(
            `/sections/${projectCode}`,
            "GET"
          );
          if (response.status === 200 && sectionResponse.status === 200) {
            console.log(sectionResponse.data);
            setSection(sectionResponse.data);
            console.log(priority);

            const taskO = new Task(
              type,
              response.data,
              label,
              priority,
              projectCode,
              sectionResponse.data
            );
            handleUpdateTask(taskO);
          }
        } else if (type == "today") {
          const date = formatDate(new Date());
          console.log(filter);
          
          const response = await requestApi(
            `/tasks?expired_at=${date}&priorityCode=${
              filter ? converArrToStr(filter.priorityCode) : ""
            }&labelCode=${filter ? converArrToStr(filter.labelCode) : ""}`,
            "GET",
            ""
          );
          console.log(response.status);
          
          if (response.status === 200) {
            const taskO = new Task(
              type,
              response.data,
              label,
              priority,
              projectCode
            );
            handleUpdateTask(taskO);
          }
        } else if (type === "upcoming") {
          const response = await requestApi(
            `/tasks/upcoming?from=${upcoming.from}&to=${
              upcoming.to
            }&priorityCode=${
              filter ? converArrToStr(filter.priorityCode) : ""
            }&labelCode=${filter ? converArrToStr(filter.labelCode) : ""}`,
            "GET",
            ""
          );
        

          if (response.status === 200) {
            const taskO = new Task(
              type,
              response.data,
              label,
              priority,
              projectCode
            );
            taskO.setCurrenDay(upcoming.from);

            handleUpdateTask(taskO);
          }
        } else if(type === "label" && labelCode){
          const response = await requestApi(
            `/tasks/label/${labelCode}?priorityCode=${
              filter ? converArrToStr(filter.priorityCode) : ""
            }&labelCode=${filter ? converArrToStr(filter.labelCode) : ""}`,
            "GET"
          );
         
          
          if(response.status === 200){
            
            
            const taskO = new Task(
              type,
              response.data,
              label,
              priority,
              projectCode
            );
            taskO.setLabelCode(labelCode);
          
            taskO.setLabels(label);
            handleUpdateTask(taskO);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleTask();
  }, [projectCode, group, filter, upcoming, isRender]);

  return {
    task,
    titles,
    sections,
    upcoming,
    setUpcoming,
  };
};
// projectCode, group, filter, upcoming, isRender
export type ProjectGroupKey = "default" | "priority" | "due date";
export type ProjectGroupKeyEx = "project" | ProjectGroupKey;
export type group = ProjectGroupKeyEx | "default";
type ProjectGroup = {
  [key: string]: TaskListResponse | [];
};

type ProjectGroupExpand = ProjectGroup & {
  [key in ProjectGroupKeyEx]: TaskListResponse[] | [];
};
type ProjectCommon = {
  [key in group]: () => ProjectGroup;
};
class Task {
  private tasks: TaskListResponse;
  private label: LabelSlice;
  private sections: SectionItem[] | undefined;
  private priority: priority[];
  private projectCode?: string;
  private type: TaskSliceKey;
  private curDay: Date;
  private titles: string[] = [];
  private labelCode?: string;
  private labels: LabelSlice
  constructor(
    type: TaskSliceKey,
    task: TaskListResponse,
    label: LabelSlice,
    priority: priority[],
    projectCode?: string,
    sections?: SectionItem[]
  ) {
    this.type = type;
    this.tasks = task;
    this.label = label;
    this.sections = sections;
    this.projectCode = projectCode;
    this.priority = priority;
  }
  public setLabelCode(code: string){
    this.labelCode = code;
  }
  public setLabels(labels : LabelSlice){
    this.labels = labels;
  }
  public setCurrenDay(date: string) {
    this.curDay = date ? new Date(date) : new Date();
  }
  public getTask(group: group) {
    const handlePageProject: ProjectCommon = {
      default: () => {
        if (this.type === "project" && this.projectCode) {
          const response: TasksSlice = {
            [this.projectCode]: this.tasks.filter(
              (task) => task.project.code == this.projectCode && !task.section
            ),
          };
          console.log(this.sections);

          const data =
            this.sections &&
            this.sections.reduce((prev, section) => {
              console.log(section.code);

              return {
                ...prev,
                [section.code]: this.tasks.filter((task) =>
                  task.section ? task.section.code === section.code : false
                ),
              };
            }, {});

          return {
            ...response,
            ...data,
          };
        } else if (this.type === "today") {
          let response: ProjectGroup = {};
          response =
            this.tasks &&
            this.tasks.reduce((prev, task): ProjectGroup => {
              const date = new Date(task.expiredAt);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              if (date > currentDate) {
                if (!prev[`Today-${formatDate(date)}`]) {
                  return {
                    ...prev,
                    [`Today-${formatDate(date)}`]: [task],
                  };
                } else {
                  return {
                    ...prev,
                    [`Today-${formatDate(date)}`]: [
                      ...prev[`Today-${formatDate(date)}`],
                      task,
                    ],
                  };
                }
              } else {
                if (!prev["over date"]) {
                  return {
                    ...prev,
                    [`over date`]: [task],
                  };
                } else {
                  return {
                    ...prev,
                    [`over date`]: [...prev["over date"], task],
                  };
                }
              }
            }, response);
          return {
            ...response,
          };
        } else if(this.type === "upcoming") {
          let response: ProjectGroup = {};
          for (let i = 0; i <= 17; i++) {
            const newDate: Date = new Date(this.curDay);
            newDate.setDate(newDate.getDate() + i);

            response = {
              ...response,
              [`${formatDate(newDate)}`]: [],
            };
          }
          response =
            this.tasks.length > 0
              ? this.tasks.reduce(
                  (prev, task): ProjectGroup => {
                    const date = new Date(task.expiredAt);
                    if (!prev[`${formatDate(date)}`]) {
                      if (!prev["over date"]) {
                        this.titles.push("over date");
                        return {
                          [`over date`]: [task],
                          ...prev,
                        };
                      } else {
                        return {
                          ...prev,
                          [`over date`]: [...prev["over date"], task],
                        };
                      }
                    } else {
                      return {
                        ...prev,
                        [`${formatDate(date)}`]: [task],
                      };
                    }
                  },
                  { ...response }
                )
              : response;
          return {
            ...response,
          };
        }
        else{
      
          
          const response : ProjectGroup =  this.tasks.length > 0 ? {[this.labelCode ?? ""]: this.tasks} : {};
          return {
            ...response
          }
        }
      },
      priority: () => {
        return this.priority.reduce((prev, priority) => {
          return {
            ...prev,
            [priority.code]: this.tasks.filter(
              (task) => task.priority.id == priority.id
            ),
          };
        }, {});
      },
      "due date": () => {
        console.log(this.tasks);

        let response: ProjectGroup = {};
        response = this.tasks.reduce((prev, task): ProjectGroup => {
          if (!task.expiredAt) {
            if (!prev["no date"]) {
              return {
                ...prev,
                "no date": [task],
              };
            }
            return {
              ...prev,
              "no date": [...prev["no date"], task],
            };
          } else {
            const date = new Date(task.expiredAt);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (date > currentDate) {
              if (!prev[formatDate(date)]) {
                return {
                  ...prev,
                  [formatDate(date)]: [task],
                };
              } else {
                const key = formatDate(date);
                return {
                  ...prev,
                  [key]: [...prev[key], task],
                };
              }
            } else {
              return prev["over date"]
                ? { ...prev, "over date": [...prev["over date"], task] }
                : { ...prev, "over date": [task] };
            }
          }
        }, response);
     

        return {
          ...response,
        };
      },
    };
    return handlePageProject[`${group}`]();
  }
  public getTitle(group: string) {
    const handleProjectTitle: {
      [key: string]: () => string[];
    } = {
      default: () => {
        if (this.type == "project") {
          return (
            (this.sections &&
              this.sections.reduce(
                (prev, section) => [...prev, section.name],
                [this.projectCode.substring(0, this.projectCode.indexOf("-"))]
              )) ||
            []
          );
        } else if (this.type == "today") {
          let titles: { [key: string]: boolean } = {};
          titles = this.tasks.reduce((prev, task) => {
            const date = new Date(task.expiredAt);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (date > currentDate) {
              if (!titles[`${task.expiredAt}`]) {
                return {
                  ...prev,
                  [`${formatDate(new Date(date))}`]: true,
                };
              } else {
                return {
                  ...prev,
                };
              }
            } else {
              return titles["over date"]
                ? { ...titles }
                : { ...titles, "due date": true };
            }
          }, {});
          return Object.keys(titles);
        } else if(this.type === "upcoming") {
          for (let i = 0; i <= 17; i++) {
            const newDate: Date = new Date(this.curDay);

            newDate.setDate(newDate.getDate() + i);

            this.titles.push(formatDate(newDate));
          }
          return this.titles;
        }
        else{
          const label = this.label.find(label => label.code===this.labelCode);
          const key = label ?label.name : "";
          return [key];
        }
      },
      priority: () => {
        return this.priority.map((item) => item.name);
      },
      "due date": () => {
      
        let titles: { [key: string]: boolean } = {};
        titles = this.tasks.reduce((prev, task) => {
          if (!task.expiredAt) {
           
            if (titles["no date"]) {
              return {
                ...prev,
              };
            }
            return {
              ...prev,
              "no date": true,
            };
          } else {
            const date = new Date(task.expiredAt);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (date > currentDate) {
              if (!prev[`${task.expiredAt}`]) {
                return {
                  ...prev,
                  [formatDate(new Date(date))]: true,
                };
              } else {
                return {
                  ...prev,
                };
              }
            } else {
              return prev["over date"]
                ? { ...prev }
                : { ...prev, "over date": true };
            }
          }
        }, titles);
      

        return Object.keys(titles);
      },
    };
    return handleProjectTitle[`${group}`];
  }
}

export default useTasks;
