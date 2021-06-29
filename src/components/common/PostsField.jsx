import React,{useEffect} from "react";
import "./PostsField.css";
import Post from "./Post";


function PostsField({posts}){

    useEffect(()=>{
        console.log("PostField rerender");
    })
    const styling={
        backgroundColor: "snow",
        height: "400px",
        padding: "15px",
        marginBottom: "30px",
        borderRadius: "5px",
        boxShadow: "3px 3px 10px black",
        position: "relative"
    }
    return (
        <main id="postsField">
            {posts!==undefined && posts.length > 0 ? posts.map((post)=>{
                return <Post key={post.id} post={{...post}}/>
            }):
            <div>
                <article style={styling}>
                <header style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                    <div style={{width:"3em",height:"3em",borderRadius:"100px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></div>
                    <span style={{display:"inline-block",width:"150px",height:"20px",backgroundColor:"rgba(128, 128, 128, 0.705)",marginLeft:"15px"}}></span>
                </header>
                <div style={{width:"100%",height:"340px",marginTop:"10px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></div>
                </article>
                <article style={styling}>
                    <header style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <div style={{width:"3em",height:"3em",borderRadius:"100px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></div>
                        <span style={{display:"inline-block",width:"150px",height:"20px",backgroundColor:"rgba(128, 128, 128, 0.705)",marginLeft:"15px"}}></span>
                    </header>
                    <div style={{width:"100%",height:"340px",marginTop:"10px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></div>
                </article>
                <article style={styling}>
                    <header style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <div style={{width:"3em",height:"3em",borderRadius:"100px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></div>
                        <span style={{display:"inline-block",width:"150px",height:"20px",backgroundColor:"rgba(128, 128, 128, 0.705)",marginLeft:"15px"}}></span>
                    </header>
                    <div style={{width:"100%",height:"340px",marginTop:"10px",backgroundColor:"rgba(128, 128, 128, 0.705)"}}></div>
                </article>
            </div>} 
        </main>
    )

}
export default PostsField;