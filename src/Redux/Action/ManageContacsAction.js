import { manageUtilityService } from "../../services/ManageUtilityService";
import { message } from "antd";
import { history } from "../../App";

export const getUserContact = (page, keyword, code) => {
  return async (dispatch) => {
    try {
      const res = await manageUtilityService.getUserContact(
        page,
        keyword,
        code
      );
      if (res.status === 200) {
        dispatch({
          type: "SET_LIST_CONTACT",
          dataLstContact: res.data,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const getCompanies = () => {
  return async (dispatch) => {
    try {
      const res = await manageUtilityService.getCompanies();
      console.log("check companies:", res);
      if (res.status === 200) {
        dispatch({
          type: "SET_LIST_COMPANIES",
          dataLstCompanies: res.data,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const getDepartments = (code) => {
  return async (dispatch) => {
    try {
      const res = await manageUtilityService.getDepartments(code);
      console.log("check department:", res);
      if (res.status === 200) {
        dispatch({
          type: "SET_LIST_DEPARTMENTS",
          dataLstDepartment: res.data,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const getContactByDepartments = (page, keyword, depart, code) => {
  return async (dispatch) => {
    try {
      const res = await manageUtilityService.getUserContactByDepart(
        page,
        keyword,
        depart,
        code
      );
      console.log("check contact by department:", res);
      if (res.status === 200) {
        dispatch({
          type: "SET_LIST_CONTACT_BY_DEPARTMENT",
          dataLstContactByDepartment: res.data,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};
