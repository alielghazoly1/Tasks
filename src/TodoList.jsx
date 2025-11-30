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
import { useState, useContext, useEffect, useMemo } from 'react';
import { ToastContext } from './context/ToastContext';
// dialog- imports

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function TodoList() {
  let [showDeleteDialog, setShowDeleteDialog] = useState(false);
  let [updateDilog, setUpdateDilog] = useState(false);
  let [updatedTodo, setUpdatedTodo] = useState({ title: '', details: '' });
  let { todos, setTodos } = useContext(TodosContext);
  let { showHideToast } = useContext(ToastContext);
  let [dialogTodo, setDilogTodo] = useState(null);
  let [titleInput, setTitleInput] = useState('');
  let [displayedTodosType, setDisplayedTodosType] = useState('all');
  let completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  //  filteration arrays
  let notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);
  let todosToBeRendered = todos;
  if (displayedTodosType == 'completed') {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == 'non-completed') {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos')) || []);
  }, []);

  // handelers=========

  function openDeleteDialog(todo) {
    setDilogTodo(todo);
    setShowDeleteDialog(true);
  }
  function openUpdateDialog(todo) {
    setDilogTodo(todo);
    setUpdatedTodo({ title: todo.title, details: todo.details });
    setUpdateDilog(true);
  }

  function haneleDeleteDilogClose() {
    setShowDeleteDialog(false);
  }
  function handelDeleteConfirm() {
    let updatedTodos = todos.filter((t) => {
      return t.id !== dialogTodo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showHideToast('تم الحذف بنجاح');
    setShowDeleteDialog(false);
  }

  function haneleUpdateClose() {
    setUpdateDilog(false);
  }
  function handelUpdateConfirm() {
    let updatedTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showHideToast('تم التحديث بنجاح');
    setUpdateDilog(false);
  }
  // handelers=========
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
  let todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <>
      {/* delete dialog */}
      <Dialog
        style={{ direction: 'rtl' }}
        onClose={haneleDeleteDilogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={haneleDeleteDilogClose}>إغلاق</Button>
          <Button autoFocus onClick={handelDeleteConfirm}>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ========delete dialog======= */}
      {/*update dialog */}
      <Dialog
        style={{ direction: 'rtl' }}
        onClose={haneleUpdateClose}
        open={updateDilog}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            required
            margin="dense"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={haneleUpdateClose}>إغلاق</Button>
          <Button autoFocus onClick={handelUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      {/* ========update dialog======= */}

      <CssBaseline />
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275, background: '#910773ff' }}
          style={{
            maxHeight: '80vh',
            overflow: 'scroll',
          }}
        >
          <CardContent>
            <Typography
              variant="h2"
              style={{ fontWeight: 'bold', color: 'white' }}
            >
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
                <Grid size={8} display="flex" alignItems="center">
                  <TextField
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    style={{ width: '100%' }}
                    label="عنوان المهمة"
                    variant="outlined"
                  />
                </Grid>
                <Grid size={4} display="flex" alignItems="center">
                  <Button
                    onClick={handelAddClick}
                    variant="contained"
                    style={{ width: '100%', height: '100%' }}
                    disabled={!titleInput.trim()}
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
