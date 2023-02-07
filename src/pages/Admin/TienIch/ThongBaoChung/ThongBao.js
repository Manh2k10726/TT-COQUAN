import React, { Fragment, useEffect, useState } from 'react'
import { Table,Menu ,Dropdown , Space,Button,message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../../App';
import {NavLink} from  'react-router-dom'
import { AiFillEdit,AiOutlineEye,AiOutlineDelete ,AiOutlineMore} from "react-icons/ai";
import './ThongBao.css';
import {NewsAction,getFileById,delNews} from '../../../../Redux/Action/ManageNewsAction'
import {InfiniteScroll} from 'react-infinite-scroll'

export default function ThongBaoChung(props){
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(NewsAction())
    }, [])
    useEffect(() => {
        dispatch(getFileById(fileId))
    }, [])
    const {lstNews} = useSelector(state=>state.ManageNewsReducer)
    const [ID,setID]=useState();
    function hanldOnchange(id){
        setID(id)
    }
    const [fileId,setFileId]=useState();
    // const [fileName,setFileName]=useState();
    function downFile (file,name){
        setFileId(file)
        fetch(`https://stg.vimc.fafu.com.vn/api/v1/upload/attachments/${file}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
        }
          
        )
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = name;
					a.click();
                    
				});
				// window.location.href = response.url;
		});
    }

    
    const {lstFileById} = useSelector(state=>state.ManageNewsReducer)
    console.log('check file:',lstFileById)
      function handleMenuClick() {
        history.push(`/utility/general-notifications/view/${ID}`)
      }

      function handleDelNew(){
        dispatch(delNews(ID));
        // dispatch(NewsAction())
      }
      function goToEditNews(){
        history.push(`/utility/general-notifications/update/${ID}`)
      }
      const menu = (
        <Menu >
          <Menu.Item onClick={handleMenuClick} key="1" style={{color:'royalblue'}} >
           <AiOutlineEye/> Xem chi tiết 
          </Menu.Item>
          <Menu.Item  onClick={goToEditNews} key="2" style={{color:'royalblue'}}>
           <AiFillEdit /> Sửa thông tin
          </Menu.Item>
          <Menu.Item onClick={handleDelNew} key="3" style={{color:'red'}}>
            <AiOutlineDelete /> Xóa
          </Menu.Item>
        </Menu>
      );

    return(
        <>
        {/* <InfiniteScroll> */}
        <div style={{paddingBottom:'15px',paddingTop:'10px',display:'flex',justifyContent:'space-between'}}>
            <span style={{fontWeight:'500',fontSize:'20px'}}>
                Thông báo chung
            </span>
            <button style={{}} className=' btn btn-primary'
                onClick={() => {
                history.push(`/utility/general-notifications/create`)
                }}
                >Đăng thông báo 
            </button>
        </div>
        <div className='TB'>
        <div  className='row ThongBao-container'>
       { lstNews&&lstNews.data?.map((item,index)=>{
            return(
                <>
                    <div className='col-5 TB-content'>
                        <div className='TB-header' key={index}>
                            <span>{item.subject}</span>
                            <Dropdown shape="circle" trigger={['click']} placement="bottomLeft"  overlay={menu}>
                                <Button shape="circle" onClick={()=>hanldOnchange(item.id)}
                                ><AiOutlineMore/></Button>
                            </Dropdown>
                        </div>
                        <div className='TB-body'>
                            <div dangerouslySetInnerHTML={{ __html: (item.content)}} />
                        </div>
                        <div className='TB-footer'>
                        <span className='text-file'>Tài liệu đính kèm : </span>
                            {item&&item.attachments?.map((file,index)=>{
                                return(
                                file.file_id&&file.file_name?
                                <div className='file'>
                                <span style={{cursor: 'pointer'}} className='file-name'
                                    onClick={()=>downFile(file.file_id,file.file_name)}
                                >
                                    {file.file_name }
                                </span>
                                    <AiOutlineEye className='icon-eye' style={{fontSize:'15px',color:'green',margin:'5px'}}/>
                                </div>
                                :<>
                                    không có tài liệu đính kèm
                                </>
                                )
                            })}
                        </div>
                    </div>
            </>
            )
        })}
       </div>
       </div>
       {/* </InfiniteScroll> */}
       </>
    )
}