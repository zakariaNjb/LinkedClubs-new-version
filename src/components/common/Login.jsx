import React,{useEffect,useState} from "react";
import "./Login.css";
import {Link} from "react-router-dom";
import {url_backend,url_frontend} from "../common/URL";
//Icons
import {FiLink} from "react-icons/fi";
//Material UI
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

const useStyles = makeStyles((theme) => ({
    textField:{
        width:"100%",
        margin:"15px 0px"
    }
}));

function Login(){

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
        password: '',
        showPassword: false,
    });

    const [account,setAccount] = useState({
        email:"",
        password:"",
        status:"student",
        err:""
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
        console.log(resp);
        const result = await resp.json();
        console.log(result);
        if (resp.ok) result.success = true;
        else result.success = false;
        return result;
    };

    const login=async (event)=>{
        event.preventDefault();
        console.log(account)
        const result=await authentification(url_backend+"/api/token/","POST",account);
        console.log("login",result);
        localStorage.clear();
        localStorage.setItem("user",JSON.stringify(result));
        if(result.success) window.location.href = url_frontend+"/homepage/"+ result.user;
        else setAccount({...account,err:"Invalid account"});
    };

    useEffect(()=>{
        localStorage.clear();
    },[]);

    return (
        <form action="" className="login" onSubmit={(event)=>event.preventDefault()}>
            <FiLink
                style={{fontSize:"6em",marginTop:"30px"}}
            ></FiLink>
            <h1>Login to LinkedClubs</h1>
            <TextField 
                id="outlined-basic" 
                label="Email" 
                type="email"
                variant="outlined" 
                className={classes.textField}
                onChange={(event)=>setAccount({...account,email:event.target.value})}
            />

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                onChange={(event)=>setAccount({...account,password:event.target.value})}
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
            <span className="err">{account.err}</span>

            <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
                <input defaultChecked id="student" value="student" type="radio" className="radioBtn" name="user" onClick={()=>{setAccount({...account,status:"student"})}}/> 
                <label htmlFor="student" style={{padding:"0px 20px 0px 10px"}}  onClick={()=>setAccount({...account,status:"student"})} >Student</label>
                <input id="club"  value="club" type="radio" className="radioBtn" name="user" onClick={()=>setAccount({...account,status:"club"})}/> 
                <label htmlFor="club" style={{padding:"0px 20px 0px 10px"}} onClick={()=>setAccount({...account,status:"club"})}>Club</label>
            </div>
            <button className="loginBtn"  onClick={login}>Log in</button>
            <Link to="/signup">Sign up for LinkedClubs</Link>
            
        </form>
    )
}

export default React.memo(Login);