import { baseService2 } from "./baseService2";

class ManageScheduleService extends baseService2{

    constructor(){
        super();
    }

    // getSchedule = ()=>{
    //     return this.get(`api/v1/work-schedules?from_date=2022-08-29&to_date=2022-08-29`)
    // }
    getSchedule = (from_date,to_date)=>{
        return this.get(`api/v1/work-schedules?from_date=${from_date}&to_date=${to_date}`)
    }
}

export const manageScheduleService = new ManageScheduleService();