import Axios from 'axios';
import { DOMAIN2 } from '../config';

export class baseService2 {
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN2}/${url}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            method: 'POST',
            data: model
        })
    }
    patch = (url, model) => {
        return Axios({
            url: `${DOMAIN2}/${url}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            method: 'PATCH',
            data: model
        })
    }

    put = (url, model) => {
        return Axios({
            url: `${DOMAIN2}/${url}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            method: 'PUT',
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


    delete = (url) => {
        return Axios({
            url: `${DOMAIN2}/${url}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            method: 'DELETE',
        })
    }
}