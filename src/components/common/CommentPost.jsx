import React,{useEffect, useState} from "react";
import { Link} from "react-router-dom";
import "./CommentPost.css";
import  {url_backend} from "./URL";
//Icons
import {MdSend} from "react-icons/md";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {postJSON,deleteJSON} from "./CommonFunctions";


function CommentPost({comment,commentBtn}){

    const [replies,setReplies]=useState([]);
    const [reply,setReply]=useState({
        content:"",
        date:"",
        comment_id:"",
        replier:JSON.parse(localStorage.getItem("user")).user
    });

    //Post reply
     const postReply=async ()=>{
        //Setting reply
        reply.comment_id=comment.id;
        reply.date=new Date().toISOString();
        //Posting reply
        const newReply=await postJSON(url_backend+"/replies/","POST",reply);
        console.log(newReply);
        newReply.replier={
            profile_image:url_backend+JSON.parse(localStorage.getItem("user")).profile_image
        }
        setReplies([newReply,...replies]);
        setReply({...reply,content:""});
    };

    //Delete reply
    const deleteReply=async (event)=>{
        const deleteBtn=event.currentTarget;
        const replyId=deleteBtn.getAttribute("data-id");
        const replyContainer=deleteBtn.parentNode;
        const result=await deleteJSON(url_backend+"/replies/"+replyId);
        if(result.status===204) replyContainer.remove();
        else console.log("not deleted");
    };

    //Delete Comment
    const deleteComment=async (event)=>{
        const mainComment=event.currentTarget;
        const deleteNode=event.target;
        if(deleteNode.getAttribute("name")==="deleteComment"){
            const content=mainComment.querySelector(".content");
            //a: image container
            const img=mainComment.querySelector("a");
            const result=await deleteJSON(url_backend+"/comments/"+comment.id);
            console.log(result);
            if(result.status===204){
                content.remove();
                img.remove();
                mainComment.style.margin="0px";
                //Decrement nbr of comments
                commentBtn.innerHTML=parseInt(commentBtn.innerHTML)-1;
            }
            else console.log("not deleted");
        }
    };
   
    
    //Used for onChange event
    useEffect(()=>{
        setReplies(comment.replies);
    },[comment.replies])

    return(

        <div className="mainComment" onClick={deleteComment}>
                <Link to={"/profilStudent/"+comment.commenter.username}>
                    {comment.commenter!==undefined ? <img
                        src={comment.commenter.profile_image} alt="pict"
                    >
                    </img>:null}
                </Link>
            {/******div.content contains replies as well*****/}
            <div className="content">
                <div className="parentComment">
                    <p>{comment.content}</p>
                    {JSON.parse(localStorage.getItem("user")).user===comment.commenter.username ? 
                    <button name="deleteComment">
                        <AiOutlineCloseCircle 
                            name="deleteComment"
                            style={{fontSize:"1.4em"}}>
                        </AiOutlineCloseCircle>
                    </button>:null}
                </div>
                <button className="writeReply">
                    <img src={url_backend+JSON.parse(localStorage.getItem("user")).profile_image} alt="pict"/>
                    <input 
                        type="text" 
                        placeholder="reply..."
                        value={reply.content}
                        onChange={(event)=>setReply({...reply,content:event.target.value})}
                    />
                    <MdSend onClick={postReply} style={{fontSize:"1.7em"}}></MdSend>
                </button>
                {/*******replies**************/}
                {replies!==undefined? replies.map((reply)=>{
                    return (<div className="reply" key={reply.id}>
                        <Link to={'/profilStudent/'+reply.replier.username}>
                            <img src={
                                reply.replier!==undefined ?
                                reply.replier.profile_image
                                :null
                            } alt="pict"/>
                        </Link>
                        <p>{reply.content}</p>
                        {JSON.parse(localStorage.getItem("user")).user===reply.replier.username ?
                         <button data-id={reply.id} onClick={deleteReply}>
                            <AiOutlineCloseCircle 
                                data-id={reply.id}
                                style={{fontSize:"1.4em"}}>
                            </AiOutlineCloseCircle>
                        </button>:null }
                    </div>)
                }):null}
            </div>
        </div>
    );
}

export default React.memo(CommentPost);