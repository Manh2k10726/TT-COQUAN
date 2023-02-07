import React, { Fragment, useEffect, useState } from 'react'
import { Table  ,DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../App';
import {NavLink} from  'react-router-dom'
import { ScheduleAction } from '../../../Redux/Action/ManageScheduleAction';
import { ManageScheduleReducer } from './../../../Redux/Reducer/ManageScheduleReducer';
import moment from 'moment';
import './lichcoquan.css'
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
        const from_date = new Date(setMonday)
          .toISOString("yyyy-mm-dd")
          .split("T")[0];
        const to_date = new Date(setSunday).toISOString("yyyy-mm-dd").split("T")[0];
        // setFrom_date(from_date);
        // setTo_date(to_date)
        dispatch(ScheduleAction(from_date, to_date));
    };
    // const [from_date,setFrom_date] = useState();
    // const [to_date,setTo_date] = useState();
    useEffect(() => {
        const monday = new Date();
        const sunday = new Date();
        var d = monday.getDay();
        var s = sunday.getDay();
        var diff = monday.getDate() - d + (d === 0 ? -6 : 1);
        var diff2 = sunday.getDate() - s + (s === 0 ? 0 : 6);
        const setMonday = new Date(monday.setDate(diff));
        const setSunday = new Date(sunday.setDate(diff2));
        const from_date = new Date(setMonday)
          .toISOString("yyyy-mm-dd")
          .split("T")[0];
        const to_date = new Date(setSunday).toISOString("yyyy-mm-dd").split("T")[0];
        dispatch(ScheduleAction(from_date, to_date)) ;   
    }, [])

    const start_ats = new Set();
    React.useEffect(() => {
        // kinda hacky, cause render 2 times, names has all value, ann table shows incorectly
        start_ats.clear();
      });

    const columns = [
        {
            title: 'Ngày tháng',
            dataIndex: 'start_at',
            rowSpan:1,
            render: (value, item,index) => {
                const days=moment(value.slice(0,10)).format('DD/MM')
                const obj = {
                    children: moment(value.slice(0,10)).format('dddd DD/MM'),
                    props: {},
                  };
          
                  console.log('check:',start_ats.has(days), days);
          
                  if (start_ats.has(days)) {
                    obj.props.rowSpan = 0;
                  } else {
                    const occurCount = lstSchedule.filter((lstSchedule) => moment(lstSchedule.start_at).format('DD/MM') === days).length;
          
                    obj.props.rowSpan = occurCount;
                    start_ats.add(days);
                  }
          
                  return obj;
              
            }
        },
        {
            title: 'Nội dung công việc',
            dataIndex: 'event_notice',
            render: (text, item) => {
                return <Fragment>
                    <NavLink style={{color:'black'}}
                   
                     
                        to={`/company-work-schedule/view/${item.schedule_code}`}>
                        {/* {`${stringToHTML(item.event_notice).textContent} `}
                        {(item.event_notice).innerHTML } */}
                         <div style={{fontWeight:'500'}}>
                            {`${moment(item.start_at).format('LT')} to ${moment(item.end_at).format('LT')}`}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: item.event_notice }} />
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
    const onHeaderRow =(record,index)=>{
        // console.log('check:',record,index)
        
    }
   
    return (
        <div className='schedule-container'>
            <div className='header'>
            <span className=' text'>
                Lịch cơ quan
            </span>
            <Space  direction="vertical">
                <div className='header-schedule'>
                <DatePicker onChange={onChangeDate} picker="week" />
                <button type="primary"
                    className='btn btn-primary' 
                    onClick={() => {
                        history.push(`/company-work-schedule/create`)
                    }} >
                    Tạo sự kiện mới 
                </button>
                </div>
            </Space>
            </div>
            <div className='my-8'>
                <Table
                    bordered
                    dataSource={lstSchedule}
                    columns={columns}
                    key=''
                    pagination= {false}
                    />
            </div>
        </div>
    )
}