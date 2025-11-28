import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// components
import Todo from './Todo';
// others
import { v4 as uuidv4 } from 'uuid';
// hooks
import { TodosContext } from './context/TodosContext';
import { useState, useContext, useEffect } from 'react';
import { ToastContext } from './context/ToastContext';
export default function TodoList() {
  let { todos, setTodos } = useContext(TodosContext);
  let { showHideToast } = useContext(ToastContext);
  let [titleInput, setTitleInput] = useState('');
  let [displayedTodosType, setDisplayedTodosType] = useState('all');

  //  filteration arrays
  let completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  let notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todosToBeRendered = todos;
  if (displayedTodosType == 'completed') {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == 'non-completed') {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  let todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos')) || []);
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handelAddClick() {
    if (!titleInput.trim()) return;

    let newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: '',
      isCompleted: false,
    };
    let updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTitleInput('');
    showHideToast('تم الاضافة بنجاح');
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="ml">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: '80vh',
            overflow: 'scroll',
          }}
        >
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: 'bold' }}>
              مهامي
            </Typography>
            <Divider />
            {/* filter buttons */}
            <ToggleButtonGroup
              style={{ direction: 'ltr', marginTop: '30px' }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="non-completed">غير منجز</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/*========= filter buttons ==========*/}
            {/* All todos */}
            {todosJsx}
            {/* =========All todos========= */}
            {/* Input + Add Button */}
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              <Grid
                
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                  style={{ width: '100%' }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                />
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  onClick={() => {
                    handelAddClick();
                  }}
                  variant="contained"
                  style={{ height: '100%', width: '100%' }}
                  disabled={titleInput.length <= 0}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {/*==== Input + Add Button ====*/}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
