import React from "react";
import ReactDOM from "react-dom";
import "../common/FollowersFollowings.css";
import pict from "../images/profileImg.jpg";
//Icons
import {AiOutlineCloseCircle} from "react-icons/ai";
import {MdYoutubeSearchedFor} from "react-icons/md";



//closingFunction is a function responsible for closing Members section

const Members=({closingFunction})=>{


    //Avatar fct is used to display Members
    const Avatar=()=>{

        return (
            <div className="follower">
                <div>
                    <img src={pict} alt="pict" />
                    <h3 
                        style={{fontWeight:"400",margin:"0 10px"}}
                    >Najib Zakaria</h3>
                </div>
            </div>
        )
    };

    return ReactDOM.createPortal(
        <main className="followersFollowings">
            <section>
                <div>
                    <h1>Members</h1>
                    <h4>301 Member</h4>
                </div>
                <button onClick={closingFunction}>
                <AiOutlineCloseCircle
                    style={{fontSize:"2em"}}
                ></AiOutlineCloseCircle>
                </button>
            </section>
            <button className="search">
                <input type="text" placeholder="Search..."/>
                <MdYoutubeSearchedFor 
                    style={{fontSize:"2em",margin:"0px 5px"}}
                ></MdYoutubeSearchedFor>
            </button>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
        </main>
    ,document.querySelector(".portal"));
}

export default React.memo(Members);