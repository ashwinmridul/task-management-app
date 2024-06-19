import React, { useState, useEffect, useCallback, FC, useContext } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { errorHandler } from '../../utils';
import { API_URL } from '../../constants';
import { EmptyProps, TaskType } from '../../types';
import { AuthContext } from '../../services/AuthService';
import { IconButton, LinearProgress, Theme, Tooltip, useMediaQuery, useTheme, Button, Grid, Typography } from '@mui/material';
import './styles.css';
import { AlertContext } from '../../services/AlertService';
import SearchBar from '../SearchBar';
import FilterDropdown from '../FilterDropdown';
import SortDropdown from '../SortDropdown';
import Task from '../Task';
import AddTaskDialog from '../AddTaskDialog';
import { AddTask } from '@mui/icons-material';

const Tasks: FC<EmptyProps> = React.memo(() => {
  const [tasks, setTasks] = useState<TaskType[]>([] as TaskType[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const { token, logout } = useContext(AuthContext);
  const { dispatchAlert } = useContext(AlertContext);

  const theme: Theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'), {defaultMatches: true});

  const navigate: NavigateFunction = useNavigate();

  const getTasks = useCallback((): void => {
    setLoading(true);
    axios.get(`${API_URL}/tasks`, {
        headers: {
            token
        }
    })
      .then((response: AxiosResponse<TaskType[], any>) => {
        setTasks(response.data);
        setLoading(false);
    })
      .catch((error: AxiosError) => {
        errorHandler(error, navigate, logout, dispatchAlert);
        setLoading(false);
    });
  }, [token, navigate, logout, dispatchAlert]);

  useEffect((): void => {
    if (!token) navigate('/');
  }, [token, navigate]);

  useEffect((): void => {
    // Fetch data from the Express server
    getTasks();
  }, [getTasks]);

  const addTask = useCallback((newTask: TaskType): void => {
    setTasks([...tasks, newTask]);
  }, [tasks]);

  return (
    <div className='task-container'>
        {loading ? <LinearProgress /> : <div className='loader-placeholder' />}
        {!isSmallScreen ? <div style={{display: 'flex', columnGap: 10}}>
            <SearchBar />
            <FilterDropdown />
            <SortDropdown />
            <Tooltip title='Add Task'><IconButton aria-label='Add Task' onClick={handleClickOpen}><AddTask /> </IconButton></Tooltip>
        </div> : <div><SearchBar /><div style={{display: 'flex', justifyContent: 'space-between', marginTop: 15, columnGap: 5}}>
            <FilterDropdown />
            <SortDropdown />
            <Button variant='outlined' aria-label='Add Task' style={{fontSize: 8, minWidth: 100, height: 40}}>Add Task&nbsp;<AddTask /> </Button>
        </div>
        </div>}
        {tasks.length ? <Grid container className='grid' spacing={2} style={{marginTop: 0}}>
          {tasks.map((task: TaskType) => <Task key={task.id} task={task} />)}
        </Grid> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300}}>
          <Typography color="text.secondary">No tasks to show</Typography>
          </div>}
        <AddTaskDialog onAdd={addTask} open={open} handleClose={handleClose} />
    </div>
  );
});
Tasks.displayName = 'Tasks';

export default Tasks;