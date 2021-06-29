import React, { useEffect,useState } from "react";
import "../common/Setting.css";
import MenuSmobil from "./MenuSMobile";
import {url_backend,url_frontend} from "../common/URL";
import { postFormData, postJSON } from "../common/CommonFunctions";


function SettingStudent(){

    //State
    const [updatedInfo,setUpdatedInfo]=useState({
        old_password:"",
        new_password:"",
        bio:"",
        err:""
    });

    //Update DATA
    const update=async()=>{
        console.log("lalal");
        const entity=JSON.parse(localStorage.getItem("user"));
        if(updatedInfo.old_password!=="" && updatedInfo.new_password!==""){
            const obj={
                old_password:updatedInfo.old_password,
                new_password:updatedInfo.new_password
            }
            const result=await postJSON(url_backend+"/users/change_password/","PUT",obj);
            if(result.success) window.location.href=url_frontend+"/homepage/"+JSON.parse(localStorage.getItem("user")).user;
        }else setUpdatedInfo({...updatedInfo,err:"You haven't made in changes yet"});
        if(updatedInfo.bio!==""){
            const formData=new FormData();
            formData.append("bio",updatedInfo.bio);
            var url=url_backend+"/"+entity.status+"s/"+entity.user+"/";
            const result=await postFormData(url,"PATCH",formData);
            if(result.success){
                entity.bio=updatedInfo.bio;
                localStorage.clear();
                localStorage.setItem("user",JSON.stringify(entity));
                window.location.href=url_frontend+"/homepage/"+JSON.parse(localStorage.getItem("user")).user;
            }            
        }else setUpdatedInfo({...updatedInfo,err:"You haven't made in changes yet"});
    };

    useEffect(()=>{
        console.log(updatedInfo);
    });

    useEffect(() => {
        return () => {
            window.scrollTo(0,0);
        }
    }, []);

    return (
        <main className="setting">
            <form onSubmit={(event)=>event.preventDefault()}>
                <section>
                    <img src={url_backend+JSON.parse(localStorage.getItem("user")).profile_image} alt="pict" />
                    <div>
                        <h3>{JSON.parse(localStorage.getItem("user")).fullname}</h3>
                        <p style={{fontSize:"1.2em"}}>
                            {JSON.parse(localStorage.getItem("user")).bio}
                        </p>
                    </div>
                </section>
                <div className="inputContainer">
                    <input 
                        type="text" 
                        placeholder="User name"
                        name="userName"
                        value={JSON.parse(localStorage.getItem("user")).user}
                        disabled
                    />
                    <span></span>
                </div>
                <div className="inputContainer">
                    <input 
                        type="text" 
                        placeholder="email"
                        name="email"
                        value={JSON.parse(localStorage.getItem("user")).email}
                        disabled
                    />
                    <span></span>
                </div>
                <div className="inputContainer">
                    <input 
                        type="password" 
                        placeholder="Old password"
                        name="old_password"
                        onChange={(event)=>setUpdatedInfo({...updatedInfo,old_password:event.target.value})}
                    />
                    <span></span>
                </div>
                <div className="inputContainer">
                    <input 
                        type="password" 
                        placeholder="New password"
                        name="new_password"
                        onChange={(event)=>setUpdatedInfo({...updatedInfo,new_password:event.target.value})}
                    />
                    <span></span>
                </div>
                <div className="inputContainer">
                    <textarea 
                        onChange={(event)=>setUpdatedInfo({...updatedInfo,bio:event.target.value})}
                        placeholder="Set your bio..."
                        name="Bio" 
                        id="" 
                        cols="30" 
                        rows="10"
                    ></textarea>
                    <span>{updatedInfo.err}</span>
                </div>
                <button type="submit" onClick={update}>Update</button>
            </form>
            <MenuSmobil></MenuSmobil>
        </main>
    )
}

export default React.memo(SettingStudent);