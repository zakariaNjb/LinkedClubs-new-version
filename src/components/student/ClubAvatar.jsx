import React from "react";
import "./ClubAvatar.css";
import {Link,BrowserRouter} from "react-router-dom";


function ClubsAvatar({obj}){

    return (
        <div className="avatar">
            <BrowserRouter>
                <Link to="" style={{textDecoration:"none",color:"black"}}>
                    <img src={obj.clube.profile_image} alt="pict"/>
                    <h4>{obj.clube.fullname}</h4>
                </Link>
            </BrowserRouter>
        </div>
    )

}
export default React.memo(ClubsAvatar);