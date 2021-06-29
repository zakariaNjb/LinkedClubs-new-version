import React, { useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";
//Icons
import {MdYoutubeSearchedFor} from "react-icons/md";
import {BiMessageSquareAdd} from "react-icons/bi";
import {MdVerifiedUser} from "react-icons/md";
import {FaUserGraduate} from "react-icons/fa";

import { url_backend } from "./URL";
import { getJSON } from "./CommonFunctions";


function SearchBar({openForm}){

    const [list,setList]=useState([]);

    const Li=({user})=>{
        return(
            <li>
                <div style={{padding:"0px"}}>
                    <img src={user.profile_image} alt="pict" />
                    <h4>
                    <Link to={
                            user.status==="student" ? 
                            "/profilStudent/" + user.username:
                            "/profilClub/"+user.username
                        } 
                        style={{textDecoration:"none",color:"black"}}>
                        {user.fullname}
                    </Link>
                    </h4>
                </div>
                {user.status==="student" ?
                    <FaUserGraduate color="rgb(0, 225, 255)"/>:
                    <MdVerifiedUser color="rgb(0, 225, 255)"/>
                }
            </li>
        )
    };

    const search=async(event)=>{
        const value=event.target.value;
        const result=await getJSON(url_backend+"/users/?search="+value);
        if(result.success) setList(result);
        else setList([]); 
    }

    return (
        <section className="searchBar">
            <div>
                <img src={url_backend+JSON.parse(localStorage.getItem("user")).profile_image} alt="pict" />
                <button>
                    <MdYoutubeSearchedFor>
                    </MdYoutubeSearchedFor>
                    <input 
                        type="text" 
                        placeholder="search..."
                        onChange={search}
                    />
                </button>
                <button onClick={openForm}>
                    <BiMessageSquareAdd></BiMessageSquareAdd>
                </button>
            </div>
            <main>
                <ul>
                    {
                        list.map((user)=>{
                            return <Li key={user.username} user={user}/>
                        })
                    }
                </ul>
            </main>
        </section>
    )

}
export default React.memo(SearchBar);