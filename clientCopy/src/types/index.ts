import { AlertColor, AlertPropsColorOverrides } from "@mui/material/Alert/Alert";
import { OverridableStringUnion } from '@mui/types';

export interface UserType {
    token: string;
    name: string;
}

export enum StatusTypes {
    todo = 'todo',
    inProgress = 'inProgress',
    done = 'done'
}

export interface TaskType {
    id: string;
    title: string;
    description: string;
    status: StatusTypes;
    dueDate: string;
}

export interface EmptyProps {
    children?: JSX.Element;
}

export interface AlertType {
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
    message: string;
}

export interface AlertContextType {
    alerts: AlertType[];
    dispatchAlert: (alert: AlertType) => void;
}

export interface AuthContextType {
    token: string | null;
    user: UserType;
    login: (email: string, password: string) => Promise<UserType>;
    register: (name: string, email: string, password: string) => Promise<UserType>;
    logout: () => void;
}

export interface APIResponse {
    message: string;
    task: TaskType;
}
