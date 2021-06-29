import React,{useEffect, useState,useCallback} from "react";
import { url_backend } from "./URL";
import SearchBar from "./SearchBar";
import PostsField from "./PostsField";
import MenuSMobile from "../student/MenuSMobile";
import MenuCMobile from "../club/MenuCMobile";
import Posting from "./Posting";
import {homePageScroll,getJSON} from "./CommonFunctions.js";


//scrollingg get posts 
let index=5;

function HomePage(){

    let [posts,setPosts]=useState([]);
    
    //Hid & display Posting form
    const [openPostForm,setOpenPostForm]=useState(false);
    const openForm=useCallback(()=>{
        const portal=document.querySelector(".portal");
        portal.classList.add("displayPortal");
        setOpenPostForm(true);
    },[]);

    const closeForm=useCallback((posts)=>{
        const portal=document.querySelector(".portal");
        portal.classList.remove("displayPortal");
        setOpenPostForm(false);
        setPosts(posts);
    },[]);
    
    useEffect(() =>{ 
        //API call
        const getData=async ()=>{
            const posts=await getJSON(url_backend+"/posts/?index="+0);
            setPosts(posts);
        };
        getData();

        //Clean up
        return () => {
            window.removeEventListener("onscroll",scrollgFct);
            //scroll to the top after routing
            window.scrollTo(0, 0);
            return null;
        }
    }, []);

    //Handle window.onscroll event for the homePage
    const scrollgFct=homePageScroll();
    
    window.onscroll = async(ev)=> {
        scrollgFct();
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            console.log("buttom");
            console.log(index)
            index=index+5;
            const newPosts=await getJSON(url_backend+"/posts/?index="+index);
            console.log("newPost",newPosts);
            if(newPosts.length>1){
                index=index+5;
                console.log(index);
                posts=posts.concat(newPosts);
                console.log("posts",posts);
                setPosts(posts)
            }
        }
    };

    useEffect(()=>{
        console.log("Homepage Rerender")
    });

    return(
        <div>
            <SearchBar openForm={openForm}></SearchBar>
            {openPostForm ? 
            <Posting 
                setPosts={setPosts}
                posts={posts}
                closeForm={closeForm}
            >
            </Posting>:null}
            <PostsField posts={posts}></PostsField>
            {JSON.parse(localStorage.getItem("user")).status==="student" ?
                <MenuSMobile></MenuSMobile>:
                <MenuCMobile></MenuCMobile>
            }
        </div>
    )
}
export default HomePage;