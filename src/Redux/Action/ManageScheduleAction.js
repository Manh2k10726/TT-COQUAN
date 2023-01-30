import { manageScheduleService } from "../../services/ManageScheduleService"




export const ScheduleAction = (from_date,to_date ) => {
    return async dispatch => {
        try {
            const res = await manageScheduleService.getSchedule(from_date,to_date);
            console.log('data schedule:',res)
            if (res.status === 200) {
                dispatch({
                    type: 'SET_LIST_SCHEDULE',
                    dataLstSchedule: res.data
                })
            }
           
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}