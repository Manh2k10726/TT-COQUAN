import React, { Fragment, useEffect, useState } from 'react'
import { Table  ,DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../App';
import { AiTwotoneEdit } from 'react-icons/ai';
import { ScheduleAction } from '../../../Redux/Action/ManageScheduleAction';
import { ManageScheduleReducer } from './../../../Redux/Reducer/ManageScheduleReducer';
export default function ManageUser(props) {

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
        // dispatch(ScheduleAction(from_date, to_date));
    };

    useEffect(() => {
        dispatch(ScheduleAction())    
    }, [])

    const columns = [
        {
            title: 'Ngày tháng',
            dataIndex: 'start_at',
        },
        {
            title: 'Nội dung công việc',
            dataIndex: 'preparation',
            // render: (text, item) => {
            //     return <Fragment>
            //         {`${item.firstname} ${item.lastname}`}
            //     </Fragment>
            // }
        },
        {
            title: 'Tài liệu',
            dataIndex: 'file_ids',
            render: (text, item) => {
                return <Fragment>
                    {`${item.file_ids.file_title} `}
                </Fragment>
            }
        },
        {
            title: 'Thành viên tham gia',
            dataIndex: 'assignees',
            render: (text, item) => {
                return <Fragment>
                    {`${item.assignees.name_uppercase}`}
                </Fragment>
            }
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
        },
        {
            title: 'Chủ trì',
            dataIndex: 'host',
        },
        // {
        //     title: '',
        //     dataIndex: 'id',
        //     key: 'id',
        //     render: (text, item) => {
        //         return <div className='flex'>
        //             <button className='btn btn-light edit-btn' title='Sửa' onClick={() => {
        //                 history.push(`/User/${item.id}`)
        //             }}>
        //                 <AiTwotoneEdit style={{ fontSize: 20 }}></AiTwotoneEdit>
        //             </button>
        //         </div>
        //     },
        // },
        
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
                    className='create-btn' >
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