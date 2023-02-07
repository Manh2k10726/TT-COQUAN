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
    getFileById=(id)=>{
        return this.get(`api/v1/upload/attachments/${id}`)
    }
    uploadFile=(dataFile)=>{
        return this.post(`api/v1/upload`,dataFile)
    }
    delNews=(new_id)=>{
        return this.delete(`api/v1/news/${new_id}`)
    }
    postNews=(dataNews)=>{
        return this.post('api/v1/news',dataNews)
    }
    editNewsById=(data)=>{
        return this.patch(`api/v1/news`,data)
    }
}

export const manageUtilityService = new ManageUtilityService();