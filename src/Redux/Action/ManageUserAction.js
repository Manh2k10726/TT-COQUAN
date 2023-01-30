
import { manageUserService } from './../../services/manageUserService';
import { message } from 'antd';
import { history } from '../../App';


export const loginAction = (dataUser) => {
    return async dispatch => {
        try {
            const result = await manageUserService.login(dataUser);
            console.log('check token',result)
            if (result.status === 200) {
                sessionStorage.setItem('access_token', result.data.access_token)
                message.success("Đăng nhập thành công !!!")
                history.push('/Home');
            }
            else {
                message.error("Đăng nhập thất bại !!!")
            }
        } catch (error) {
            console.log('error', error.response?.data)
        }
    }
}

// export const ScheduleAction = (date) => {
//     return async dispatch => {
//         try {
//             const result = await manageUserService.getUserProfile(date);
//             console.log('check token',result)
//             if (result.status === 200) {
//                 // dispatch({
//                 //     // type: SET_LIST_USER,
//                 //     lstUser: result.data
//                 // })
//             }
//         } catch (error) {
//             console.log('error', error.response?.data)
//         }
//     }
// }
