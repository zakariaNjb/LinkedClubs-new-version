import React,{useRef} from "react";
import "./ClubsLogos.css";
import ClubAvatar from "./ClubAvatar";
import {AiFillRightCircle,AiFillLeftCircle} from "react-icons/ai";

function ClubsLogos({clubs}){

    console.log("clubs",clubs);
    //Handling scrolling for left_right div
    const leftRightRef=useRef({});
    const leftRef=useRef({});
    const rightRef=useRef({});

    const left=()=>{
        const container=leftRightRef.current;
        const leftBtn=leftRef.current;
        const rightBtn=rightRef.current;
        container.scrollBy(-200,0);
        if(container.scrollLeft===0){
            leftBtn.style.visibility="hidden";
            rightBtn.style.visibility="visible";
        }else rightBtn.style.visibility="visible";
    };

    const right=()=>{
        const container=leftRightRef.current;
        const rightBtn=rightRef.current;
        const leftBtn=leftRef.current;
        container.scrollBy(200,0);
        const style=getComputedStyle(container);
        if(container.scrollLeft < parseInt(style.width)){
            rightBtn.style.visibility="visible";
            leftBtn.style.visibility="visible";
        }else rightBtn.style.visibility="hidden";
    };


    return (
        <main id="clubsLogos">
            <section>
                <div className="avatarContainer" ref={leftRightRef}>
                    {clubs.map((e)=>{
                        return <ClubAvatar key={e.clube.username} obj={e}/>
                    })}
                </div>
                <div className="left_right">
                    <button ref={leftRef}>
                        <AiFillLeftCircle onClick={left}></AiFillLeftCircle>
                    </button>
                    <button ref={rightRef}>
                        <AiFillRightCircle onClick={right}></AiFillRightCircle>
                    </button>
                </div>
            </section>
        </main>
    )
}
export default React.memo(ClubsLogos);