import React, { Fragment, useEffect, useState } from 'react'
import { Table  ,DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleAction } from '../../../Redux/Action/ManageScheduleAction';
import './chitietsukien.css';
import moment from 'moment';
export default function ChiTietSuKien(props) {

    const {lstSchedule} = useSelector(state=>state.ManageScheduleReducer)
    console.log('lstSchedule detail:',lstSchedule)

    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(ScheduleAction())    
    }, [])
    
   
    const Chitiet = () =>{
        return lstSchedule?.map((item,index)=>{
            return (
                <div className=''>
                    <div className='header'>
                    <span className=' text-3xl font-bold'>
                        Chi tiết sự kiện
                    </span>     
                    </div>
                    <div className=''>
                      <div className='cs-container'>
                        <span className=' text font-bold'>
                            Thông tin
                        </span>
                        <span className='  font-bold'>
                            Mô tả chi tiết
                        </span>
                      </div>
                      <div className='cs-content'>
                        <span className=' text font-bold'>
                        Ngày thực hiện
                        </span>
                        <span className='  font-bold'>
                            {moment(item.start_at).format('DD/MM/YY')}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thời gian bắt đầu
                        </span>
                        <span className='  font-bold'>
                        {moment(item.start_at).format('HH:mm')}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thời gian kết thúc
                        </span>
                        <span className='  font-bold'>
                        {moment(item.end_at).format('HH:mm')}
                        {/* {item.end_at} */}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Chủ trì
                        </span>
                        <span className='  font-bold'>
                        {item.host}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Địa điểm
                        </span>
                        <span className='  font-bold'>
                        {item.location}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Chuẩn bị
                        </span>
                        <span className='  font-bold'>
                        {item.preparation}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Nội dung sự kiện
                        </span>
                        <span className='  font-bold'>
                        {item.event_notice}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Tài liệu đính kèm
                        </span>
                        <span className='  font-bold'>
                        {item.file_ids}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thành viên tham gia
                        </span>
                        <span className='  font-bold'>
                        {item.attenders}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thông báo
                        </span>
                        <span className='  font-bold'>
                        {item.end_at}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Ngày tạo
                        </span>
                        <span className='  font-bold'>
                        {item.created_at}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Chỉnh sửa lần cuối
                        </span>
                        <span className='  font-bold'>
                        {item.updated_at}
                        </span>
                      </div>
                    </div>
                    <div className='group'>
                        <button className='btn btn-danger'>Xóa</button>
                        <button className='btn btn-primary'>Chỉnh sửa</button>
                    </div>
                </div>
            )
        })
    }
    return(
        <div>
            {Chitiet()}
        </div>
    )
}