import React from "react";
import "./Footer.css";
import {Link,BrowserRouter} from "react-router-dom";
function Footer(){

    return (
        <footer>
            <BrowserRouter>
                <ul>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    <li>
                        <Link to="/">Help Center</Link>
                    </li>
                    <li>
                        <Link to="/">Teams of Service</Link>
                    </li>
                    <li>
                        <Link to="/">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/">&copy; 2021 Ajicreative, Inc.</Link>
                    </li>
                </ul>
            </BrowserRouter>
        </footer>
    )
}

export default React.memo(Footer);