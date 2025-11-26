import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { TodosContext } from './context/TodosContext';
import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: ['Alexandria'],
  },
  palette: {
    primary: {
      main: '#dd2c00',
    },
  },
});
const initialTodos = [];
function App() {
  let [todos, setTodos] = useState(initialTodos);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            direction: 'rtl',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#191b1f',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
