import { stat } from 'fs';
import { IAppAction, ActionType } from './Helpers';

export const initialState = {
  user: {
    user: null,
    access_token: null
  },

  taskId: 0,
  
  workflowUpdateTime: null,
  
  messageToShow: {
    time: new Date().toString(),
    payload: null
  },
  
  newTrade: {
    time: new Date().toString(),
    positionId: 0
  }

}

export function appReducer(state = initialState, action: IAppAction) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case ActionType.LOGIN_SUCCESS:
      state.user = action.payload;
      return state;
    //   return {
    //       user: action.payload
    //   }
    case ActionType.TASK_SELECT:
      state.taskId = action.payload;
      return state;
    //   return {
    //       user: action.payload
    //   }
    case ActionType.WORKFLOW_UPDATE_REQUEST:
      state.workflowUpdateTime = action.payload;
      return state;
    //   return {
    //       user: action.payload
    //   }
    case ActionType.SHOW_MESSAGE:
      state.messageToShow = action.payload;
      return state;
    //   return {
    //       user: action.payload
    //   }
    case ActionType.NEWTRADE_REQUEST:
      state.newTrade = action.payload;
      return state;
    //   return {
    //       user: action.payload
    //   }

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}