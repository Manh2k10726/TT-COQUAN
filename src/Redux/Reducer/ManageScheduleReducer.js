
const initialState = {
    lstSchedule: [],
    lstScheduleById:[],
    lstDepartment:[],
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ManageScheduleReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_LIST_SCHEDULE": {
            state.lstSchedule = action.dataLstSchedule
            return { ...state }
        }
        case "SET_LIST_SCHEDULE_BY_ID": {
            state.lstScheduleById = action.dataLstScheduleById
            return { ...state }
        }
        case "SET_LIST_DEPARTMENT": {
            state.lstDepartment = action.dataLstDepartment
            return { ...state }
        }
        default:
            return state
    }
}


