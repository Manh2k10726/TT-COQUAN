import React, { Fragment, useEffect, useState } from 'react'
import {Upload} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AiOutlineUpload } from "react-icons/ai";
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getCurrentUser } from '../../../../Redux/Action/ManageUserAction';
import './EditNews.css'
import { ManageNewsReducer } from './../../../../Redux/Reducer/ManageUtilityReducer';
import { EditNewsAction, getNewsByIdAction } from '../../../../Redux/Action/ManageNewsAction';

export default function EditNews(props){

    const {lstNewsById} = useSelector(state=>state.ManageNewsReducer)
    console.log('check data news by id:',lstNewsById)
    let {id}  = props.match.params;
    useEffect(() => {
        dispatch(getNewsByIdAction(id))
    }, [])

    const {lstCurrentUser} = useSelector(state => state.ManageUserReducer);

    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])
     const ListDefaultUpload =lstNewsById.attachments?.map((item)=>{
       return{
            // uid:'1',
            name:item.file_name,
            id:item.file_id,
        }
    })

    const [fileID, setFileID] = useState();
    console.log('check id:',fileID)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            attachments_request:{
                new_items:fileID ,
            },
            author:{
                name_lowercase:lstCurrentUser.name_lowercase,
                username:lstCurrentUser.username
            },
            content:lstNewsById?.content,
            subject:lstNewsById?.subject,
            id:lstNewsById?.id
        },
        
        onSubmit: values => {
            // let OldId = lstNewsById.attachments.map((item)=>{item.file_id})
            // setFileID(OldId)
        //   alert(JSON.stringify(values, null, 2));
            dispatch(EditNewsAction(values));
        },
      });
      const Props = {
        name: 'file',
        action: 'https://stg.vimc.fafu.com.vn/api/v1/upload',
        multiple: true,
        headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            const listID = info.fileList?.map((item)=>item.response.file_id)
            setFileID(listID)
          } else if (info.file.status === 'error') {
            // message.error(`${info.file.name} file upload failed.`);
          }
        },
        // defaultFileList: [
        //     ListDefaultUpload
        // ],
      };
    return(
        <>
        <form onSubmit={formik.handleSubmit}>
          <div className='Edit-new' style={{margin:'10px   25px 0  25px',minHeight:'600px'}}>
              <div className='row Edit-new-container' style={{margin:'30px 300px 0 300px'}}>
                  <div className='col-12 form-group CrNew-content'>
                      <label>Tiêu đề(*):</label>
                      <input className='form-control' 
                          id="subject"
                          name="subject"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.subject}
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
                          data={formik.values.content}
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
            </div >   
                    <div className='col-12 form-group'>
                        <label htmlFor="address">Tài liệu đính kèm :</label>  
                        <div>
                            <Upload {...Props} >
                                <button className='btn btn-light' style={{alignItems:'center'}} ><AiOutlineUpload style={{fontSize:'20px'}}/> Chọn tài liệu đính kèm</button>
                            </Upload>
                        </div>
                    </div>
                    </div>
            <div>
                  <button className='btn btn-primary'
                              // onClick={handleUpload}
                              type='submit' style={{float:'right',marginRight:'300px'}}>Cập nhật thông báo</button>
              </div>
          </div>
          </form>
      </>
    )
}