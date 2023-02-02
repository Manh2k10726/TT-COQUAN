import React, { Fragment, useEffect, useState } from 'react'
import { Table,Menu ,Dropdown ,DatePicker, Space,Button,message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../../App';
import {NavLink} from  'react-router-dom'
import { AiFillEdit,AiOutlineEye,AiOutlineDelete ,AiOutlineMore} from "react-icons/ai";
import './ThongBao.css';
import {NewsAction,getNewsByIdAction} from '../../../../Redux/Action/ManageNewsAction'
import { ManageNewsReducer } from './../../../../Redux/Reducer/ManageUtilityReducer';

export default function ThongBaoChung(props){
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(NewsAction())
    }, [])
    const {lstNews} = useSelector(state=>state.ManageNewsReducer)
    console.log('check News 2:',lstNews)
    function handleButtonClick(e) {
        message.info('Click on left button.');
      }
      
      function handleMenuClick(e) {
         history.push(`/utility/general-notifications/view/${lstNews.data.id}`)

      }
      
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" style={{color:'royalblue'}}>
           <AiOutlineEye/> Xem chi tiết
          </Menu.Item>
          <Menu.Item key="2" style={{color:'royalblue'}}>
           <AiFillEdit /> Sửa thông tin
          </Menu.Item>
          <Menu.Item key="3" style={{color:'red'}}>
            <AiOutlineDelete /> Xóa
          </Menu.Item>
        </Menu>
      );
      var stringToHTML = function (str) {
        var dom = document.createElement('div');
        dom.innerHTML = str;
        return dom;
    
    };
    return(
        <div  className='row ThongBao-container'>
       { lstNews&&lstNews.data?.map((item,index)=>{
            return(
                <>
                    <div className='col-5 TB-content'>
                        <div className='TB-header' key={index}>
                            <span>{item.subject}</span>
                            <Dropdown shape="circle"  placement="bottomLeft"  overlay={menu}>
                                <Button shape="circle" 
                                ><AiOutlineMore/></Button>
                            </Dropdown>
                        </div>
                        <div className='TB-body'>
                            {`${stringToHTML(item.content).textContent} `}
                        </div>
                        <div className='TB-footer'>
                        <span className='text-file'>Tài liệu đính kèm : </span>
                            {item&&item.attachments?.map((file,index)=>{
                                return(
                                <div className='file-name'>
                                    {file.file_name }
                                    <AiOutlineEye style={{fontSize:'15px',color:'green',margin:'5px'}}/>
                                </div>)
                            })}
                        </div>
                    </div>
            </>
            )
        })}
       </div>
    )
}