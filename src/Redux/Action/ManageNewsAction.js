import { manageUtilityService } from "../../services/ManageUtilityService";
import{message} from 'antd';
import { history } from "../../App";

export const NewsAction = ()=>{
    return async dispatch =>{
        try{
            const res = await manageUtilityService.getAllNews();
            console.log('check news:',res)
            if(res.status === 200){
                dispatch({
                    type:'SET_LIST_NEWS',
                    dataLstNews:res.data
                })
            }
        }catch(error){
            console.log('error', error.response?.data)
        }
    }
}

export const getNewsByIdAction = (id)=>{
    return async dispatch =>{
        try{
            const res = await manageUtilityService.getNewsById(id);
            if(res.status === 200){
                dispatch({
                    type:'SET_LIST_NEWS_BY_ID',
                    dataLstNewsById:res.data
                })
            }
        }catch(error){
            console.log('error', error.response?.data)
        }
    }
}

export const getFileById = (id)=>{
    return async dispatch =>{
         try{
            const res = await manageUtilityService.getFileById(id);
            if(res.status === 200){
                dispatch({
                    type:'SET_LIST_FILE_BY_ID',
                    dataLstFileById:res.data
                })
            }
        }catch(error){
            console.log('error', error.response?.data)
        }
    }
}

// export const uploadFileAction = (dataFile) => {
//     return async dispatch => {
//         try {
//             const result = await manageUtilityService.uploadFile(dataFile);
//             if (result.status === 200) {
//                 message.success("Thêm mới thành công !!!")
//             }
//             else {
//                 message.error("Thêm mới thất bại !!!")
//             }
//         } catch (error) {
//             console.log('error', error.response?.data)
//         }
//     }
// }

export const delNews = (new_id) => {
    return async dispatch => {
        try {
            const result = await manageUtilityService.delNews(new_id);
            if (result.status === 200) {
                message.success("Xóa thông báo thành công !!!")
                history.push(`/utility/general-notifications`)
                dispatch(NewsAction())
            }
            else {
                message.error("Xóa thông báo thất bại !!!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const createNews = (dataNews) => {
    return async dispatch => {
        try {
            const result = await manageUtilityService.postNews(dataNews);
            if (result.status === 200) {
                message.success("Thêm mới thông báo thành công !!!")
                history.push(`/utility/general-notifications`)
            }
            else {
                message.error("Thêm mới thông báo thất bại !!!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

export const EditNewsAction = (data) => {
    return async dispatch => {
        try {
            const result = await manageUtilityService.editNewsById(data);
            if (result.status === 200) {
                message.success("Cập nhật thành công !!!")
                // history.push(`/utility/general-notifications`)
            }
            else {
                message.error("Cập nhật thất bại !!!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}