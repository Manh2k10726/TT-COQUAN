import { baseService2 } from "./baseService2";

class ManageUtilityService extends baseService2{

    constructor(){
        super();
    }
    // getAllNews=(page)=>{
    //     return this.get(`api/v1/news?page=${page}&size=5`)
    // }
    getAllNews=()=>{
        return this.get(`api/v1/news?page=0&size=10`)
    }
    getNewsById=(id)=>{
        return this.get(`api/v1/news/${id}`)
    }
}

export const manageUtilityService = new ManageUtilityService();