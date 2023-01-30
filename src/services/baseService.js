import Axios from 'axios';
import { DOMAIN } from '../config';

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
   
}