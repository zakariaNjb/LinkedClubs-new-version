import React,{useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import "../common/FollowersFollowings.css";
import {FaUserGraduate} from "react-icons/fa";
import { getJSON } from "../common/CommonFunctions";
import { url_backend } from "../common/URL";
//Icons
import {AiOutlineCloseCircle} from "react-icons/ai";
import {MdYoutubeSearchedFor,MdVerifiedUser} from "react-icons/md";


//closingFunction is a function responsible for closing followers section

const Followings=({closingFunction,nbrFollowings,userNameUrl})=>{

    const [followings,setFollowings]=useState([{following:{}}]);


    const search=async(event)=>{
        const value=event.target.value;
        const result=await getJSON(url_backend+"/students/"+userNameUrl+"/following/?search="+value);
        console.log("search following",result)
        setFollowings(result);
    }

    //Avatar fct is used to display Followers
    const Avatar=({obj})=>{
        
        return (
            <div className="follower" onClick={closingFunction}>
                <Link
                    to={obj.following.status==="club" ?
                        "/profilClub/"+obj.following.username:
                        "/profilStudent/"+obj.following.username
                    }
                    style={{textDecoration:"none",color:"black"}}
                >
                    <div>
                        <img src={obj.following.profile_image} alt="pict" />
                        <h3 
                            style={{fontWeight:"400",margin:"0 10px"}}
                        >{obj.following.fullname}</h3>
                    </div>
                </Link>
                {obj.following.status==="club" ? 
                    <MdVerifiedUser>
                    </MdVerifiedUser>:
                    <FaUserGraduate>
                    </FaUserGraduate>
                }
            </div>
        )
    };

    useEffect(() => {
        const getFollowings=async()=>{
            const result=await getJSON(url_backend+"/students/"+userNameUrl+"/following/");
            console.log(result);
            setFollowings(result);
        }
        getFollowings();
    }, [userNameUrl]);
    
    return ReactDOM.createPortal(
        <main className="followersFollowings">
            <section>
                <div>
                    <h1>Followings</h1>
                    <h4 style={{textAlign:"left"}}>
                        {nbrFollowings+" Followings"}
                    </h4>
                </div>
                <button onClick={closingFunction}>
                <AiOutlineCloseCircle
                    style={{fontSize:"2em"}}
                ></AiOutlineCloseCircle>
                </button>
            </section>
            <button className="search">
                <input type="text" placeholder="Search..." onChange={search}/>
                <MdYoutubeSearchedFor 
                    style={{fontSize:"2em",margin:"0px 5px"}}
                ></MdYoutubeSearchedFor>
            </button>
            {followings.map((e,index)=>{
                return <Avatar obj={e} key={index}/>
            })}
        </main>
    ,document.querySelector(".portal"));
}

export default React.memo(Followings);