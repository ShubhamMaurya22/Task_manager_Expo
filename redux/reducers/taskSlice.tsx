import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'

interface Task {
    id: string;
    title: string;
    description: string;
    startDate: string;  
    endDate: string;    
    isCompleted: boolean;
  }
  
  interface InitialProps {
    tasks: Task[];
  }

const initialState: InitialProps = {
    tasks : []
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers :{
        addTask : (state , action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
              state.tasks[index] = action.payload;
            }
          },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
          },
        },
      });
      
export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer