import React, { Fragment, useEffect, useState } from 'react'
import { Table  ,DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../App';
import {NavLink} from  'react-router-dom'
import { ScheduleAction } from '../../../Redux/Action/ManageScheduleAction';
import { ManageScheduleReducer } from './../../../Redux/Reducer/ManageScheduleReducer';
import moment from 'moment';
export default function Lichcoquan(props) {

    const {lstSchedule} = useSelector(state=>state.ManageScheduleReducer)
    console.log('lstSchedule:',lstSchedule)

    const dispatch = useDispatch();
    const onChangeDate = (date, dateString) => {
        const monday = new Date(date._d);
        const sunday = new Date(date._d);
        var d = monday.getDay();
        var s = sunday.getDay();
        var diff = monday.getDate() - d + (d === 0 ? -6 : 1);
        var diff2 = sunday.getDate() - s + (s === 0 ? 0 : 6);
        const setMonday = new Date(monday.setDate(diff));
        const setSunday = new Date(sunday.setDate(diff2));
        // console.log("Sunday: ", setSunday);
        const from_date = new Date(setMonday)
          .toISOString("yyyy-mm-dd")
          .split("T")[0];
        const to_date = new Date(setSunday).toISOString("yyyy-mm-dd").split("T")[0];
        // console.log("to_date: ", to_date);
        // let res = await getLichCoQuan(from_date, to_date);
        // console.log(res);
        // setLichCoQuan(res);
        dispatch(ScheduleAction(from_date, to_date));
    };

    useEffect(() => {
        dispatch(ScheduleAction())    
    }, [])
    var stringToHTML = function (str) {
        var dom = document.createElement('div');
        dom.innerHTML = str;
        return dom;
    
    };
    const columns = [
        {
            title: 'Ngày tháng',
            dataIndex: 'start_at',
            render: (text, item) => {
                return <Fragment>
                    {`${moment(item.start_at).format('dddd DD/MM')} `}
                </Fragment>
            }
        },
        {
            title: 'Nội dung công việc',
            dataIndex: 'event_notice',
            render: (text, item) => {
                return <Fragment>
                     <NavLink style={{color:'black'}}
                        to={`/company-work-schedule/view/${item.schedule_code}`}>
                        {`${stringToHTML(item.event_notice).textContent} `}
                    </NavLink>
                    
                </Fragment>
            }
        },
        {
            title: 'Tài liệu',
            dataIndex: 'preparation',
           
        },
        {
            title: 'Thành viên tham gia',
            dataIndex: 'attenders',
            
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
        },
        {
            title: 'Chủ trì',
            dataIndex: 'host',
        },
       
        
    ];
    
   
    return (
        <div className='my-20 mx-48'>
            <div className='header'>
            <span className=' text-3xl font-bold'>
                Lịch cơ quan
            </span>
            <Space direction="vertical">
                <DatePicker onChange={onChangeDate} picker="week" />
                <button type="primary"
                    className='btn btn-primary' 
                    onClick={() => {
                        history.push(`/company-work-schedule/create`)
                    }} >
                    Tạo sự kiện mới 
                </button>
            </Space>
            </div>
            <div className='my-8'>
                <Table
                    dataSource={lstSchedule}
                    columns={columns}
                    key=''
                    // pagination={{
                    //     defaultCurrent: pageId,
                    //     defaultPageSize:4,
                    //     total: `${lstUser.total_count}`,
                    //     onChange: (page, pageSize) => {
                    //         dispatch(GetListUserAction(page - 1))
                    //         history.replace(`/Home/${page}`)
                    //     }
                    // }} 
                    />

            </div>
        </div>
    )
}