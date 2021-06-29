import React,{useEffect, useState} from "react";
import ClubsLogos from "./ClubsLogos";
import ProfileInfo from "../common/ProfileInfo";
import PostsField from "../common/PostsField";
import MenuSMobile from "./MenuSMobile";
import Followers from "../common/Followers";
import Followings from "./Followings";
import {menuScroll} from "../common/CommonFunctions.js";
import {getJSON} from "../common/CommonFunctions";
import {url_backend} from "../common/URL";
import MenuCMobile from "../club/MenuCMobile";
import {postFormData} from "../common/CommonFunctions";


function ProfileStudent({match}){

    //student state
    const [studentData,setStudentData]=useState({});


    //display / hid followers and followings sections
    const [isFollowersOpen,setDispFollowers]=useState(false);
    const [isFollowingsOpen,setDispFollowings]=useState(false);
    const openSection=(setDiplayFct) => {
        return ()=>{
            const portal=document.querySelector(".portal");
            portal.classList.add("displayPortal");
            setDiplayFct(true);
        };
    };
    const closeSection=(setDiplayFct)=>{
        return ()=>{
            const portal=document.querySelector(".portal");
            portal.classList.remove("displayPortal");
            setDiplayFct(false);
        };
    };
    
    useEffect(()=>{
        const getStudentData=async ()=>{
            const stdData=await getJSON(url_backend+"/students/"+match.params.id+"/");
            const clubs=await getJSON(url_backend+"/students/"+match.params.id+"/joined_clubs/");
            const formData=new FormData();
            formData.append("username",match.params.id);
            const result=await postFormData(url_backend+"/students/"+JSON.parse(localStorage.getItem("user")).user+"/check_follow/","POST",formData);
            stdData.clubs=clubs;
            stdData.isFollowed=result.response;
            console.log("student data",stdData)
            setStudentData(stdData);
        }
        getStudentData();
    },[match.params.id]);

    useEffect(() => {
        window.onscroll=menuScroll;
        return () => {
            //scroll top
            window.removeEventListener("onscroll",menuScroll);
            console.log("profileStudent disapear");
            //scroll to the top after routing
            window.scrollTo(0, 0);
            return  null;
        }
    }, []);

    
    return (
        <React.Fragment>
            <ProfileInfo
                userInfo={studentData}
                openFollowers={openSection(setDispFollowers)}
                openFollowings={openSection(setDispFollowings)}
            ></ProfileInfo>
            {studentData.clubs!==undefined && studentData.clubs.length >0 ?
                <ClubsLogos clubs={studentData.clubs}></ClubsLogos>:
                null
            }
            <PostsField posts={studentData.posts}>
            </PostsField>
            {JSON.parse(localStorage.getItem("user")).status==="student"?
                <MenuSMobile></MenuSMobile>:
                <MenuCMobile></MenuCMobile>
            }
            {isFollowersOpen ? <Followers
                nbrFollowers={studentData.nbr_followers}
                userNameUrl={match.params.id}
                closingFunction={closeSection(setDispFollowers)}
            ></Followers>:null}
            {isFollowingsOpen ? <Followings
                nbrFollowings={studentData.nbr_following}
                userNameUrl={match.params.id}
                closingFunction={closeSection(setDispFollowings)}
            ></Followings>:null}
        </React.Fragment>
    );

}

export default React.memo(ProfileStudent);