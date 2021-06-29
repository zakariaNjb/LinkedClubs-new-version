import React,{useEffect,useState} from "react";
import ProfileInfo from "../common/ProfileInfo";
import PostsField from "../common/PostsField";
import MenuCMobile from "./MenuCMobile";
import Followers from "../common/Followers";
import {getJSON, menuScroll} from "../common/CommonFunctions.js";
import Members from "./Members";
import {url_backend} from "../common/URL";
import MenuSMobile from "../student/MenuSMobile";
import {postFormData} from "../common/CommonFunctions";

function ProfileClub({match}){

    //State
    const [clubData,setClubData]=useState({});

    //display / hid followers and followings sections
    const [isFollowersOpen,setDispFollowers]=useState(false);
    //Followings are members in this case
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

    useEffect(() => {
        const getClubData=async ()=>{
            const clubData=await getJSON(url_backend+"/clubs/"+match.params.id+"/");
            console.log("club data",clubData);
            const formData=new FormData();
            formData.append("username",match.params.id);
            const result=await postFormData(url_backend+"/students/"+JSON.parse(localStorage.getItem("user")).user+"/check_follow/","POST",formData);
            clubData.isFollowed=result.response;
            console.log("club followi",result)
            console.log("student data",clubData);
            setClubData(clubData);
        }
        getClubData();
        //Scrolling
        window.onscroll=menuScroll;
        return () => {
            window.removeEventListener("onscroll",menuScroll);
            console.log("profileClub disapear");
            //scroll to the top after routing
            window.scrollTo(0, 0);
        }
    }, [match.params.id]);

    return (
        <React.Fragment>
            <ProfileInfo
                userNameUrl={match.params.id} 
                userInfo={clubData}
                openFollowers={openSection(setDispFollowers)}
                openFollowings={openSection(setDispFollowings)}
            ></ProfileInfo>
            <PostsField posts={clubData.posts}
            ></PostsField>
            {JSON.parse(localStorage.getItem("user")).status==="club"?
                <MenuCMobile></MenuCMobile>:
                <MenuSMobile></MenuSMobile>
            }
            {isFollowersOpen ? <Followers
                nbrFollowers={clubData.nbr_followers}
                userNameUrl={match.params.id}
                closingFunction={closeSection(setDispFollowers)}
            ></Followers>:null}
            {isFollowingsOpen ? <Members
                closingFunction={closeSection(setDispFollowings)}
            ></Members>:null}
        </React.Fragment>
    );

}

export default React.memo(ProfileClub);