import React,{useRef} from "react";
//MenuSMobile.css is also required
import "../common/MenuMobile.css";
import {FaUserAlt} from "react-icons/fa";
import {AiFillHome,AiTwotoneSetting} from "react-icons/ai";
import {FaUsers} from "react-icons/fa";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaPowerOff} from "react-icons/fa";
import {Link} from "react-router-dom";
import {BsFillChatSquareFill} from "react-icons/bs";

function MenuCMobile(){

    
    //Handling menu animation
    const btnDivRef=useRef({});
    const displayMenu=()=>{
        const div=btnDivRef.current;
        div.classList.add("display");
    };
    const hidMennu=()=>{
        const div=btnDivRef.current;
        div.classList.remove("display");
    };

    return(
        <React.Fragment>
            <menu className="menuMobile" ref={btnDivRef}>
                <Link to="/login">
                    <button>
                        <FaPowerOff></FaPowerOff>
                    </button>
                </Link>
                <Link to={"/homepage/"+JSON.parse(localStorage.getItem("user")).user}>
                    <button>
                        <AiFillHome></AiFillHome>
                    </button>
                </Link>
                <Link to={"/profilclub/"+JSON.parse(localStorage.getItem("user")).user}>
                    <button>
                        <FaUserAlt></FaUserAlt>
                    </button>
                </Link>
                <Link to="/requests">
                    <button>
                        <FaUsers></FaUsers>
                    </button>
                </Link>
                <Link to={"/chat/"+JSON.parse(localStorage.getItem("user")).user}>
                    <button>
                        <BsFillChatSquareFill></BsFillChatSquareFill>
                    </button>
                </Link>
                <Link to="/settingclub">
                    <button>
                        <AiTwotoneSetting></AiTwotoneSetting>
                    </button>
                </Link>
            </menu>
            <button className="menuBtn" onClick={displayMenu} onBlur={hidMennu}>
                <GiHamburgerMenu></GiHamburgerMenu>
            </button>
        </React.Fragment>
    )

}
export default React.memo(MenuCMobile);