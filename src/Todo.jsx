import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ToastContext } from './context/ToastContext';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useContext } from 'react';
import { TodosContext } from './context/TodosContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Todo({ todo, showDelete, showUpdate }) {
  let { todos, setTodos } = useContext(TodosContext);
  let { showHideToast } = useContext(ToastContext);

  function handleCheckClick() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showHideToast('تم التعديل بنجاح');
  }

  function handelDeleteClick() {
    showDelete(todo);
  }

  function handelUpdeteClick() {
    showUpdate(todo);
  }

  return (
    <Card
      className="todoCard"
      sx={{
        minWidth: 275,
        background: 'white',
        borderRadius: '7px',
        color: 'black',
        mt: 1,
      }}
    >
      <CardContent>
        <Grid container>
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
            <Typography variant="body1" sx={{ textAlign: 'right' }}>
              {todo.details}
            </Typography>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              sx={{
                width: { xs: 35, sm: 45 },
                height: { xs: 35, sm: 45 },
              }}
              onClick={handleCheckClick}
              aria-label="check"
              style={{
                color: todo.isCompleted ? 'white' : '#8bc34a',
                background: todo.isCompleted ? '#8bc34a' : 'white',
                border: 'solid #8bc34a 3px',
              }}
            >
              <CheckIcon />
            </IconButton>

            <IconButton
              sx={{
                width: { xs: 35, sm: 45 },
                height: { xs: 35, sm: 45 },
              }}
              onClick={handelUpdeteClick}
              aria-label="edit"
              style={{
                color: '#1769aa',
                background: 'white',
                border: 'solid #1769aa 3px',
              }}
            >
              <EditOutlinedIcon />
            </IconButton>

            <IconButton
              sx={{
                width: { xs: 35, sm: 45 },
                height: { xs: 35, sm: 45 },
              }}
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
  );
}
