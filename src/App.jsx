import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { TodosContext } from './context/TodosContext';
import { createTheme, ThemeProvider } from '@mui/material';
import MySnackBar from './MySnackBar';
import { ToastProvider } from './context/ToastContext';
const theme = createTheme({
  typography: {
    fontFamily: ['Alexandria'],
  },
  palette: {
    primary: {
      main: 'rgb(139, 195, 74)',
    },
  },
});
const initialTodos = [];
function App() {
  let [todos, setTodos] = useState(initialTodos);


  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider >
          <div
            style={{
              direction: 'rtl',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#ffffffff',
              alignItems: 'center',
              height: '100vh',
            }}
          >
           
            <TodosContext.Provider value={{ todos, setTodos }}>
              <TodoList />
            </TodosContext.Provider>
          </div>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
