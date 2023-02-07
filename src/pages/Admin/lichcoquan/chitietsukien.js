import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleAction ,ScheduleByIdAction} from '../../../Redux/Action/ManageScheduleAction';
import './chitietsukien.css';
import { history } from '../../../App';
import moment from 'moment';
import { AiOutlineEye } from "react-icons/ai";

export default function ChiTietSuKien(props) {

    let {id}  = props.match.params;
    useEffect(() => {
        dispatch(ScheduleByIdAction(id))
    }, [])
    const {lstScheduleById}=useSelector(state=>state.ManageScheduleReducer)
    console.log('check data by id:',lstScheduleById);
    const dispatch = useDispatch();
    
    var stringToHTML = function (str) {
        var dom = document.createElement('div');
        dom.innerHTML = str;
        return dom;
    
    };
    return(
        <div className=''>
                    <div className='header'>
                    <span style={{fontWeight:'500',fontSize:'20px'}}>
                        Chi tiết sự kiện
                    </span>     
                    </div>
                    <div className='Detail'>
                      <div className='cs-container'>
                        <span className=' text font-bold'>
                            Thông tin
                        </span>
                        <span style={{fontWeight:'500'}}>
                            Mô tả chi tiết
                        </span>
                      </div>
                      <div className='cs-content'>
                        <span className=' text font-bold'>
                        Ngày thực hiện
                        </span>
                        <span className='  font-bold'>
                            {moment(lstScheduleById.start_at).format('DD/MM/YY')}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thời gian bắt đầu
                        </span>
                        <span className='  font-bold'>
                        {moment(lstScheduleById.start_at).format('HH:mm')}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thời gian kết thúc
                        </span>
                        <span className='  font-bold'>
                        {moment(lstScheduleById.end_at).format('HH:mm')}
                        {/* {lstScheduleById.end_at} */}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Chủ trì
                        </span>
                        <span className='  font-bold'>
                        {lstScheduleById.host}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Địa điểm
                        </span>
                        <span className='  font-bold'>
                        {lstScheduleById.location}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Chuẩn bị
                        </span>
                        <span className='  font-bold'>
                        {lstScheduleById.preparation}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Nội dung sự kiện
                        </span>
                        <span className='  font-bold'>
                        <div dangerouslySetInnerHTML={{ __html: lstScheduleById.event_notice }} />
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Tài liệu đính kèm
                        </span>
                        <span className='  font-bold'>
                       {lstScheduleById&&lstScheduleById.file_ids?.map((item)=>{
                        return(
                          <div style={{color:'blue'}}>
                          {item.file_title} <AiOutlineEye style={{color:"green"}}/>
                          </div>
                        )
                       })}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thành viên tham gia
                        </span>
                        <span className='  font-bold'>
                        {lstScheduleById.attenders}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Thông báo
                        </span>
                        <span className='  font-bold'>
                        {/* {moment(lstScheduleById.end_at).format('DD/MM/YYYY hh:mm')} */}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Ngày tạo
                        </span>
                        <span className='  font-bold'>
                        {moment(lstScheduleById.created_at).format('DD/MM/YYYY hh:mm')}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Chỉnh sửa lần cuối
                        </span>
                        <span className='  font-bold'>
                        {moment(lstScheduleById.updated_at).format('DD/MM/YYYY hh:mm')}
                        </span>
                      </div>
                    </div>
                    <div className='group'>
                        <button
                        onClick={() => {
                            history.push(`/company-work-schedule/views/${lstScheduleById.schedule_code}`)
                        }}
                         className='btn btn-primary'
                        >Chỉnh sửa</button>
                    </div>
                </div>
    )
}