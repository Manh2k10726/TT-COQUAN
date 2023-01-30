import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ManageUserReducer } from './Reducer/ManageUserReducer';
import { ManageScheduleReducer } from './Reducer/ManageScheduleReducer';


const rootReducers = combineReducers({
    ManageUserReducer,
    ManageScheduleReducer
});


export const store = createStore(rootReducers, applyMiddleware(thunk));