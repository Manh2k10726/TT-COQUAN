import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../../App';
import './CreateNew.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ManageNewsReducer } from './../../../../Redux/Reducer/ManageUtilityReducer';
import {uploadFileAction} from '../../../../Redux/Action/ManageNewsAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { useForm } from 'react-hook-form';

export default function CreateNews(props){

    const formik = useFormik({
        initialValues: {
            file:[],
            // firstname: '',
            // lastname: '',
            // email: '',
            // phone:'',
            // address:'',
            // birthday:'',
            // gender:'',
        },
        
        onSubmit: values => {
            let formData = new FormData();
            formData.append('file', values['file']);
        //   alert(JSON.stringify(values, null, 2));
            dispatch(uploadFileAction(formData.name));
        },
      });
    const dispatch = useDispatch(); 
    useEffect(() => {
        // dispatch(NewsAction())
    }, [])
    const handleFile=(e)=>{
        console.log('check file',e.target.files)
        console.log('check file',e.target.files[0])
        const file = e.target.files[0];
        if (file) {
            // // tạo đối tượng để đọc file
            // let reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = (e) => {
            //     setSrcImg(e.target.result)
            // }
            formik.setFieldValue('file', file)
        }
    }
    // const handleUpload = (e)=>{
    //     let formData = new FormData();
    //     formData.append('file',e.target.files[0])
    //     dispatch(uploadFileAction(formData))
    // }
    return(
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className='Create-new' style={{margin:'0   300px 0  300px'}}>
                <div className='row Create-new-container'>
                    <div className='col-12 form-group CrNew-content'>
                        <label>Tiêu đề(*):</label>
                        <input className='form-control'></input>
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="address">Nội dung sự kiện :</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            // data={formik.values.event_notice}
                            name='event_notice'
                            
                            onReady={ editor => {
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                // formik.setFieldValue('event_notice', data);
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } }
                        />
                    </div>
                    <form  className='col-12 form-group'
                        
                    >
                        <label htmlFor="address">Tài liệu đính kèm :</label>
                            <input  className='form-control-file'
                               type='file'  name="file"  onChange={(e)=>handleFile(e)}
                            />
                           <button
                           className='btn btn-info' 
                            // onClick={(e)=>handleUpload(e)} 
                            type='submit'
                             >Upload file</button>
                    </form>
                </div>
                
            </div>
            </form>
        </>
    )
}