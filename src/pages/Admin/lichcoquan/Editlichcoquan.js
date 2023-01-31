import React, { Fragment, useEffect, useState } from 'react'
import { Table  ,DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleAction } from '../../../Redux/Action/ManageScheduleAction';
// import './chitietsukien.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {ScheduleByIdAction} from '../../../Redux/Action/ManageScheduleAction'
import moment from 'moment';
import { ManageScheduleReducer } from './../../../Redux/Reducer/ManageScheduleReducer';

export default function EditChiTietSuKien(props) {
    const dispatch = useDispatch(); 
    let {id}  = props.match.params;
    useEffect(() => {
        dispatch(ScheduleByIdAction(id))
    }, [])
    const {lstScheduleById}=useSelector(state=>state.ManageScheduleReducer)
    console.log('check data by id:',lstScheduleById);

    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         start_at:lstScheduleById?.start_at,
    //         // start_at:lstScheduleById?.start_at,
    //         lastname: lstScheduleById?.lastname,
    //         email: lstScheduleById?.email,
    //         phone:lstScheduleById?.phone,
    //         address:lstScheduleById?.address,
    //         birthday:lstScheduleById?.birthday,
    //         gender:lstScheduleById?.gender,
    //     },
    //     validationSchema : Yup.object({
    //         username: Yup.string()
    //         //   .max(5,'Your name must be at least 5 characters !')
    //         //   .matches(25,'Your name must be under 25 characters !')
    //           .required('You must fill in this section !!!'),
    //         firstname: Yup.string()
    //         //   .max(5,'Your firstname must be at least 5 characters !')
    //         //   .matches(25,'Your firstname must be under 25 characters !')
    //           .required('You must fill in this section !!!'),
    //         lastname: Yup.string()
    //         //   .max(5,'Your lastname must be at least 5 characters !')
    //         //   .matches(25,'Your lastname must be under 25 characters !')
    //           .required('You must fill in this section !!!'),
    //         email: Yup.string()
    //           .email('Invalid Email')
    //           .required('You must fill in this section !!!'),
    //         phone: Yup.string()
    //           .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
    //               message: "Your phone number is not correct !!!",
    //               excludeEmptyString: false,
    //           })
    //           .required('You must fill in this section !!!'),
    //         birthday: Yup.string()
    //           .required('You must fill in this section !!!'),  
    //         gender: Yup.string()
    //           .required('You must fill in this section !!!'), 
    //     }),
    //     onSubmit: values => {
    //     //   dispatch(UpdateUserAction(id,values))
    //     },
    //   });
}