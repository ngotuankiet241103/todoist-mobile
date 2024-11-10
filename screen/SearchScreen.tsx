import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";
import BaseApp from "../components/layout/BaseApp";
import DetaiTask from "../components/task/DetaiTask";
import { useSelector } from "react-redux";
import { state } from "../redux/store";
import axios from "axios";
import requestApi, { updateMethod } from "../helper/api";

interface Task {
  id: number;
  title: string;
  code: string;
  description: string;
  expiredAt: string;
  priority: Priority;
  project: Project;
  completed: boolean;
  section: null | Section;
  labels: Label[];
}

interface Priority {
  id: number;
  name: string;
  code: string;
  level: string;
}

interface Project {
  id: number;
  name: string;
  code: string;
  task_all: number;
}

interface Section {}

interface Label {}

interface RecentlyVisited {
  id: string;
  title: string;
  icon: string;
  screen: string;
}

export interface SearchPageProps {
  navigation: any;
}
const allProjectsOption: Project = {
  id: 0,
  name: "All",
  code: "All",
  task_all: 0,
};

const SearchPage: React.FC<SearchPageProps> = ({ navigation }) => {
  const key = "search";
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentlyVisited, setRecentlyVisited] = useState<RecentlyVisited[]>([
    { id: "1", title: "Home", icon: "home", screen: "Today" },
    { id: "2", title: "Upcoming", icon: "event", screen: "Upcoming" },
    { id: "3", title: "Today", icon: "today", screen: "Today" },
  ]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedProjectCode, setSelectedProjectCode] = useState<string>("All");
  const [taskBeingChecked, setTaskBeingChecked] = useState<string | null>(null);
  const detail = useSelector((state: state) => state.detail);
  const { isShow: showModal, task: taskDetail } = detail;
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const fetchTasks = async (page: number) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aWVuQGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTczMDc5OTExNCwiZXhwIjoxNzMxNDAzOTE0fQ.NnNS2HxxO0yOZKAlHFAwB6mDxBQ6j8wiGaewAq91hFI";
    setLoadingMore(true);
    try {
      const response = await requestApi(`/tasks/all?page=${page}&limit=6`,"GET","")
     
      setTasks((prevTasks) => [...prevTasks, ...response.data]);
      setShowCompletedTasks(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to fetch tasks:", error.response?.data?.message);
      } else {
        console.error("Error fetching tasks:", error);
      }
    } finally {
      setLoadingMore(false);
    }
  };
  const fetchProjects = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aWVuQGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTczMDc5OTExNCwiZXhwIjoxNzMxNDAzOTE0fQ.NnNS2HxxO0yOZKAlHFAwB6mDxBQ6j8wiGaewAq91hFI";

    try {
      const response = await requestApi("/projects","GET","");
      // axios.get(
      //   "http://192.168.1.8:8080/api/v1/projects",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      console.log(response.data);
      setProjects([allProjectsOption, ...response.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to fetch projects:",
          error.response?.data?.message
        );
      } else {
        console.error("Error fetching projects:", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks(page);
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [debouncedQuery]);

  const handleSearchChange = (query: string) => setSearchQuery(query);

  const handleItemPress = (screen: string) => {
    navigation.navigate(screen);
  };

  const filterTasks = (tasks: Task[], projectCode: string, query: string) => {
    let filtered = tasks;

    if (projectCode !== "All") {
      filtered = filtered.filter((task) => task.project.code === projectCode);
    }
    if (query) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    filterTasks(tasks, selectedProjectCode, debouncedQuery);
  }, [selectedProjectCode, debouncedQuery, tasks]);

  const handleProjectSelect = (projectCode: string) => {
    setSelectedProjectCode(projectCode);
  };

  const toggleShowCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };
  const loadMoreTasks = () => {
    setPage((prevPage) => prevPage + 1);
    fetchTasks(page + 1);
  };

  const handleCheckboxToggle = async (taskId: string) => {
    try {
      // Trigger haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Optimistically update the checkedTasks state
      setCheckedTasks((prevCheckedTasks) => ({
        ...prevCheckedTasks,
        [taskId]: !prevCheckedTasks[taskId],
      }));

      // API call to update the task's completion status on the server
      const response = await updateMethod("/tasks/completed",{id: taskId}) 
      // axios.put(
      //   `http://192.168.1.8:8080/api/v1/tasks/completed`,
      //   { id: taskId },
      //   {
      //     headers: {
      //       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aWVuQGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTczMDc5OTExNCwiZXhwIjoxNzMxNDAzOTE0fQ.NnNS2HxxO0yOZKAlHFAwB6mDxBQ6j8wiGaewAq91hFI`,
      //     },
      //   }
      // );

      if (response &&  response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id.toString() === taskId ? { ...task, completed: true } : task
          )
        );

        setFilteredTasks((prevFilteredTasks) =>
          prevFilteredTasks.map((task) =>
            task.id.toString() === taskId ? { ...task, completed: true } : task
          )
        );
      } else {
        console.error("Failed to update task completion status on the server.");
      }
    } catch (error) {
      setCheckedTasks((prevCheckedTasks) => ({
        ...prevCheckedTasks,
        [taskId]: !prevCheckedTasks[taskId],
      }));

      if (axios.isAxiosError(error)) {
        console.error("Failed to update task:", error.response?.data?.message);
      } else {
        console.error("Error updating task:", error);
      }
    }
  };

  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <View style={styles.container}>
      {taskDetail ? (
        <DetaiTask task={taskDetail} />
      ) : (
        <BaseApp page="search" label={searchQuery}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <View style={styles.searchBarContainer}>
                <Icon
                  name="search"
                  color="#bcbcbc"
                  size={23}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchBar}
                  placeholder="Tasks, project, and more..."
                  placeholderTextColor="#ddd"
                  value={searchQuery}
                  onChangeText={handleSearchChange}
                />
              </View>

              {/* Project Filter */}
              {searchQuery.length > 0 && (
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={styles.categoryContainer}
                >
                  {projects.map((project) => (
                    <TouchableOpacity
                      key={project.code}
                      style={[
                        styles.categoryButton,
                        selectedProjectCode === project.code &&
                          styles.selectedCategoryButton,
                      ]}
                      onPress={() => handleProjectSelect(project.code)}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          selectedProjectCode === project.code &&
                            styles.selectedCategoryText,
                        ]}
                      >
                        {project.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              {searchQuery.length > 0 ? (
                <ScrollView
                  style={[styles.taskContainer]}
                  contentContainerStyle={{ flexGrow: 1 }}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Task</Text>
                  </View>
                  <View>
                    {filteredTasks.length > 0 ? (
                      filteredTasks
                        .filter((task) => !task.completed)
                        .map((task) => (
                          <View key={task.id} style={styles.taskItem}>
                            <TouchableOpacity
                              style={styles.taskContent}
                              onPress={() =>
                                handleCheckboxToggle(task.id.toString())
                              }
                            >
                              <Icon
                                name={
                                  checkedTasks[task.id]
                                    ? "check-circle"
                                    : "radio-button-unchecked"
                                }
                                size={26}
                                color={
                                  checkedTasks[task.id] ? "#75b5f4" : "#ccc"
                                }
                              />
                              <View style={styles.taskDetails}>
                                <Text style={styles.taskTitle}>
                                  {task.title}
                                </Text>
                                <Text style={styles.taskDescription}>
                                  {task.description}
                                </Text>
                                <Text style={styles.taskTime}>
                                  {new Date(task.expiredAt).toLocaleString(
                                    "vi-VN"
                                  )}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        ))
                    ) : (
                      <Text style={styles.noResultsText}>
                        No matching tasks found
                      </Text>
                    )}

                    {filteredTasks.length >= page * 6 && (
                      <View style={styles.filterContainer}>
                        <TouchableOpacity
                          style={styles.listItem}
                          onPress={loadMoreTasks}
                          disabled={loadingMore}
                        >
                          <Text style={styles.SearchText}>
                            {loadingMore ? "Loading..." : "Show more tasks"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity onPress={toggleShowCompletedTasks}>
                    {showCompletedTasks ? (
                      <View style={styles.filterContainer}>
                        <View style={styles.listItem}>
                          <Icon
                            name="search"
                            color="#ea3f3f"
                            size={27}
                            style={{ marginRight: 7 }}
                          />
                          <Text style={styles.SearchText}>
                            Search complete task
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </TouchableOpacity>

                  {completedTasks.length > 0 && !showCompletedTasks && (
                    <View style={styles.completedTasksContainer}>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Complete task</Text>
                      </View>
                      {completedTasks.map((task) => (
                        <View key={task.id} style={styles.taskItem}>
                          <TouchableOpacity style={styles.taskContent}>
                            <Icon name="check-circle" size={26} color="#ccc" />
                            <View style={styles.taskDetails}>
                              <Text style={styles.completedTaskText}>
                                {task.title}
                              </Text>
                              <Text style={styles.taskDescription}>
                                {task.description}
                              </Text>
                              <Text style={styles.taskTime}>
                                {new Date(task.expiredAt).toLocaleString(
                                  "vi-VN"
                                )}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </ScrollView>
              ) : (
                <View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recently Visited</Text>
                  </View>
                  <FlatList
                    data={recentlyVisited}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleItemPress(item.screen)}
                      >
                        <View style={styles.listItem}>
                          <Icon
                            name={item.icon}
                            type="material"
                            color="#c62d2d"
                            size={20}
                            style={styles.listItemIcon}
                          />
                          <Text style={styles.listItemText}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </BaseApp>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    margin: 15,
    paddingLeft: 15,
    borderColor: "#bcbcbc",
    borderWidth: 2,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    height: 45,
    color: "#444",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  categoryContainer: {
    paddingVertical: 10,
    width: "100%",
  },
  categoryButton: {
    minWidth: 80,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#444",
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: "#ea3f3f",
  },
  categoryText: {
    color: "#fff",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskContainer: {
    maxHeight: "100%",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  taskDetails: {
    marginLeft: 12,
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  taskTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  filterText: {
    marginTop: 10,
    marginLeft: 15,
    color: "#ea3f3f",
    fontSize: 16,
  },
  noResultsText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  sectionHeader: {
    paddingHorizontal: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#444",
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  listItemIcon: {
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
    color: "#444",
  },
  SearchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  SearchText: {
    fontSize: 20,
    color: "#ea3f3f",
  },
  completedTasksContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "#888",
    fontSize: 18,
  },
});
export default SearchPage;
