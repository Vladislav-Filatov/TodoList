import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../modules/TodoList/api/serverData/taskList.ts";
import {Status, Prioroty} from "../types.ts";
import {taskList} from "../modules/TodoList/api/serverData/taskList.ts";

interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: taskList,
}

const getNextStatus = (status: Status)=> {
  switch (status) {
    case Status.TODO:
      return {
        status: Status.PROGRESS,
        progress: 50,
      };
    case Status.PROGRESS:
      return {
        status: Status.DONE,
        progress: 100,
      };
    case Status.DONE:
      return {
        status: Status.TODO,
        progress: 0,
      };
  }
};

const tasksSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{title: string; priority: Prioroty}>
    ) => {
      const newTask: Task = {
        id: String(Date.now()),
        title: action.payload.title,
        priority: action.payload.priority,
        status: Status.TODO,
        progress: 0,
      };

      state.tasks.unshift(newTask);
    },

    editTask: (
      state,
      action: PayloadAction<{id: string; title: string; priority: Prioroty}>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (!task) return;

      task.title = action.payload.title;
      task.priority = action.payload.priority;
    },

    deleteTask: (
      state,
      action: PayloadAction<{id: string}>
    ) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },

    changeStatus: (
      state,
      action: PayloadAction<{id: string}>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (!task) return;

      const nextStatus = getNextStatus(task.status);
      task.status = nextStatus.status;
      task.progress = nextStatus.progress;
    }
  }
});

export const {addTask, editTask, deleteTask, changeStatus} = tasksSlice.actions;
export default tasksSlice.reducer;