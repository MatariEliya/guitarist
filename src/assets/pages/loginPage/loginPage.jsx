import React, { useEffect } from "react";
import { useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import { GlobalContext } from "../../../globalsIndex";
import { useContext } from "react";
import './loginPage.css';
import TextField from "../../../components/textField/textField";
function LoginPage() {
    const [page, setPage] = useState("login");
    
    const {setIsConnected} = useContext(GlobalContext);

    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [secPasswordInput, setSecPasswordInput] = useState("")
    useEffect(() => {
        setUsernameInput("")
        setPasswordInput("")
        setSecPasswordInput("")
    }, [page])
    

    const navigate = useNavigate();
    return (
        <div key = {page} className="container"> {/*השתמששתי פה בkey page כדי לאפס את העמוד כל פעם שה page משתנה*/}
            <div className="contentContainer">
                <button
                    className="returnButton"
                        
                    onClick={()=>navigate(-1)}
                >
                    <svg className="returnSvg" viewBox="0 0 48 24" stroke="black" strokeWidth={1.5} strokeLinecap="round">
                        <line x1={4} y1={12} x2={8} y2={16} />
                        <line x1={4} y1={12} x2={8} y2={8} />
                        <text x={18} y={16} fill="black" fontSize={12}  stroke="none">
                            Back
                        </text>
                    </svg>
                </button>
                {page==="login" ?( 
                    <div className="formContainer">
                        <h2 className="formTitle">LOGIN</h2>
                        <h5 className="formSubtitle">Welcome back to Gitarist!</h5>
                        <div className="inputContainer">
                            <h5 className="inputTitle">Username</h5>
                            <TextField text="Enter username" className="input" value={usernameInput} onChange={(value) =>{
                                setUsernameInput(value)
                            }}></TextField>
                            <h5 className="inputTitle">Password</h5>
                            <TextField type={"password"} text="Enter password" className="input" value={passwordInput} onChange={(value) =>{
                                setPasswordInput(value)
                            }}></TextField>
                            <Link to="/about" className="forgetLink">forgot password?</Link>
                        </div>
                        <button className="submitButton" onClick={
                            () => {
                                setIsConnected(true);
                                navigate("/")
                            }
                        }>Login</button>
                        <a className="signupLink" onClick={() => setPage("register")}>Don't have an account? Register here</a>
                    </div>
                ) : (
                    <div className="formContainer">
                        <h2 className="formTitle">SIGNUP</h2>
                        <h5 className="formSubtitle">Welcome! Let’s set up your Gitarist account</h5>
                        <div className="inputContainer">
                            <h5 className="inputTitle">Username</h5>
                            <TextField text="Enter username" className="input" value={usernameInput} onChange={(value) =>{
                                setUsernameInput(value)
                            }}></TextField>
                            <h5 className="inputTitle">Password</h5>
                            <TextField type={"password"} text="Enter password" className="input" value={passwordInput} onChange={(value) =>{
                                setPasswordInput(value)
                            }}></TextField>
                            <h5 className="inputTitle">Confirm Password</h5>
                            <TextField type={"password"} text="Confirm password" className="input" value={secPasswordInput} onChange={(value) =>{
                                setSecPasswordInput(value)
                            }}></TextField>
                        </div>
                        <button className="submitButton" onClick={
                            () => {
                                setIsConnected(true);
                                navigate("/")
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