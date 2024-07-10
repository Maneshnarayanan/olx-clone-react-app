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
import CreatePage from "./Pages/Create";

function App() {
    return (

        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/signup" element={<SignupPage/>}> </Route>
                    <Route path="/login" element={<LoginPage/>}> </Route>
                    <Route path="/create" element={<CreatePage/>}> </Route>
                </Routes>
            </Router>
            <ToastContainer />
        </div>

    );
}

export default App;
