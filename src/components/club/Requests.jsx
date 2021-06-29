import React,{useEffect,useState} from "react";
import "./Requests.css";
import MenuCMobile from "../club/MenuCMobile";
import { getJSON, postFormData } from "../common/CommonFunctions";
import { url_backend } from "../common/URL";
//Icons
import {MdGroupAdd} from "react-icons/md";
import {GiCheckMark} from "react-icons/gi";
import {GrClose} from "react-icons/gr";

const Card=({obj})=>{

    const [hidCard,setHidCard]=useState(false);

    const accept=async(event)=>{
        const formData=new FormData();
        formData.append("username",obj.member.username);
        const result=await postFormData(url_backend+"/clubs/"+JSON.parse(localStorage.getItem("user")).user+"/accept_member/","POST",formData);
        if(result.success){
            event.target.style.color="rgb(0, 225, 255)";
            const h4=document.getElementById("mbr");
            const text=h4.textContent;
            console.log(h4,text)
            h4.textContent=parseInt(text)+1;
            setHidCard(true);
        }
    }

    const refuser=async()=>{
        const formData=new FormData();
        formData.append("username",obj.member.username);
        const result=await postFormData(url_backend+"/clubs/"+JSON.parse(localStorage.getItem("user")).user+"/refuse_member/","POST",formData);
        console.log("refuser",result);
       if(result.success){
            const h4=document.getElementById("mbr");
            const text=h4.textContent;
            console.log(h4,text)
            if(parseInt(text)>0) h4.textContent=parseInt(text)-1;
            setHidCard(true);
       }
    }

    if(hidCard) return null;
    else return (
        <article className="studentCard">
            <img src={obj.member.profile_image} alt="pict" />
            <div className="information">
                <div>
                    <h3>{obj.member.fullname}</h3>
                    <span>
                        <button onClick={accept}>
                            {obj.accepted ? 
                                <GiCheckMark color="rgb(0, 225, 255)"/>:
                                <GiCheckMark/>
                            }
                        </button>
                        <button onClick={refuser}>
                            <GrClose></GrClose>
                        </button>
                    </span>
                </div>
                <p>{obj.member.bio}</p>
            </div>
        </article>
    )
};

function Request(){

    const [members,setMembers]=useState([]);

    //Refs

    useEffect(() => {
        const getMembers=async()=>{
            const result=await getJSON(url_backend+"/clubs/"+JSON.parse(localStorage.getItem("user")).user+"/members/");
            console.log(result);
            setMembers(result);
        }
        getMembers();

        return () => {
            //scroll to the top after routing
            window.scrollTo(0, 0);
         }
    }, []);

    

    return (
        <main id="requests">
            <section>
                <div>
                    <h1 id="mbr">Members list</h1>
                    <h4>{members.length+" Members"}</h4>
                </div>
                <MdGroupAdd
                    style={{fontSize:"2.5em"}}
                ></MdGroupAdd>
            </section>
            {members.map((obj)=>{
                return <Card key={obj.member.username} obj={obj}/>
            })}
            <MenuCMobile></MenuCMobile>
        </main>
    )

}
export default React.memo(Request);