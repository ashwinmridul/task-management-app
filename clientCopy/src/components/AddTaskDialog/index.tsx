import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddTaskProps } from './types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { API_URL } from '../../constants';
import { StatusTypes } from '../../types';
import { AuthContext } from '../../services/AuthService';
import axios, { AxiosError } from 'axios';
import { errorHandler } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../services/AlertService';

const AddTaskDialog: React.FC<AddTaskProps> = ({onAdd, handleClose, open}) => {
  const { token, logout } = React.useContext(AuthContext);
  const { dispatchAlert } = React.useContext(AlertContext);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            try {
              const response = await axios.post(`${API_URL}/tasks`, {...formJson, status: StatusTypes.todo}, {headers: {token}});
              onAdd(response.data.task);
              dispatchAlert({severity: 'success', message: response.data.message});
            } catch(err) {
              errorHandler(err as AxiosError, navigate, logout, dispatchAlert);
            }
            
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new task
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            style={{marginBottom: 15}}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker name='dueDate' sx={{ width: "100%" }} label="Due Date" shouldDisableDate={(date) => date < dayjs()} />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

AddTaskDialog.displayName = 'AddTaskDialog';
export default AddTaskDialog;
