import { configureStore } from "@reduxjs/toolkit";

import userSlice, { User } from "./reducer/userSlice";
import projectSlice, { Project } from "./reducer/projectSlice";
import taskSlice, { TaskSlice } from "./reducer/taskSlice";
import labelSlice, { LabelSlice } from "./reducer/labelSlice";
import taskDetailSlice, { TaskDetail } from "./reducer/taskDetailSlice";
import stateSlice, { stateApp } from "./reducer/stateSlice";
import tasksSlice, { TasksSlice } from "./reducer/tasksSlice";
import prioritySlice, { PrioritySlice } from "./reducer/prioritySlice";
import searchSlice, { SearchSlice } from "./reducer/searchSlice";
export type state = {
    user: User
    project: Project
    task: TaskSlice
    label: LabelSlice
    detail: TaskDetail
    status: stateApp,
    tasks: TasksSlice
    priority: PrioritySlice
    search: SearchSlice
}
export const store = configureStore<state>({
    reducer: {
        user: userSlice,
        project: projectSlice,
        task: taskSlice,
        label: labelSlice,
        detail: taskDetailSlice,
        status: stateSlice,
        tasks: tasksSlice,
        priority: prioritySlice,
        search: searchSlice
    },
    
})