import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import "./Signup.css";
import { url_backend,url_frontend } from "../common/URL";
//Icons
import {FiLink} from "react-icons/fi";
//Material Ui
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles(() => ({
    textField:{
        width:"100%",
        margin:"15px 0px",
    }
}));

function Signup(){

    useEffect(() => {
        // Switch to body light mode
        document.querySelector("body").classList.add("ligthMode")
        return () => {
            //Back to body blue mode
            document.querySelector("body").classList.remove("ligthMode");
        }
    }, []);

    const classes = useStyles();


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const [infos,setInfos] = useState({
        username:"",
        usernameErr:"",
        fullname:"",
        fullnameErr:"",
        email:"",
        emailErr:"",
        password:"",
        passwordErr:"",
        date_of_birth:"",
        date_of_birthErr:""
    });

    //authetification functions (does not containe token)
    const authentification = async(url, method, obj) => {
        const resp = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
        let result={success:false};
        if (resp.ok) result.success = true;
        else result={...result,...await resp.json()};
        return result;
    };

    //Sign up fuction
    const signUp=async (event)=>{
        event.preventDefault();
        //convert date to yyyy-mm-dd
        console.log("infos",infos);
        const result=await authentification(url_backend+"/register/","POST",infos);
        if(!result.success){
            if("username" in result) setInfos({
                ...infos,
                usernameErr:result.username[0],
                fullnameErr:"",
                emailErr:"",
                date_of_birthErr:""
            });
            else if("fullname" in result) setInfos({
                ...infos,
                fullnameErr:result.fullname[0],
                usernameErr:"",
                emailErr:"",
                date_of_birthErr:""
            });
            else if("email" in result) setInfos({
                ...infos,
                emailErr:result.email[0],
                fullnameErr:"",
                usernameErr:"",
                date_of_birthErr:""
            });
            else if("date_of_birth" in result) setInfos({
                ...infos,
                date_of_birthErr:result.date_of_birth[0],
                emailErr:"",
                fullnameErr:"",
                usernameErr:"",
            });
        }else window.location.href = url_frontend+"/login";
    }

    return (
        <form action="" className="signup" onSubmit={signUp}>

            <div className="header">
                <FiLink style={{fontSize:"3em"}}></FiLink>
            </div>
            <h1 style={{margin:"10px 0px 10px 0px"}}> Create your student account</h1>

            <TextField 
                required
                name="userId"
                label="User name" 
                variant="outlined" 
                className={classes.textField}
                onChange={(event)=>setInfos({...infos,username:event.target.value})}
            />
            <span className="err">{infos.usernameErr}</span>

            <TextField 
                required
                name="fullname"
                label="Full name" 
                variant="outlined" 
                className={classes.textField}
                onChange={(event)=>setInfos({...infos,fullname:event.target.value})}
            />
            <span className="err">{infos.fullnameErr}</span>

            <TextField 
                required
                name="email"
                label="Email" 
                type="email"
                variant="outlined" 
                className={classes.textField}
                onChange={(event)=>setInfos({...infos,email:event.target.value})}
            />
            <span className="err">{infos.emailErr}</span>
            
            <FormControl required className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                required 
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                onChange={(event)=>setInfos({...infos,password:event.target.value})}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
                labelWidth={70}
            />
            </FormControl>
            <span className="err">{infos.passwordErr}</span>
            
            <h3 style={{margin:"10px 0px"}}>Date of birth</h3>
            <input type="date" required onChange={(event)=>setInfos({...infos,date_of_birth:event.target.value})}/>
            <span className="err">{infos.date_of_birthErr}</span>

            <button className="signupBtn">Sign up</button>

            <Link to="/login">Login</Link>
        </form>
    );

}
export default React.memo(Signup);