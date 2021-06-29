import React from "react";
import "./ProfileInfo.css";
//Icons
import default_profileImage from "../images/default_profileImage.jpg";
import default_backgroundImage from "../images/default_backgroundImage.jpg";

import {AiFillCamera} from "react-icons/ai";
import {FaUserGraduate} from "react-icons/fa";
import {MdVerifiedUser} from "react-icons/md";
import {postFormData } from "./CommonFunctions";
import { url_backend } from "./URL";

/*This component will be used in both pages profileClub & profileStudent*/

function ProfileInfo({openFollowers,openFollowings,userInfo}){


    //Ref
    const nbr_followers=React.useRef();
    const nbr_followings=React.useRef();
    
    //Ref to grap Images
    const backgroundImgRef=React.useRef();
    const profileImgRef=React.useRef();

    //this fct will be used in updateImg
    const previewFile=(input,img)=> {
        let file    = input.files[0];
        let reader  = new FileReader();

        reader.addEventListener("load", function () {
            img.src=reader.result;
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
    };

    //Update profile/background image
    const updateImg=async (event)=>{
        const input=event.target;
        const id=input.getAttribute("id");
        const img=document.querySelector("."+id);
        previewFile(input,img);
        //PATCH request
        const entity=JSON.parse(localStorage.getItem("user"));
        console.log(entity)
        const formData=new FormData();
        if(id==="profileImg"){
            formData.append("profile_image",input.files[0]);
            var url=url_backend+"/"+entity.status+"s/"+entity.user+"/";
        }else{
            formData.append("background_image",input.files[0]);
            url=url_backend+"/"+entity.status+"s/"+entity.user+"/";
        }
        const result=await postFormData(url,"PATCH",formData);
        //Update in local storage
        const newProfileImg=result.profile_image.replace(url_backend,"");
        entity.profile_image=newProfileImg;
        localStorage.clear();
        localStorage.setItem("user",JSON.stringify(entity));
    };
    
    const follow=async (event)=>{
        const followBtn=event.target;
        const formData=new FormData();
        const followText=followBtn.textContent;
        console.log(followText);
        const username=JSON.parse(localStorage.getItem("user")).user;
        const hNbrFollowers=nbr_followers.current;
        switch(followText){
            case "Follow":
                console.log(userInfo.username);
                formData.append("following_user",userInfo.username);
                var result=await postFormData(url_backend+"/students/"+username+"/following/","POST",formData);
                formData.append("follower_user",username);
                result=await postFormData(url_backend+"/students/"+userInfo.username+"/follower/","POST",formData);
                if(userInfo.status==="club"){
                    formData.append("username",username);
                    result=await postFormData(url_backend+"/clubs/"+userInfo.username+"/join/","POST",formData);
                }
                if(result.success){
                    followBtn.textContent="Unfollow";
                    hNbrFollowers.textContent=parseInt(hNbrFollowers.textContent)+1;
                }
            break;
            case "Unfollow":
                console.log(userInfo.username);
                formData.append("username",userInfo.username);
                result=await postFormData(url_backend+"/students/"+username+"/unfollow/","POST",formData);
                console.log(result);
                if(result.success){
                    followBtn.textContent="Follow";
                    hNbrFollowers.textContent=parseInt(hNbrFollowers.textContent)-1;
                }
            break;
            default: return;
        }

    };

    return (
        <main id="info">
            <section className="background">
                <img className="backgroundImg" 
                    src={
                        userInfo.background_image!==undefined ?
                        userInfo.background_image :
                        default_backgroundImage
                    } 
                    ref={backgroundImgRef} 
                    alt="pict"
                />
                <div>
                    <img className="profileImg" 
                        src={
                            userInfo.profile_image!==undefined ?
                            userInfo.profile_image :
                            default_profileImage
                        } 
                        ref={profileImgRef} 
                        alt="pict"
                    />
                    {JSON.parse(localStorage.getItem("user")).user===userInfo.username ? 
                        <React.Fragment>
                            <label htmlFor="profileImg">
                                <AiFillCamera fontSize="1.3em" color="snow"></AiFillCamera>
                            </label>
                            <input type="file" id="profileImg" hidden onChange={updateImg}/>
                        </React.Fragment>
                        :null
                    }
                </div>
                {JSON.parse(localStorage.getItem("user")).user===userInfo.username ? <span>
                    <label htmlFor="backgroundImg">
                        <AiFillCamera fontSize="1.3em"></AiFillCamera>
                    </label>
                    <input type="file" id="backgroundImg" hidden onChange={updateImg}/>
                    <h4 style={{margin:"0px"}}>Edit Cover Photo</h4>
                </span>:null}
            </section>
            <section className="Bio">
                <h1>
                    <strong style={{paddingRight:"10px"}}>{userInfo.fullname}</strong>
                    {userInfo.status==="club" ?
                        <MdVerifiedUser color="rgb(0, 225, 255)"/>:
                        <FaUserGraduate color="rgb(0, 225, 255)"/>
                    }
                </h1>
                {userInfo.bio!==undefined ?
                    <p>{userInfo.bio}</p>:
                   <div style={{display:"block"}}>
                        <span style={{margin:"5px 0px",display:"inline-block",width:"100%",height:"20px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></span>
                        <span style={{margin:"5px 0px",display:"inline-block",width:"100%",height:"20px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></span>
                        <span style={{margin:"5px 0px",display:"inline-block",width:"100%",height:"20px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></span>
                   </div>
                }
                <div>
                    <span>
                        <button onClick={openFollowers}>
                            <h2 ref={nbr_followers}>{userInfo.nbr_followers}</h2>
                            <h3>Followers</h3>
                        </button>
                        {userInfo.status==="student" ? 
                        <button onClick={openFollowings}>
                            <h2 ref={nbr_followings}>{userInfo.nbr_following}</h2>
                            <h3>Followings</h3>
                        </button>:null}
                    </span>
                    {JSON.parse(localStorage.getItem("user")).user===userInfo.username || JSON.parse(localStorage.getItem("user")).status==="club" ? null:
                        <button 
                            className="follow" 
                            onClick={follow}>
                            {userInfo.isFollowed==="true" ? "Unfollow":"Follow"}
                        </button>
                    }
                </div>
            </section>
        </main>
    )
}

export default React.memo(ProfileInfo);