import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
function Header() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
          console.log(user);

          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              setUserDetails(docSnap.data());
              console.log(docSnap.data());
          } else {
              console.log("User is not logged in");
          }
      });
  };
  useEffect(() => {
      fetchUserData();
  }, []);


  async function handleLogout() {
    try {
        await auth.signOut();
        window.location.href = "/login";
        console.log("User logged out successfully!");
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
}
function handleClick() {
  navigate("/create");
}
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
           {userDetails?
           (
           <> Welcome <h4>{userDetails.username}</h4> <button  onClick={handleLogout}>
           Logout
       </button></>
          ):
           <a href='/login'>Login</a>
           
           

           }


          </span>
          <hr />
        </div>

        <div className="sellMenu" onClick={handleClick}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
