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
}

export const manageScheduleService = new ManageScheduleService();