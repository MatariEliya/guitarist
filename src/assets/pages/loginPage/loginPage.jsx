import React, { useEffect } from "react";
import { useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import { useContext } from "react";
import './loginPage.css';
import TextField from "../../../components/textField/textField";
import { ReturnSvg } from "../../svg/svg";

import { usePopup } from "../../../components/Popup/usePopup";

function LoginPage() {
    const [page, setPage] = useState("login");
    
    const {setUserType, setUsername, userType} = useContext(GlobalContext);
    const {openPopup} = usePopup();

    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [secPasswordInput, setSecPasswordInput] = useState("")
    useEffect(() => {
        setUsernameInput("")
        setPasswordInput("")
        setSecPasswordInput("")
    }, [page])
    useEffect(() => {
        console.log(userType)
        if(userType != "guest"){
            navigate("/")
        }
    }, [userType])

    const navigate = useNavigate();
    return (
        <div key = {page} className="container"> {/*השתמששתי פה בkey page כדי לאפס את העמוד כל פעם שה page משתנה*/}
            <div className="contentContainer">
                <button
                    className="returnButton"
                        
                    onClick={()=>navigate(-1)}
                >
                    <ReturnSvg width="4vw" height="2vw"/>
                </button>
                {page==="login" ?( 
                    <div className="formContainer">
                        <h2 className="formTitle">LOGIN</h2>
                        <h5 className="formSubtitle">Welcome back to Guitarist!</h5>
                        <div className="inputContainer">
                            <h5 className="inputTitle">Username</h5>
                            <TextField text="Enter username" className="input" value={usernameInput} noSpace={true} onChange={(value) =>{
                                setUsernameInput(value)
                            }}></TextField>
                            <h5 className="inputTitle">Password</h5>
                            <TextField type={"password"} text="Enter password" className="input" value={passwordInput} noSpace={true} onChange={(value) =>{
                                setPasswordInput(value)
                            }}></TextField>
                        </div>
                        <button className="submitButton" onClick={
                            async () => {
                                const connect = await logIn(usernameInput.trim(), passwordInput.trim(), setUserType, setUsername);
                                if(connect){
                                    navigate("/")
                                } else {
                                    openPopup({text: "Username not found"})
                                }

                            }
                        }>Login</button>
                        <a className="signupLink" onClick={() => setPage("register")}>Don't have an account? Register here</a>
                    </div>
                ) : (
                    <div className="formContainer">
                        <h2 className="formTitle">SIGNUP</h2>
                        <h5 className="formSubtitle">Welcome! Let’s set up your Guitarist account</h5>
                        <div className="inputContainer">
                            <h5 className="inputTitle">Username</h5>
                            <TextField text="Enter username" className="input" value={usernameInput} noSpace={true} onChange={(value) =>{
                                setUsernameInput(value)
                            }}></TextField>
                            <h5 className="inputTitle">Password</h5>
                            <TextField type={"password"} text="Enter password" className="input" value={passwordInput} noSpace={true} onChange={(value) =>{
                                setPasswordInput(value)
                            }}></TextField>
                            <h5 className="inputTitle">Confirm Password</h5>
                            <TextField type={"password"} text="Confirm password" className="input" value={secPasswordInput} noSpace={true} onChange={(value) =>{
                                setSecPasswordInput(value)
                            }}></TextField>
                        </div>
                        <button className="submitButton" onClick={
                            async () => {
                                if(passwordInput.trim() == secPasswordInput.trim()){
                                    if(passwordInput.trim() != "" && usernameInput.trim() != ""){
                                        const success = await signUp(usernameInput.trim(), passwordInput.trim(), setUserType, setUsername);
                                        if(success){
                                            console.log(localStorage.getItem("token"))
                                            navigate("/")
                                        }else{
                                            openPopup({text: "Username already exists"})
                                        }
                                    }else{
                                        openPopup({text: "Username and password should not be empty."})
                                    }
                                }else{
                                    openPopup({text: "The passwords should be the same"})
                                }
                            }
                        }>Signup</button>
                        <a className="signupLink" onClick={() => setPage("login")}>Already have an account? Login here</a>
                    </div>
                )}
                
            </div>
        </div>
    );
}


export default LoginPage;


async function logIn(username, password, setUserType, setUsername) {
    
    try {
        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        // אם השרת החזיר סטטוס לא 200 → הכשל התחברות
        if (res.ok) {
            const data = await res.json();
            // שמירת הטוקן
            sessionStorage.setItem("token", data.token);
            setUsername(username)
            if(data.creator){
                setUserType("creator")
            }else{
                setUserType("member")
            }
            return true
        }
        return false
    } catch (err) {
        console.error("Login failed:", err);
        return false;
    }
}
async function signUp(username, password, setUserType, setUsername) {
    try {
        const res = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        // אם השרת החזיר סטטוס לא 200 → הכשל התחברות
        if (res.ok) {
            sessionStorage.setItem("token", data.token);
            setUserType("member")
            setUsername(username)
            return true;
        }
        
        return false
    } catch (err) {
        console.error("Login failed:", err);
        return false;
    }
}