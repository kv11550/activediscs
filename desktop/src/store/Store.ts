import { applyMiddleware, createStore } from 'redux';
import { appReducer } from './Reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];

export const store = createStore(appReducer, composeWithDevTools(applyMiddleware(...middlewares)));

