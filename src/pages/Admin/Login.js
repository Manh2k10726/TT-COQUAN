import React from 'react'
import './Login.css'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../Redux/Action/ManageUserAction';


export default function Login(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            client_id:'vimc',
            username: '',
            password: '',
            grant_type:'password',
            scope:'openid'
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(loginAction(values))
        },
    });
    return(
            <form onSubmit={formik.handleSubmit}>
                <div className="login-container">
                    <div className='row bk-login' >
                    <div className='logo'>

                    </div>
                    <div className='col-12 form-group '>
                        <label for="username">User name :</label>
                        <input className='form-control'
                        type="text" onChange={formik.handleChange}
                        name="username"
                        id="username"
                        />
                    </div>
                    <div className='col-12 form-group '>
                        <label for="password">Password :</label>
                        <input className='form-control'
                         name='password' onChange={formik.handleChange} type="password"
                        />
                    </div>
                    <div className='col-12 form-group ' check>
                        <label check>
                        <input type="checkbox" /> Remember Me
                        </label>
                    </div>
                    <button className='col-12 btn btn-primary ' type="submit">SingIn</button>
                    </div>
                </div>
            </form>
    )
}