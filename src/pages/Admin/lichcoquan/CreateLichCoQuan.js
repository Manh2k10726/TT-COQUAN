import React, { Fragment, useEffect, useState } from 'react'
import { TimePicker,TreeSelect,DatePicker, Space,FloatButton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './CreateLichCoQuan.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineUpload } from "react-icons/ai";
import {  Upload } from 'antd';
import {departmentsUsersAction,AddSchedule} from '../../../Redux/Action/ManageScheduleAction'
import moment from 'moment';
import { ManageScheduleReducer } from './../../../Redux/Reducer/ManageScheduleReducer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { render } from '@testing-library/react';


export default function CreateChiTietSuKien() {
    const [fileID, setFileID] = useState();
    const formik = useFormik({
        initialValues: {
            start_at:'',
            end_at:'',
            location:'',
            event_notice: '',
            file_id:[`${fileID}`],
            host:'',
            preparation:'',
            attenders:'',
            assignees:[],
        },
        // validationSchema : Yup.object({
        //     start_at: Yup.string()
        //       .required('You must fill in this section !!!'),
        //     end_at: Yup.string()
        //       .required('You must fill in this section !!!'),
        //     event_notice: Yup.string()
        //       .required('You must fill in this section !!!'),
        //     location: Yup.string()
        //       .required('You must fill in this section !!!'),
        // }),
        onSubmit: values => {
            // console.log(values)
            // alert(JSON.stringify(values, null, 2));
            dispatch(AddSchedule(values))
        },
      });
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(departmentsUsersAction())
    }, [])
    const {lstDepartment}=useSelector(state=>state.ManageScheduleReducer)
    const treeData =  lstDepartment&&lstDepartment.map((item,index)=>{
                return{ 
                    title:item.name, 
                    value:item.code,
                    children:item && item.users.map((user,index)=>{
                            return{
                                title:user.name_uppercase, 
                                value:user.user_code
                            }
                        })
                    }
            })
   
    const format = 'HH:mm';
    const [value, setValue] = useState([]);
    const onChange = (newValue) => {
    console.log('onChange ', value);
    formik.setFieldValue('assignees', newValue);
    setValue(newValue);
  };
    const tProps = {
        treeData,
        value,
        onChange,
        treeCheckable: true,
        showCheckedStrategy: TreeSelect.SHOW_CHILD,
        placeholder: '--Chọn người nhận thông báo--',
        style: {
        width: '100%',
        },
    };
    const [days,setDay] = useState();
    // console.log(days._d)
    const onChangeDate = (date, dateString) => {
        setDay(date)
        console.log('set day :',date)
        // formik.setFieldValue('start_at', dateString)
    };
    const onChangeTimeStart = (time, timeString) => {
        formik.setFieldValue('start_at', time)
        console.log('check time:',time)
    };
    const onChangeTimeEnd = (time, timeString) => {
        formik.setFieldValue('end_at', time)
    };
    const [fileList, setFileList] = useState();
   
    const props = {
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
      };
        return (
            
            <form onSubmit={formik.handleSubmit}>
                <div className='row create-container' >
                    <div className='col-4 form-group'>
                        <label htmlFor="start_at"> Ngày thực hiện (*):</label>
                        <Space  direction="vertical">
                            <DatePicker name='start_at' defaultValue={moment(days)} class="form-control" onChange={onChangeDate}  size='middle'  />
                        </Space>
                        {formik.errors.start_at && formik.touched.start_at && (
                        <p className='text-riquired'>{formik.errors.start_at}</p>
                    )}
                    </div>
                    <div className='col-4 form-group'>
                        <label htmlFor="start_at">Thời gian bắt đầu (*):</label>
                        <Space  direction="vertical">
                            <TimePicker name='start_at' defaultOpenValue={moment(days)} onChange={onChangeTimeStart}  format={format}   size='middle'  />
                        </Space>
                        {formik.errors.start_at && formik.touched.start_at && (
                        <p className='text-riquired'>{formik.errors.start_at}</p>
                    )}
                    </div>
                    <div className='col-4 form-group'>
                        <label htmlFor="end_time">Thời gian kết thúc (*):</label>
                        <Space  direction="vertical">
                            <TimePicker name='end_at' defaultOpenValue={moment(days)} onChange={onChangeTimeEnd}  class="form-control"  format={format}   size='middle'  />
                        </Space>
                        {formik.errors.end_at && formik.touched.end_at && (
                        <p className='text-riquired'>{formik.errors.end_at}</p>
                    )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="host">Chủ trì (*):</label>
                            <input class="form-control"
                               id="host"
                               name="host"
                               type="text"
                               onChange={formik.handleChange}
                               value={formik.values.address}
                            />
                           
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="location">Địa điểm (*):</label>
                            <input class="form-control"
                              id="location"
                              name="location"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.location}
                            />
                          
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="preparation">Chuẩn bị :</label>
                            <input class="form-control"
                               id="preparation"
                               name="preparation"
                               type="text"
                               onChange={formik.handleChange}
                               value={formik.values.preparation}
                            />
                           
                    </div>
                   
                    <div className='col-12 form-group'>
                        <label htmlFor="address">Nội dung sự kiện :</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            name='event_notice'
                            
                            onReady={ editor => {
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                formik.setFieldValue('event_notice', data);
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } }
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="address">Tài liệu đính kèm :</label>
                            <Upload {...props} fileList={fileList}>
                                <button className='btn btn-light'  ><AiOutlineUpload style={{fontSize:'20px'}}/> Chọn tài liệu đính kèm</button>
                            </Upload>
                           
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="attenders">Thành viên tham gia :</label>
                            <input class="form-control" 
                                id="attenders"
                                name="attenders"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.attenders} 
                            />
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="assignees">Thông báo :</label>
                        <TreeSelect  {...tProps} />
                    </div>
                    <div className='button-create' >
                    <button  className='btn btn-primary' type='submit' >Thêm</button>
                </div>
                </div>
               
         </form>
        )
}