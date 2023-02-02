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
            console.log('check news by id:',res)
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
