import React, { useState ,useEffect} from "react";
import ReactDOM from "react-dom";
import "./FollowersFollowings.css";
import {Link} from "react-router-dom";
//Icons
import {MdVerifiedUser} from "react-icons/md";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {MdYoutubeSearchedFor} from "react-icons/md";
import {FaUserGraduate} from "react-icons/fa";
import { getJSON } from "./CommonFunctions";
import { url_backend } from "./URL";


//closingFunction is a function responsible for closing followers section

const Followers=({closingFunction,nbrFollowers, userNameUrl})=>{

    const [followers,setFollowers]=useState([{follower:{}}]);

    
    const search=async(event)=>{
        const value=event.target.value;
        const result=await getJSON(url_backend+"/students/"+userNameUrl+"/follower/?search="+value);
        setFollowers(result);
    }

    useEffect(() => {
        const getFollowers=async()=>{
            const result=await getJSON(url_backend+"/students/"+userNameUrl+"/follower/");
            console.log(result);
            setFollowers(result);
        }
        getFollowers();
    }, [userNameUrl]);

    //Avatar fct is used to display Followers
    const Avatar=({obj})=>{
        return (
           
            <div className="follower" onClick={closingFunction}>
                <Link
                    to={obj.follower.status==="club" ?
                        "/profilClub/"+obj.follower.username:
                        "/profilStudent/"+obj.follower.username
                    }
                    style={{textDecoration:"none",color:"black"}}
                >
                <div>
                    <img src={obj.follower.profile_image} alt="pict" />
                    <h3 
                        style={{fontWeight:"400",margin:"0 10px"}}
                    >{obj.follower.fullname}</h3>
                </div>
                </Link>
                <button style={{fontSize:"1.1em"}}>
                    {obj.follower.status==="club" ?
                        <MdVerifiedUser></MdVerifiedUser>
                        :<FaUserGraduate></FaUserGraduate>
                    }
                </button>
            </div>
            
        )
    };

    return ReactDOM.createPortal(
        <main className="followersFollowings">
            <section>
                <div>
                    <h1>Followers</h1>
                    <h4 style={{textAlign:"left"}}>
                        {nbrFollowers+" Follower"}
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
            
            {followers.map((e,index)=>{
                return <Avatar obj={e} key={index}/>
            })}


        </main>
    ,document.querySelector(".portal"));
}

export default React.memo(Followers);