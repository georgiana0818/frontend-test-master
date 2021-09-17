import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../css/feed.css'

import call_missed from '../assests/352256_call_missed_icon.svg'
import call_received from '../assests/352257_call_received_icon.svg'
import voicemail from '../assests/3669411_ic_voicemail_icon.svg'
import BottomNav from '../BottomNav'

const baseURL = "https://aircall-job.herokuapp.com"

const Feed = () =>{
    const [feed, setFeed] = useState([])

    useEffect(()=>{
        retrieveAllCalls();
    },[]);

    const retrieveAllCalls = () =>{
        axios.get(`${baseURL}/activities`)
          .then(response=>{
              const groups = response.data.reduce((groups, call)=>{
                  const date = new Date(call.created_at).toLocaleDateString({},
                    {timeZone:'UTC',month:"long",day:"2-digit",year:"numeric"});          
                  if(!groups[date]){
                      groups[date] = [];
                  }
                  
                  if(call.is_archived !== true){
                    groups[date].push(call);
                  }
                  
                  
                  return groups;
              },{});

              const groupArrays = Object.keys(groups).map((date)=>{
                  return{
                      date,
                      calls:groups[date]
                  };
              });
              setFeed(groupArrays);
              console.log(groupArrays);
          })
          .catch(e => {
              console.log(e);
          })

    }

    return(
        <div className="container-feed">
            {feed && feed.map((item,index)=>(
                <ul className={"call-list"} key={index}>
                    <div className="calls-date"> <span>{item.date} </span></div>
                    {item.calls && item.calls.map((call,callIndex)=>(
                        <Link to={`/activities/${call.id}`} key={callIndex}>
                            <li>  
                                <div className={"call-list-item"}>
                                    <div className="call-type">
                                        {(function(){
                                            switch(call.call_type){
                                                case 'missed' : return <img className="feed-img" src={call_missed}/>;
                                                case 'answered' : return <img className="feed-img" src={call_received}/>;
                                                case 'voicemail' : return <img className="feed-img" src={voicemail}/>;
                                                default: return null;
                                            }
                                        }) ()   
                                        }
                                    </div>
                                    <div className="caller-callee-info caller">{call.from != null ? call.from : 'Unknown'}</div>
                                    <div className="call-time">&nbsp;&nbsp;{new Date(call.created_at).toLocaleTimeString({},{timeZone:'UTC',hour: '2-digit', minute:'2-digit'})}</div>
                                    <div className="caller-callee-info callee">
                                        {(function(){
                                            switch(call.call_type){
                                                case 'missed' : return 'tried to call on ';
                                                case 'answered' : return 'called on ';
                                                case 'voicemail' : return 'voicemail to ';
                                                default: return null;
                                            }
                                        })()   
                                        }
                                        {call.to != null ? call.to : 'Unknown'}</div>
                                    </div>                                
                            </li>    
                        </Link>
                    ))}
                </ul>
            ))}
            <BottomNav/>
        </div>
        
        
    )
}

export default Feed;