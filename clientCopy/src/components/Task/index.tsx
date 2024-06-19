import React, { FC, useCallback, useContext, useState } from "react";
import { Card, CardActions, CardContent, Chip, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import { API_URL, TASK_STATUS } from "../../constants";
import { Delete } from "@mui/icons-material";
import { format } from "date-fns";
import { TaskProps } from "./types";
import { StatusTypes } from "../../types";
import axios from "axios";
import { AuthContext } from "../../services/AuthService";
import { errorHandler } from "../../utils";
import { AlertContext } from "../../services/AlertService";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Task: FC<TaskProps> = React.memo(({task}) => {
    const [status, setStatus] = useState(task.status);
    const [deleted, setDeleted] = useState(false);
    
    const { token, logout } = useContext(AuthContext);
    const { dispatchAlert } = useContext(AlertContext);
    const navigate: NavigateFunction = useNavigate();

    const onChange = useCallback(async (e: SelectChangeEvent) => {
        try {
            const response = await axios.put(`${API_URL}/tasks/${task.id}`, {status: e.target.value}, {headers: {token}});
            setStatus(e.target.value as unknown as StatusTypes);
            dispatchAlert({severity: 'success', message: response.data.message});
        } catch  (error: any) {
            errorHandler(error, navigate, logout, dispatchAlert);
        }
    }, [dispatchAlert, logout, navigate, task.id, token]);

    const onDelete = useCallback(async () => {
        try {
            const response = await axios.delete(`${API_URL}/tasks/${task.id}`, {headers: {token}});
            setDeleted(true);
            dispatchAlert({severity: 'success', message: response.data.message});
        } catch(error: any) {
            errorHandler(error, navigate, logout, dispatchAlert);
        }
    }, []);

    if (deleted) return null;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} display="flex" flexGrow="1">
            <Card style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Due Date: {format(task.dueDate, 'MMM d, yyyy')}</Typography>
                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Select
                        value={status as unknown as string}
                        inputProps={{ 'aria-label': 'Filter' }}
                        sx={{'& .MuiSelect-select': {padding: 0}, '& .MuiChip-root': {marginTop: '0 !important'}}}
                        style={{borderRadius: 16}}
                        onChange={onChange}
                        >
                        {Object.entries(TASK_STATUS).map(([key, {color, label}]) => <MenuItem key={key} value={key}>
                            <Chip label={label}
                                color="primary"
                                style={{ backgroundColor: color }}/>
                        </MenuItem>)}
                    </Select>
                    <Tooltip title="Delete"><IconButton size="small" onClick={onDelete}><Delete /></IconButton></Tooltip>
                </CardActions>
            </Card>
        </Grid>
    );
});

Task.displayName = 'Task';
export default Task;
