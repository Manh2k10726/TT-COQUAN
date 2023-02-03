const initialState = {
    lstNews:[],
    lstNewsById:[],
    lstFileById:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ManageNewsReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_LIST_NEWS": {
            state.lstNews = action.dataLstNews
            return { ...state }
        }
        case "SET_LIST_NEWS_BY_ID": {
            state.lstNewsById = action.dataLstNewsById
            return { ...state }
        }
        case "SET_LIST_FILE_BY_ID": {
            state.lstFileById = action.dataLstFileById
            return { ...state }
        }
        default:
            return state
    }
}