import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../../App';
import './CreateNew.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Upload } from 'antd';
import { ManageNewsReducer } from './../../../../Redux/Reducer/ManageUtilityReducer';
import {uploadFileAction} from '../../../../Redux/Action/ManageNewsAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AiOutlineUpload } from "react-icons/ai";

export default function CreateNews(props){

    const formik = useFormik({
        initialValues: {
            file:[],    
        },
        
        onSubmit: values => {
            let formData = new FormData();
            formData.append('file', values['file']);
        //   alert(JSON.stringify(values, null, 2));
            // dispatch(uploadFileAction(formData.name));
        },
      });
    const dispatch = useDispatch(); 
    useEffect(() => {
        // dispatch(postNews())
    }, [])
    const [file,setFile] = useState();
    const handleFile=(e)=>{
        console.log('check file',e.target.files)
        console.log('check file',e.target.files[0])
        const file = e.target.files[0];
        setFile(e.target.files[0])
    }
  const  uploadFileData = (event) => {
		event.preventDefault();
		// this.setState({msg: ''});

		let data = new FormData();
		data.append('file', file);

		fetch('https://stg.vimc.fafu.com.vn/api/v1/upload' ,{
			method: 'POST',
			body: data,
            headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
		}).then(response => {
			// this.setState({msg: "File successfully uploaded"});
            console.log('res:',response)
		}).catch(err => {
			// this.setState({error: err});
		});

	}
    const [fileList, setFileList] = useState();
      const handleChange = (info) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-2);
        newFileList = newFileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
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
                            {/* <input  className='form-control-file'
                               type='file'  name="file"  onChange={(e)=>handleFile(e)}
                            />
                           <button
                           className='btn btn-info' 
                           onClick={(event)=>uploadFileData(event)}
                            // type='submit'
                             >Upload file</button> */}

                            <Upload {...Props} fileList={fileList}>
                                <button className='btn btn-info'  ><AiOutlineUpload style={{fontSize:'20px'}}/> Upload</button>
                            </Upload>
                    </form>
                </div>
                
            </div>
            </form>
        </>
    )
}