
const initialState = {
    lstUser: [],
    lstUserById: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ManageUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_LIST_USER": {
            state.lstUser = action.dataUser
            return { ...state }
        }

        case "GET_USER_ID": {
            state.lstUserById = action.dataUserById
            return { ...state }
        }

        default:
            return state
    }
}