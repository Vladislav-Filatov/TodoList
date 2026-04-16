import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../modules/TodoList/api/serverData/taskList.ts";

interface TodoUiState {
  editingTask: Task | null
  taskToDelete: Task | null
  showAddEditModal: boolean
  showDeleteModal: boolean
}

const initialState: TodoUiState = {
  editingTask: null,
  taskToDelete: null,
  showAddEditModal: false,
  showDeleteModal: false,
}

const todoUiSlice = createSlice({
  name: 'todoUi',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.editingTask = null;
      state.showAddEditModal = true;
    },

    openEditModal: (state, action: PayloadAction<Task | null>) => {
      state.editingTask = action.payload;
      state.showAddEditModal = true;
    },

    openDeleteModal: (state, action: PayloadAction<Task | null>) => {
      state.taskToDelete = action.payload;
      state.showDeleteModal = true;
    },

    closeAddEditModal: (state) => {
      state.showAddEditModal = false;
      state.editingTask = null;
    },

    closeDeleteModal: (state) => {
      state.showDeleteModal = false;
      state.taskToDelete = null;
    }
  }
});

export const {openAddModal, openDeleteModal, openEditModal, closeAddEditModal, closeDeleteModal} = todoUiSlice.actions;
export default todoUiSlice.reducer;