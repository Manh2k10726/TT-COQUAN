import { manageScheduleService } from "../../services/ManageScheduleService"
import { message } from 'antd';
import { history } from "../../App";


export const ScheduleAction = (from_date,to_date ) => {
    return async dispatch => {
        try {
            const res = await manageScheduleService.getSchedule(from_date,to_date);
            // console.log('data schedule:',res)
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

export const AddSchedule = (data) => {
    return async dispatch => {
        try {
            const result = await manageScheduleService.postSchedule(data);
            if (result.status === 200) {
                message.success("Thêm mới thành công !!!")
                // history.push(`/company-work-schedule`)
                dispatch(ScheduleAction())
            }
            else {
                message.error("Thêm mới thất bại !!!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const ScheduleByIdAction = (id) => {
    return async dispatch => {
        try {
            const res = await manageScheduleService.getScheduleById(id);
            console.log('data schedule by id:',res)
            if (res.status === 200) {
                dispatch({
                    type: 'SET_LIST_SCHEDULE_BY_ID',
                    dataLstScheduleById: res.data
                })
            }
           
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const departmentsUsersAction = () => {
    return async dispatch => {
        try {
            const res = await manageScheduleService.getDepartmentsUsers();
            if (res.status === 200) {
                dispatch({
                    type: 'SET_LIST_DEPARTMENT',
                    dataLstDepartment: res.data
                })
            }
           
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const EditSchedule = (id,data) => {
    return async dispatch => {
        try {
            const result = await manageScheduleService.putSchedule(id,data);
            if (result.status === 200) {
                message.success("Cập nhật thành công !!!")
            }
            else {
                message.error("Cập nhật thất bại !!!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const DelSchedule = (id) => {
    return async dispatch => {
        try {
            const result = await manageScheduleService.delScheduleById(id);
            if (result.status === 200) {
                message.success("xóa thành công !!!")
                history.push(`/company-work-schedule`)
                dispatch(ScheduleAction())
            }
            else {
                message.error("xóa thất bại !!!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}