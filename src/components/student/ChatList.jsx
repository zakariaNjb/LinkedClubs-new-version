import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../common/FollowersFollowings.css";
import {FaUserGraduate} from "react-icons/fa";
import { getJSON } from "../common/CommonFunctions";
import { url_backend } from "../common/URL";
//Icons
import {AiOutlineCloseCircle} from "react-icons/ai";
import {MdYoutubeSearchedFor} from "react-icons/md";


//closingFunction is a function responsible for closing followers section

const ChatList=({match})=>{

    var data;
    if(JSON.parse(localStorage.getItem("user")).status==="student") data={following:{}};
    else data={follower:{}}
    
    const [ChatList,setChatList]=useState([data]);
    const [nbrFollowings,setNbrFollowings]=useState();

    const search=async(event)=>{
        const value=event.target.value;
        if(JSON.parse(localStorage.getItem("user")).status==="student")
            var result=await getJSON(url_backend+"/students/"+match.params.id+"/following/?search="+value);
        else  result=await getJSON(url_backend+"/students/"+match.params.id+"/follower/?search="+value);
        console.log("search following",result)
        setChatList(result);
    }

    //Avatar fct is used to display Followers
    const Avatar=({obj})=>{
        
        if(JSON.parse(localStorage.getItem("user")).status==="student")
        return (
            <div className="follower">
                <Link
                    to={"/chatRoom/"+obj.following.username}
                    style={{textDecoration:"none",color:"black"}}
                >
                    <div>
                        <img src={obj.following.profile_image} alt="pict" />
                        <h3 
                            style={{fontWeight:"400",margin:"0 10px"}}
                        >{obj.following.fullname}</h3>
                    </div>
                </Link>
                <FaUserGraduate></FaUserGraduate>
            </div>
        )
        
        else return (
            <div className="follower">
                <Link
                    to={"/chatRoom/"+obj.follower.username}
                    style={{textDecoration:"none",color:"black"}}
                >
                    <div>
                        <img src={obj.follower.profile_image} alt="pict" />
                        <h3 
                            style={{fontWeight:"400",margin:"0 10px"}}
                        >{obj.follower.fullname}</h3>
                    </div>
                </Link>
                <FaUserGraduate></FaUserGraduate>
            </div>
        )
    };

    useEffect(() => {
        const getFollowings=async()=>{
            console.log("hello");
            var result;
            if(JSON.parse(localStorage.getItem("user")).status==="student")
                result=await getJSON(url_backend+"/students/"+match.params.id+"/following/");
            else result=await getJSON(url_backend+"/students/"+match.params.id+"/follower/");
            console.log("hh", result);
            setChatList(result);
            setNbrFollowings(result.length-1);
        }
        getFollowings();
    }, []);
    
    return <main className="followersFollowings">
            <section>
                <div>
                    <h1>Chat List</h1>
                    <h4 style={{textAlign:"left"}}>
                        {nbrFollowings+1+" users"}
                    </h4>
                </div>
                <button>
                <Link to={"/homepage/"+match.params.id} style={{color:"black"}}>
                    <AiOutlineCloseCircle
                        style={{fontSize:"2em"}}
                    ></AiOutlineCloseCircle>
                </Link>
                </button>
            </section>
            <button className="search">
                <input type="text" placeholder="Search..." onChange={search}/>
                <MdYoutubeSearchedFor 
                    style={{fontSize:"2em",margin:"0px 5px"}}
                ></MdYoutubeSearchedFor>
            </button>
            {ChatList.map((e,index)=>{
                return <Avatar obj={e} key={index}/>
            })}
        </main>
};

export default React.memo(ChatList);