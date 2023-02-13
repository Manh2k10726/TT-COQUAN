const initialState = {
    lstNews:[],
    lstNewsById:[],
    lstFileById:[],
    lstContact:[],
    lstCompany:[],
    lstDepartments:[],
    lstContactByDepartments:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export const ManageUtilityReducer = (state = initialState, action) => {
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
        case "SET_LIST_CONTACT": {
            state.lstContact = action.dataLstContact
            return { ...state }
        }
        case "SET_LIST_COMPANIES": {
            state.lstCompany = action.dataLstCompanies
            return { ...state }
        }
        case 'SET_LIST_DEPARTMENTS':{
            state.lstDepartments =action.dataLstDepartment
            return{...state}
        }
        case 'SET_LIST_CONTACT_BY_DEPARTMENT':{
            state.lstContactByDepartments =action.dataLstContactByDepartment
            return{...state}
        }
        default:
            return state
    }
}