import { baseService2 } from "./baseService2";

class ManageScheduleService extends baseService2{

    constructor(){
        super();
    }
    getSchedule = (from_date,to_date)=>{
        return this.get(`api/v1/work-schedules?from_date=${from_date}&to_date=${to_date}`)
    }
    getScheduleById = (code)=>{
        return this.get(`api/v1/work-schedules/${code}`)
    }
    getDepartmentsUsers = ()=>{
        return this.get(`api/v1/departments/users`)
    }
    postSchedule = (data)=>{
        return this.post(`api/v1/work-schedules`,data)
    }
    putSchedule = (id,data)=>{
        return this.put(`api/v1/work-schedules/${id}`,data)
    }
    delScheduleById = (code)=>{
        return this.delete(`api/v1/work-schedules/${code}`)
    }
}

export const manageScheduleService = new ManageScheduleService();