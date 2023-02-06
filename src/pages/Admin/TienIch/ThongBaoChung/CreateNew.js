import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../../App';
import './CreateNew.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Upload } from 'antd';
import { ManageNewsReducer } from './../../../../Redux/Reducer/ManageUtilityReducer';
import {createNews, uploadFileAction} from '../../../../Redux/Action/ManageNewsAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AiOutlineUpload } from "react-icons/ai";
import { ManageUserReducer } from './../../../../Redux/Reducer/ManageUserReducer';
import { getCurrentUser } from '../../../../Redux/Action/ManageUserAction';

export default function CreateNews(props){
    const {lstCurrentUser} = useSelector(state => state.ManageUserReducer);
    console.log('check data current user :',lstCurrentUser)
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])

    const [fileID, setFileID] = useState();
    console.log('check data file id :',fileID)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            attachments_request:{
                new_items:[`${fileID}`]
            },
            author:{
                name_lowercase:lstCurrentUser.name_lowercase,
                username:lstCurrentUser.username
            },
            content:'',
            subject:'',
            id:''
        },
        
        onSubmit: values => {
        //   alert(JSON.stringify(values, null, 2));
            dispatch(createNews(values));
        },
      });
   
    const [fileList, setFileList] = useState();
   
      const handleChange = (info) => {
        console.log('info',info)
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-2);
        newFileList = newFileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.fileID = file.response.file_id;
            console.log('check fileId:',file.fileID)
            setFileID(file.fileID)

            file.url = file.response.url;
          }
          return file;
        });
        setFileList(newFileList);
      };
      const Props = {
        action: 'https://stg.vimc.fafu.com.vn/api/v1/upload',
        onChange: handleChange,
        multiple: true,
        headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
      };
    return(
        <>
          <form onSubmit={formik.handleSubmit}>
            <div className='Create-new' style={{margin:'0   300px 0  300px'}}>
                <div className='row Create-new-container'>
                    <div className='col-12 form-group CrNew-content'>
                        <label>Tiêu đề(*):</label>
                        <input className='form-control' 
                            id="subject"
                            name="subject"
                            type="text"
                            onChange={formik.handleChange}
                        ></input>
                    </div>
                    <div className='col-12 form-group'
                        id="content"
                        name="content"
                        type="text"
                        onChange={formik.handleChange}
                    >
                        <label htmlFor="address">Nội dung sự kiện :</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            name='content'
                            
                            onReady={ editor => {
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                formik.setFieldValue('content', data);
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } }
                        />
                    </div>
                        <label htmlFor="address">Tài liệu đính kèm :</label>  

                            <Upload {...Props} fileList={fileList}>
                                <button className='btn btn-light' style={{alignItems:'center'}} ><AiOutlineUpload style={{fontSize:'20px'}}/> Chọn tài liệu đính kèm</button>
                            </Upload>
                    
                </div>
                <div>
                    <button className='btn btn-primary' type='submit' style={{float:'right'}}>Đăng thông báo</button>
                </div>
            </div>
            </form>
        </>
    )
}