
const initialState = {
    lstCurrentUser: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ManageUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_LIST_CURRENT_USER": {
            state.lstCurrentUser = action.dataLstCurrentUser
            return { ...state }
        }
        
        default:
            return state
    }
}