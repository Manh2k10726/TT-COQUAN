import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../../App';
import { AiOutlineEye} from "react-icons/ai";
import './NewDetail.css'
import {getNewsByIdAction} from '../../../../Redux/Action/ManageNewsAction'
import { ManageUtilityReducer } from './../../../../Redux/Reducer/ManageUtilityReducer';
export default function NewsDetail(props){
    const dispatch = useDispatch(); 
    let {id}  = props.match.params;
    useEffect(()=>{
        dispatch(getNewsByIdAction(id))
    },[])
    const {lstNewsById} = useSelector(state=>state.ManageUtilityReducer)
    console.log('check data detail:',lstNewsById)
    var stringToHTML = function (str) {
        var dom = document.createElement('div');
        dom.innerHTML = str;
        return dom;
    };
    function downFile(file,name){
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
    return(
        <div className='CT'>
         <h5 >Chi tiết thông báo</h5>
           <div className='CT-tb-container'>

                    <div className='col-12 CT-TB-content'>
                        <div className='CT-TB-header' >
                            <span>{lstNewsById.subject}</span>
                        </div>
                        <div className='CT-TB-body'>
                            {`${stringToHTML(lstNewsById.content).textContent} `}
                        </div>
                        <div className='CT-TB-footer'>
                        <span className='CT-text-file'>Tài liệu đính kèm : </span>
                            {lstNewsById&&lstNewsById.attachments?.map((file,index)=>{
                                return(
                                <div className='CT-file-name'
                                onClick={()=>downFile(file.file_id,file.file_name)}
                                >
                                    {file.file_name }
                                    <AiOutlineEye style={{fontSize:'15px',color:'green',margin:'5px'}}/>
                                </div>)
                            })}
                        </div>
                    </div>
            
           </div>
        </div>
    )
}
