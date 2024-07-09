import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";

function App() {
    return (

        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/signup" element={<SignupPage/>}> </Route>
                    <Route path="/login" element={<LoginPage/>}> </Route>
                </Routes>
            </Router>
            <ToastContainer />
        </div>

    );
}

export default App;
