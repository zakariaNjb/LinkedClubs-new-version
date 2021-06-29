import React,{useEffect, useState,useCallback} from "react";
import { getJSON, postFormData } from "../common/CommonFunctions";
import "./ChatRoom.css";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import {AiOutlineSend} from "react-icons/ai";
import { url_backend } from "../common/URL";


function ChatRoom({match}){

    let [messages,setMessages]=useState([]);
    let [chatSocket,setChatSocket]=useState();
    const [otherData,setOtherData]=useState({});

    const textRef=React.createRef();

    let sendMessage;

    //Diff bewteen two Dates
    const calculDate=(messageDate)=>{
        //Get Dates in miliseconds
        const currentDate=Date.now();
        const publishedDate=new Date(messageDate).getTime();
        const diffDate=(currentDate-publishedDate);
        let seconds = (diffDate / 1000).toFixed(1);
        let minutes = (diffDate / (1000 * 60)).toFixed(1);
        let hours = (diffDate / (1000 * 60 * 60)).toFixed(1);
        let days = (diffDate / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return Math.floor(seconds)+1 + "s";
        else if (minutes < 60) return Math.floor(minutes) + "m";
        else if (hours < 24) return Math.floor(hours) + "h";
        else return Math.floor(days) + "d";
    };


    useEffect(() => {
        
        const room=async()=>{

            const res=await getJSON(url_backend+"/chat/students/"+match.params.id+"/");
            setOtherData(res);

            const formData=new FormData();
            formData.append("connected_username",JSON.parse(localStorage.getItem("user")).user);
            formData.append("other_username",match.params.id);
            const result=await postFormData(url_backend+"/chat/rooms/","POST",formData);
            console.log(result)
            if(result.success) setMessages(result.messages);   
            chatSocket=new WebSocket("ws://127.0.0.1:8000/ws/chat/"+result._id+"/");
            console.log("chatsocket",chatSocket);
            setChatSocket(chatSocket);          

            chatSocket.onmessage=(e)=>{
                const data=JSON.parse(e.data);
                console.log("onmessage : ",data);
                result.messages=result.messages.concat([data]);
                console.log("message",messages);
                const section=document.querySelector("#chatRoom section");
                section.scrollTop = section.scrollHeight-section.clientHeight;
                setMessages(result.messages);
            }
    
            chatSocket.onclose=(e)=>{
                console.log("socket closed");
            } 
        } 
        room();
    }, []);


    useEffect(()=>{
        const section=document.querySelector("#chatRoom section");
        section.scrollTop = section.scrollHeight-section.clientHeight;
    },[messages])

    sendMessage=useCallback(async()=>{
        console.log("use call back")
        const textArea=document.querySelector("#chatRoom textarea");
        console.log(textArea);
        console.log(textArea.value);
        if(chatSocket!==undefined){
            const obj={
                "user":{
                    "username":JSON.parse(localStorage.getItem("user")).user
                },
                "content":textArea.value
            }
            chatSocket.send(JSON.stringify(obj))
            const formData=new FormData();
            formData.append("connected_username",JSON.parse(localStorage.getItem("user")).user);
            formData.append("other_username",match.params.id);
            formData.append("message",textArea.value);
            const result=await postFormData(url_backend+"/chat/messages/","POST",formData);
            console.log("lala",result);
            textArea.value="";
        }
    },[chatSocket]);
    
    
    console.log("prev",messages);

    return (
        <main id="chatRoom">
            <header>
                <div>
                    <img  src={otherData.profile_image} alt="" />
                    <span style={{fontSize:"1.5em",paddingLeft:"15px",fontWeight:"500"}}>{otherData.fullname}</span>
                </div>
                <button style={{
                    backgroundColor:"transparent",
                    outline:"none",
                    border:"none"
                }}>
                <Link to={"/chat/"+JSON.parse(localStorage.getItem("user")).user} style={{color:"black"}}>
                    <AiOutlineCloseCircle
                        style={{fontSize:"2em"}}
                    ></AiOutlineCloseCircle>
                </Link>
                </button>
            </header>
            <section>
                {messages.map((e,index)=>{
                    if(e.user.username===JSON.parse(localStorage.getItem("user")).user){
                        return (<div className="right" key={index}>
                            <div className="message">
                                <p>{e.content}</p>
                                <span style={{textAlign:"right"}}>{calculDate(e.date)}</span>
                            </div>
                        </div>)
                    }else {
                        return (<div className="left" key={index}>
                            <div className="message">
                                <p>{e.content}</p>
                                <span style={{textAlign:"left"}}>{calculDate(e.date)}</span>
                            </div>
                        </div>)
                    }
                })}
            </section>
            <div className="writing">
                <textarea
                    ref={textRef}
                    placeholder="Texting..."
                    name="" 
                    id="text" 
                    cols="30" 
                    rows="3"
                ></textarea>
                <button onClick={sendMessage}>
                    <AiOutlineSend></AiOutlineSend>
                </button>
            </div>
        </main>
    )
}

export default React.memo(ChatRoom);