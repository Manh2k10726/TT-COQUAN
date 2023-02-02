import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ManageUserReducer } from './Reducer/ManageUserReducer';
import { ManageScheduleReducer } from './Reducer/ManageScheduleReducer';
import { ManageNewsReducer } from './Reducer/ManageUtilityReducer';


const rootReducers = combineReducers({
    ManageUserReducer,
    ManageScheduleReducer,
    ManageNewsReducer
});


export const store = createStore(rootReducers, applyMiddleware(thunk));