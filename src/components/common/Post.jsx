import React,{useRef, useState,useEffect} from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import CommentPost from "./CommentPost";
import {postJSON} from "./CommonFunctions";
import {deleteJSON} from "./CommonFunctions";
import { url_backend } from "./URL";
//Icons
import {RiHeart2Fill} from "react-icons/ri";
import {FaRegComment} from "react-icons/fa";
import {AiOutlineEllipsis,AiFillSetting} from "react-icons/ai";
import {MdDelete,MdSend} from "react-icons/md";
import {FiCornerUpRight,FiRefreshCw} from "react-icons/fi";

function Post({post}){
    //Refs to grap particular sections
    const sectionRef=useRef({});
    const optionsRef=useRef({});
    const commentRef=useRef({});
    const likeRef=useRef({});

    //states

    //Hid & display setting post section
    const [dispSetting,setDispSetting]=useState(false);
    const [hidPost,setHidPost]=useState(false);

    //postContent will be used for textarea onchange event
    const [postContent,setContent]=useState(post.post_description);
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState({
        content:"",
        date:"",
        post_id:"",
        commenter:JSON.parse(localStorage.getItem("user")).user
    });


    //Post comment
    const postComent=async ()=>{
        //Setting comment (postId & date)
        comment.post_id=post.id;
        comment.date=new Date().toISOString();
        console.log(comment);
        //Posting the comment
        const newComment=await postJSON(url_backend+"/comments/","POST",comment);
        console.log(newComment)

        sectionRef.current.scrollTop="0px";
        //Increment nbr of comments
        const span=commentRef.current;
        span.innerHTML=parseInt(span.innerHTML)+1;
        //Add comment
        newComment.commenter={
            profile_image:url_backend+JSON.parse(localStorage.getItem("user")).profile_image
        }
        setComments([newComment,...comments]);
        //Clear inputs
        setComment({...comment,content:""});
    };
 

    //Delete Post
    const deletePost=async (event)=>{
        const deleteNode=event.target.parentNode;
        if(deleteNode===null ) return; 
        if(deleteNode.getAttribute("name")==="deleteBtn"){
            const result=await deleteJSON(url_backend+"/posts/"+post.id);
            if(result.status===204) setHidPost(true);
        }
    }

    //Const update post
    const updatePost=async()=>{
        const result=await postJSON(url_backend+"/posts/"+post.id+"/","PUT",{
            post_description:postContent
        });
        console.log(result);
        post.post_description=postContent;
        setDispSetting(false);
    }

    //Like function
    const like=async()=>{
        const likeBtn=likeRef.current;
        const isLike=likeBtn.getAttribute("data-islike");
        const nbrLikes=likeBtn.querySelector("span");
        if(isLike==="false"){
            const result=await postJSON(url_backend+"/posts/"+post.id+"/like","POST");
            if(result.success){
                likeBtn.style.color="rgb(0, 225, 255)";
                likeBtn.setAttribute("data-islike","true");
                nbrLikes.textContent= parseInt(nbrLikes.textContent)+1;
            }
        }else {
            const result=await postJSON(url_backend+"/posts/"+post.id+"/dislike","POST");
            if(result.success){
                likeBtn.style.color="black";
                likeBtn.setAttribute("data-islike","false");
                if(parseInt(nbrLikes.textContent)>0) nbrLikes.textContent= parseInt(nbrLikes.textContent)-1;
            }
        }
    }

    //Diff bewteen two Dates
    const calculDate=(postDate)=>{
        //Get Dates in miliseconds
        const currentDate=Date.now();
        const publishedDate=new Date(postDate).getTime();
        const diffDate=(currentDate-publishedDate);
        let seconds = (diffDate / 1000).toFixed(1);
        let minutes = (diffDate / (1000 * 60)).toFixed(1);
        let hours = (diffDate / (1000 * 60 * 60)).toFixed(1);
        let days = (diffDate / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return Math.floor(seconds)+1 + "s";
        else if (minutes < 60) return Math.floor(minutes) + "m";
        else if (hours < 24) return Math.floor(hours) + "h";
        else return Math.floor(days) + "d";
    };

    //Display paragraph
    const disPara=(event)=>{
        const p=event.target.parentNode;
        p.innerHTML=post.post_description;
    }
    
    //Handling post options (delete & setting)
    const displayOptions=()=>{
        const container=optionsRef.current;
        container.style.opacity="1";
        container.style.zIndex="1";
    };
    const hidOption=()=>{
        const container=optionsRef.current;
        container.style.opacity="0";
        container.style.zIndex="-1";
    };
    
    //Hid & display comment section
    let isSectionOpen=false;
    const displaySection=()=>{
        const section=sectionRef.current;
        if(!isSectionOpen){
            section.style.display="block";
            isSectionOpen=true;
        }else {
            section.style.display="none";
            isSectionOpen=false;
        }
    }


    //Setting comments array
    useEffect(() => {
        setComments(post.comments);
    },[post.comments,post]);
    
    if(hidPost) return null;
    else return (
        <article className="post" onClick={deletePost}>
            <header>
                <div>
                    <Link 
                        to={post.poster.status==="student" ?
                        "/profilStudent/"+post.poster.username :
                        "/profilClub/"+post.poster.username
                        }
                        style={{
                        display:"flex",
                        alignItems:"center",
                        textDecoration:"none",
                        color:"black"
                    }}>
                        <img src={post.poster.profile_image} alt=""/>
                        <h4 
                            style={{
                                margin:"0px",
                                paddingLeft:"10px",
                                fontWeight:"bold"
                            }}
                        >{post.poster.fullname}</h4>
                    </Link>
                </div>
                <div>
                    <span>{calculDate(post.published_date)}</span>
                    {JSON.parse(localStorage.getItem("user")).user===post.poster.username ?
                        <button onClick={displayOptions} onBlur={hidOption}>
                            <AiOutlineEllipsis 
                                style={{fontWeight:"bold",fontSize:"2.5em"}}>
                            </AiOutlineEllipsis>
                        </button>:
                        null
                    }
                </div>
            </header>

            {dispSetting ? 
                <div className="setpostcontent">
                    <textarea 
                        cols="30" 
                        rows="8"
                        default={post.post_description}
                        value={postContent}
                        onChange={(event)=>setContent(event.target.value)}
                    ></textarea>
                    <div>
                        <button onClick={updatePost}>
                            <span style={{marginRight:"10px"}}>Update</span>
                            <FiRefreshCw 
                                style={{fontSize:"1.3em"}}>
                            </FiRefreshCw>
                        </button>
                        <button onClick={()=>setDispSetting(false)}>
                            <FiCornerUpRight
                                style={{fontSize:"1.3em"}}
                            ></FiCornerUpRight>
                            <span style={{marginLeft:"10px"}}>Return</span>
                        </button>
                    </div>
                </div> 
                :
                <p>
                    {post.post_description!==undefined?
                    post.post_description.substring(0, 100):null}
                    {post.post_description!==undefined? 
                    post.post_description.length<100 ?
                    null:<u
                        onClick={disPara}
                        style={{fontWeight:"600",
                        cursor:"pointer"}}
                    >...read more</u>
                    :null}
                </p>
            }

            <img className="postImg" src={post.file} alt=""/>
            <div className="btns">
                <button data-islike="false" onClick={like} ref={likeRef}>
                    <span name="nbrLikes">{post.likes_nbr}</span>
                    <RiHeart2Fill
                        style={{paddingLeft:"10px",fontSize:"1.2em"}}>
                    </RiHeart2Fill>
                </button>
                <button onClick={displaySection}>
                    <span name="nbrComments" ref={commentRef}>{post.comments_nbr}</span>
                    <FaRegComment 
                        style={{paddingLeft:"10px",fontSize:"1.2em"}}>
                    </FaRegComment>
                </button>
            </div>

            <section className="comments" ref={sectionRef}>
                <div className="commentInput">
                    <img src={url_backend+JSON.parse(localStorage.getItem("user")).profile_image} alt="pict"/>
                    <input 
                        type="text" 
                        name="comment"
                        placeholder="comment..."
                        value={comment.content}
                        onChange={(event)=>setComment({...comment,content:event.target.value})}
                    />
                    <button onClick={postComent}>
                        <MdSend></MdSend>
                    </button>
                </div>
                { comments!==undefined ? comments.map(comment=>{
                    return <CommentPost 
                        key={comment.id} 
                        comment={comment}
                        commentBtn={commentRef.current}
                    ></CommentPost>
                }):null}
            </section>

            <div className="settingPost" ref={optionsRef}>
                <button onClick={()=>setDispSetting(true)}>
                    <AiFillSetting 
                        style={{fontSize:"1.6em"}}
                    ></AiFillSetting>
                </button><br></br>
                <button name="deleteBtn">
                    <MdDelete name="deleteBtn"
                        style={{fontSize:"1.6em"}}
                    ></MdDelete>
                </button>
            </div>
        </article>
    )

}
export default React.memo(Post);