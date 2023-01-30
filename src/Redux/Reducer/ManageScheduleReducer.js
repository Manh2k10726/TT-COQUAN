
const initialState = {
    lstSchedule: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ManageScheduleReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_LIST_SCHEDULE": {
            state.lstSchedule = action.dataLstSchedule
            return { ...state }
        }

        default:
            return state
    }
}
