import { baseService2 } from "./baseService2";

class ManageUtilityService extends baseService2 {
  constructor() {
    super();
  }
  // getAllNews=(page)=>{
  //     return this.get(`api/v1/news?page=${page}&size=5`)
  // }
  getAllNews = () => {
    return this.get(`api/v1/news?page=0&size=10`);
  };
  getNewsById = (id) => {
    return this.get(`api/v1/news/${id}`);
  };
  getFileById = (id) => {
    return this.get(`api/v1/upload/attachments/${id}`);
  };
  uploadFile = (dataFile) => {
    return this.post(`api/v1/upload`, dataFile);
  };
  delNews = (new_id) => {
    return this.delete(`api/v1/news/${new_id}`);
  };
  postNews = (dataNews) => {
    return this.post("api/v1/news", dataNews);
  };
  editNewsById = (data) => {
    return this.patch(`api/v1/news`, data);
  };
  getCompanies = () => {
    return this.get(`api/v1/companies?status=true`);
  };
  getDepartments = (code) => {
    return this.get(`api/v1/departments/getAll?company_code=${code}`);
  };
  getUserContact = (page, keyword, code) => {
    return this.get(
      `api/v1/users?page=${page}&size=10&keyword=${keyword}&status=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%2526DVHH,BTTKH,BPC%2526QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=${code}`
    );
  };
  getUserContactByDepart = (page, keyword, depart, code) => {
    return this.get(
      `api/v1/users?page=${page}&size=10&keyword=${keyword}&department_code=${depart}&status=true&company_code=${code}`
    );
  };
}

export const manageUtilityService = new ManageUtilityService();
