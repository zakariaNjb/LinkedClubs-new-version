import React,{useEffect} from "react";
import {Link} from "react-router-dom";
import Footer from "./Footer";
import "./WelcomePage.css";
//Icons
import {FiLink} from "react-icons/fi";

function WelcomePage(){
    
    useEffect(() => {
        // Switch to body light mode
        document.querySelector("body").classList.add("ligthMode")
        return () => {
            //Back to body blue mode
            document.querySelector("body").classList.remove("ligthMode");
        }
    }, []);

    return(
        <main id="welcomePage">
            <section className="welcoming">
                <div>
                    <FiLink
                        style={{fontSize:"6em",marginTop:"60px"}}
                    ></FiLink>
                    <h1>Happening now</h1>
                    <h2>Join LinkedClubs today.</h2>
                    <button className="signupBtn">
                        <Link to="/signup">
                            Sign up
                        </Link>
                    </button><br></br>
                    <button className="logBtn">
                        <Link to="/login">
                            Log in
                        </Link>
                    </button>
                </div>
            </section>
            <Footer></Footer>
        </main>
    )
}

export default React.memo(WelcomePage);