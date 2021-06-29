import React,{useRef} from "react";
import {Link} from "react-router-dom";
import "../common/MenuMobile.css";
import {FaUserAlt} from "react-icons/fa";
import {AiFillHome,AiTwotoneSetting} from "react-icons/ai";
import {BsFillChatSquareFill} from "react-icons/bs";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaPowerOff} from "react-icons/fa";

function MenuSMobile(){

    //Handling menu animation
    const btnDivRef=useRef({});
    const displayMenu=()=>{
        const menu=btnDivRef.current;
        menu.classList.add("display");
    };
    const hidMennu=()=>{
        const menu=btnDivRef.current;
        menu.classList.remove("display");
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
                <Link to={"/profilstudent/"+JSON.parse(localStorage.getItem("user")).user}>
                    <button>
                        <FaUserAlt></FaUserAlt>
                    </button>
                </Link>
                <Link to={"/chat/"+JSON.parse(localStorage.getItem("user")).user}>
                    <button>
                        <BsFillChatSquareFill></BsFillChatSquareFill>
                    </button>
                </Link>
                <Link to="/settingstudent">
                    <button >
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
export default React.memo(MenuSMobile);