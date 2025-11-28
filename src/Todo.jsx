import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ToastContext } from './context/ToastContext';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useContext, useState } from 'react';
import { TodosContext } from './context/TodosContext';
// dialog- imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function Todo({ todo }) {
  let [showDeleteDialog, setShowDeleteDialog] = useState(false);
  let [updateDilog, setUpdateDilog] = useState(false);
  let [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  let { todos, setTodos } = useContext(TodosContext);
  let { showHideToast } = useContext(ToastContext);
  // handel check click
  function handleCheckClick() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showHideToast('تم التعديل بنجاح');
  }
  // ===========handel check click
  // handel Delete Click

  function handelDeleteClick() {
    setShowDeleteDialog(true);
  }
  function haneleDeleteDilogClose() {
    setShowDeleteDialog(false);
  }
  function handelDeleteConfirm() {
    let updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showHideToast('تم الحذف بنجاح');
  }
  // ==============handel Delete Click
  // handel update click
  function handelUpdeteClick() {
    setUpdateDilog(true);
  }
  function haneleUpdateClose() {
    setUpdateDilog(false);
  }
  function handelUpdateConfirm() {
    let updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    haneleUpdateClose();
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showHideToast('تم التحديث بنجاح');
  }
  // ===============handel update click
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={haneleUpdateClose}>إغلاق</Button>
          <Button autoFocus onClick={handelUpdateConfirm}>
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* ========update dialog======= */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: 'white',
          borderRadius:"7px",
         
          color: 'black',
          marginTop: '10px',
        }}
      >
        <CardContent >
          <Grid container >
            <Grid size={7.8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'right',
                  textDecoration: todo.isCompleted ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h5" sx={{ textAlign: 'right' }}>
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              size={4}
              
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* check */}
              <IconButton
                sx={{
                  width: { xs: 35, sm: 45 },
                  height: { xs: 35, sm: 45 },
                }}
                onClick={handleCheckClick}
                className="iconButton"
                aria-label="check"
                style={{
                  color: todo.isCompleted ? 'white' : '#8bc34a',
                  background: todo.isCompleted ? '#8bc34a' : 'white',
                  border: 'solid #8bc34a 3px',
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* edit */}
              <IconButton
                sx={{
                  width: { xs: 35, sm: 45 },
                  height: { xs: 35, sm: 45 },
                }}
                onClick={handelUpdeteClick}
                className="iconButton"
                aria-label="edit"
                style={{
                  color: '#1769aa',
                  background: 'white',
                  border: 'solid #1769aa 3px',
                }}
              >
                <EditOutlinedIcon />
              </IconButton>

              {/* delete */}
              <IconButton
                sx={{
                  width: { xs: 35, sm: 45 },
                  height: { xs: 35, sm: 45 },
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: '#b23c17',
                  background: 'white',
                  border: 'solid #b23c17 3px',
                }}
                onClick={handelDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
