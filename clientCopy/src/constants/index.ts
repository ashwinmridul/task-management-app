import { blue, green, yellow } from "@mui/material/colors";

export const API_URL: string = 'http://localhost:5001';
export const DEFAULT_ALERT = {
    error: 'An error occured! Please try again.',
    success: '',
    info: '',
    warning: ''
};
export const ALERT_TIMEOUT = 5000;
export const MIN_PASSWORD_LENGTH = 8;
export const TASK_STATUS = {
    todo: {color: yellow[100], label: 'To Do'},
    inProgress: {color: blue[100], label: "In Progress"},
    done: {color: green[100], label: 'Done'}
};