import React, { Fragment, useEffect, useState } from 'react'
import { TimePicker,TreeSelect,DatePicker, Space ,Popconfirm} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {ScheduleByIdAction,DelSchedule,departmentsUsersAction,EditSchedule} from '../../../Redux/Action/ManageScheduleAction'
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditlichCoQuan.css'
import { ManageScheduleReducer } from './../../../Redux/Reducer/ManageScheduleReducer';

export default function EditChiTietSuKien(props) {
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(departmentsUsersAction())
    }, [])
    const {lstDepartment}=useSelector(state=>state.ManageScheduleReducer)
    let {id}  = props.match.params;
    useEffect(() => {
        dispatch(ScheduleByIdAction(id))
    }, [])
    const cancel = (e) => {
        console.log(e);
    };
    const {lstScheduleById}=useSelector(state=>state.ManageScheduleReducer)
    console.log('check data by id:',lstScheduleById);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            start_at:lstScheduleById?.start_at,
            end_at:lstScheduleById?.end_at,
            location:lstScheduleById?.location,
            event_notice: lstScheduleById?.event_notice,
            host:lstScheduleById?.host,
            preparation:lstScheduleById?.preparation,
            attenders:lstScheduleById?.attenders,
            title:'',
            assign_person_update: { new_items: [], remove_items: [] },
            file_ids:[],
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
            // console.log('values :',values)
            // alert(JSON.stringify(values, null, 2));
            dispatch(EditSchedule(id,values))
        },
      });
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
    const onChangeDate = (date, dateString) => {
        setDay(date)
        console.log('set day :',date)
    };
    const onChangeTimeStart = (time, timeString) => {
        formik.setFieldValue('start_at', time)
        console.log('check time:',time)
    };
    const onChangeTimeEnd = (time, timeString) => {
        formik.setFieldValue('end_at', time)
    };
        return (
            
            <form onSubmit={formik.handleSubmit}>
                <div className='row edit-container'>
                    <div className='col-4 form-group'>
                        <label htmlFor="start_at"> Ngày thực hiện (*):</label>
                        <Space  direction="vertical">
                            <DatePicker name='start_at'value={moment(formik.values.start_at)} defaultValue={moment(days)} class="form-control" onChange={onChangeDate}  size='middle'  />
                        </Space>
                        {formik.errors.start_at && formik.touched.start_at && (
                        <p className='text-riquired'>{formik.errors.start_at}</p>
                    )}
                    </div>
                    <div className='col-4 form-group'>
                        <label htmlFor="start_at">Thời gian bắt đầu (*):</label>
                        <Space  direction="vertical">
                            <TimePicker name='start_at' value={moment(formik.values.start_at)} defaultOpenValue={moment(days)} onChange={onChangeTimeStart}  format={format}   size='middle'  />
                        </Space>
                        {formik.errors.start_at && formik.touched.start_at && (
                        <p className='text-riquired'>{formik.errors.start_at}</p>
                    )}
                    </div>
                    <div className='col-4 form-group'>
                        <label htmlFor="end_time">Thời gian kết thúc (*):</label>
                        <Space  direction="vertical">
                            <TimePicker name='end_at'value={moment(formik.values.end_at)} defaultOpenValue={moment(days)} onChange={onChangeTimeEnd}  class="form-control"  format={format}   size='middle'  />
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
                               value={formik.values.host}
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
                            data={formik.values.event_notice}
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
                            <input className='form-control-file'
                               type='file' 
                            />
                           
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
                </div>
                <div className='button-edit' >
                    <Popconfirm
                        title="Bạn có chắc muốn xóa không?"
                        onConfirm={() => { dispatch(DelSchedule(id)) }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <button className='btn btn-danger'  >Xóa</button>
                    </Popconfirm>
                    <button className='btn btn-primary' type='submit' >Cập nhật chi tiết sự kiện</button>
                </div>
                
         </form>
        )
}