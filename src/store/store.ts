import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from './tasksSlice.ts'
import todoUiReducer from './todoUiSlice.ts'


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todoUi: todoUiReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;