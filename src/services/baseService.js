import Axios from 'axios';
import { DOMAIN } from '../config';
import { DOMAIN2 } from '../config';


export class baseService {
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            data: model
        })
    }

    get = (url) => {
        return Axios({
            url: `${DOMAIN2}/${url}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            method: 'GET',
        })
    }
   
}