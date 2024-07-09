import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Signup.css";
//import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    id: user.uid,
                    email: user.email,
                    username: username,
                    phone: phone,
                    photo: "",
                });
            }

            toast.success("User Registered Successfully!!", {
                position: "top-center",
            });
            navigate("/login");
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    };

    return (
        <div>
            <div className="signupParentDiv">
                <img width="200px" height="200px" src={Logo} alt="logo"></img>
                <form onSubmit={handleRegister}>
                    <label htmlFor="fname">Username</label>
                    <br />
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        type="text"
                        id="fname"
                        name="name"
                        defaultValue="John"
                    />
                    <br />
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        type="email"
                        id="fname"
                        name="email"
                        defaultValue="John"
                    />
                    <br />
                    <label htmlFor="lname">Phone</label>
                    <br />
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                        type="number"
                        id="lname"
                        name="phone"
                        defaultValue="Doe"
                    />
                    <br />
                    <label htmlFor="lname">Password</label>
                    <br />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        type="password"
                        id="lname"
                        name="password"
                        defaultValue="Doe"
                    />
                    <br />
                    <br />
                    <button type="submit">Signup</button>
                </form>
                <a href="/login">Login</a>
            </div>
        </div>
    );
}
