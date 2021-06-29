import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import {postFormData} from "./CommonFunctions";
import "./Posting.css";
//Icons
import {GrClose} from "react-icons/gr";
//Material Ui component
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { url_backend } from "./URL";


function Posting({closeForm,posts}){
   
    const [newPost,setNewPost]=useState({
        post_description:"",
        poster:JSON.parse(localStorage.getItem("user")).user,
        file:""
    });

    //Refs
    const imgRef=useRef();

    //Send data from form
    const send=async ()=>{
        const input=document.querySelector(".posting input[type='file']");
        const formData=new FormData();
        if(input.files[0]===undefined && newPost.post_description==="") return;
        formData.append("post_description",newPost.post_description);
        if(input.files[0]!==undefined) formData.append("file",input.files[0]);
        formData.append("poster",newPost.poster);
        const post=await postFormData(url_backend+"/posts/","POST",formData);
        console.log("new Post",post)
        post.poster={
            profile_image:url_backend+JSON.parse(localStorage.getItem("user")).profile_image,
            fullname:JSON.parse(localStorage.getItem("user")).fullname,
            username:JSON.parse(localStorage.getItem("user")).user
        }
        posts.unshift(post);
        console.log("after shift",posts);
        if(post.success){
            //Append post & Close post form
            closeForm(posts);
        }else alert("Your post hasn't uploaded");
    };

    //Handle onchange event listener
    const changeText=(event)=>{
        const value=event.target.value;
        setNewPost({...newPost,post_description:value});
    };

    //Display an Image after selecting
    const previewFile=(event)=> {
        const input=event.target;
        let file    = input.files[0];
        let reader  = new FileReader();

        reader.addEventListener("load", function () {
            const img=imgRef.current;
            img.src=reader.result;
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
    };

    //Material UI styling
    const useStyles = makeStyles((theme) => ({
        input: {
          display: 'none',
        },
        button:{
            width:"100%",
            margin:"5px 0px",
            backgroundColor:"rgba(0, 162, 255, 0.774)"
        }
    }));
    const classes = useStyles();

    
    return ReactDOM.createPortal(
        <form className="posting">
            <div>
                <h2>New post</h2>
                <GrClose 
                    style={{cursor:"pointer"}}
                    onClick={()=>closeForm(posts)}
                >
                </GrClose>
            </div>
            <img ref={imgRef} src={newPost.file} alt=""></img>
            <textarea
                onChange={changeText}
                name="post_description" 
                cols="20" 
                rows="6"
                placeholder="Share your thoughs..."
            ></textarea> 
            <input
                name="file"
                accept="image/*,video/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={previewFile}

            />
            <label htmlFor="contained-button-file">
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    component="span">
                    Upload file
                </Button>
            </label>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={send}
            >
                Send
            </Button>
        </form>
    ,document.querySelector(".portal"));
}

export default React.memo(Posting);