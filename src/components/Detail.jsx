import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../css/detail.css'
import call_missed from '../assests/352256_call_missed_icon-small.svg'
import call_received from '../assests/352257_call_received_icon-small.svg'
import voicemail from '../assests/3669411_ic_voicemail_icon-small.svg'
import inbound from '../assests/4619653_arrow_inbound_input_inward_right_icon.svg'
import outbound from '../assests/4619654_arrow_left_outbound_output_way_icon.svg'

const baseURL = "https://aircall-job.herokuapp.com/activities"

const Detail = props =>{
    const initialCallDetail={
        id:null,
        created_at:"",
        direction:"",
        from:"",
        to:"",
        via:"",
        duration:"",
        is_archived:false,
        call_type:""
    }
    const[currentCallDetail,setCurrentCallDetail] = useState(initialCallDetail);

    const getDetail = id =>{
        axios.get(`${baseURL}/${id}`)
            .then(response=>{
                setCurrentCallDetail(response.data);
                console.log(response.data);
            })
            .catch(e =>{
                console.log(e);
            })
        }

    useEffect(()=>{
        console.log(props)
        getDetail(props.match.params.id);
    },[props.match.params.id]);

    const updateArchive = () =>{
        const status = !currentCallDetail.is_archived;
        var data = {
            is_archived:status
        };

        axios.post(`${baseURL}/${currentCallDetail.id}`,data)
            .then(response=>{
                setCurrentCallDetail({...currentCallDetail,is_archived:status});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }


    return(
        <div className="container-detail">
            <div className="call-detail from">{currentCallDetail.from}</div>
            <div className="call-detail via">{currentCallDetail.via}</div>
            <div className="call-detail to">To: {currentCallDetail.to != null ? currentCallDetail.to : 'Unknown'}</div>

            <div className="call-detail-box">
                <div className="detail-information" id="date">{new Date(currentCallDetail.created_at).toLocaleDateString({},
                        {timeZone:'UTC',month:"long",day:"2-digit",year:"numeric"})}</div>
                <div className="detail-information" id="time">{new Date(currentCallDetail.created_at).toLocaleTimeString({},
                        {timeZone:'UTC',hour: '2-digit', minute:'2-digit'})}</div>
                <div className="detail-information" id="duration">
                    {
                        (function(){
                            var second = Number(currentCallDetail.duration)
                            var h = Math.floor(second / 3600);
                            var m = Math.floor(second % 3600 / 60);
                            var s = Math.floor(second % 3600 % 60);

                            var hours = h > 0 ? h + (h === 1 ? 'h' : 'hrs') : '';
                            var minutes = m > 0 ? m + (m === 1 ? 'min': 'mins') : '';
                            var seconds = s > 0 ? 's': '';

                            return hours + minutes + seconds;
                            
                        })() 
                    }
                
                </div>
                <div className="detail-information" id="type">{currentCallDetail.call_type}
                    {(function(){
                        switch(currentCallDetail.call_type){
                            case 'missed' : return <img className="detail-img call-type" src={call_missed}/>;
                            case 'answered' : return <img className="detail-img call-type" src={call_received}/>;
                            case 'voicemail' : return <img className="detail-img call-type" src={voicemail}/>;
                            default: return null;
                        }
                        }) ()   
                    }
                </div>
                <div className="detail-information" id="direction">{currentCallDetail.direction}
                    {(function(){
                            switch(currentCallDetail.direction){
                                case 'inbound' : return <img className="detail-img call-direction" src={inbound}/>;
                                case 'outbound' : return <img className="detail-img call-direction" src={outbound}/>;
                                default: return null;
                            }
                            }) ()   
                    }
                
                </div>    
                
            </div>

                <div className="archive-call" onClick={updateArchive}>{currentCallDetail.is_archived === false ? 'archive' : 'unarchive'}</div> 

            <Link to={`/activities`}>
                <div className="button-back">Back</div>
            </Link>
            
        </div>
    )
}

export default Detail;