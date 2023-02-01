import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleAction ,ScheduleByIdAction} from '../../../Redux/Action/ManageScheduleAction';
import './chitietsukien.css';
import { history } from '../../../App';
import moment from 'moment';

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
                        {stringToHTML(lstScheduleById.event_notice).textContent}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Tài liệu đính kèm
                        </span>
                        <span className='  font-bold'>
                        {lstScheduleById.file_ids}
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
                        {lstScheduleById.end_at}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Ngày tạo
                        </span>
                        <span className='  font-bold'>
                        {lstScheduleById.created_at}
                        </span>
                      </div><div className='cs-content'>
                        <span className=' text font-bold'>
                        Chỉnh sửa lần cuối
                        </span>
                        <span className='  font-bold'>
                        {lstScheduleById.updated_at}
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