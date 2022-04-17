import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    OPEN_ALERT,
    CLOSE_ALERT,
    OPEN_SPINNER,
    CLOSE_SPINNER,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    TASK_SELECT,
    THEME_SELECT,
    WORKFLOW_UPDATE_REQUEST,
    SHOW_MESSAGE,
    LAYOUT_UPDATE_REQUEST,
    NEWTRADE_REQUEST
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}