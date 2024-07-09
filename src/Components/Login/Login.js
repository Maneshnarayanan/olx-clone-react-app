import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User logged in Successfully");
          
          toast.success("User logged in Successfully", {
              position: "top-center",
          });
          navigate('/')
      } catch (error) {
          console.log(error.message);

          toast.error(error.message, {
              position: "bottom-center",
          });
      }
  };
    return (
        <div>
            <div className="loginParentDiv">
                <img width="200px" height="200px" src={Logo} alt="logo"></img>
                <form onSubmit={handleLogin}>
                    <br />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        type="email"
                        id="fname"
                        name="email"
                        placeholder="email"
                        autocomplete="off"
                    />
                    <br />

                    <br />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        type="password"
                        id="lname"
                        name="password"
                        placeholder="password"
                        autocomplete="off"
                    />
                    <br />
                    <br />
                    <button>Login</button>
                </form>
                <a href="/signup">Signup</a>
            </div>
        </div>
    );
}

export default Login;
