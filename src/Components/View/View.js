import React, { useContext, useState, useEffect } from "react";
import { postContext } from "../../store/postContext";
import "./View.css";
import { db } from "../../firebase/firebase";
import {  doc, getDoc } from "firebase/firestore";

function View() {
    const [userDetails, setUserDetails] = useState([]);
    const { postDetails } = useContext(postContext);
    const { userid } = postDetails;


    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
      const docRef = doc(db, "Users", userid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserDetails(docSnap.data())
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    return (
        <div className="viewParentDiv">
            <div className="imageShowDiv">
                <img src={postDetails.image} alt="" />
            </div>
            <div className="rightSection">
                <div className="productDetails">
                    <p>&#x20B9; {postDetails.price} </p>
                    <span>Name:{postDetails.pname}</span>
                    <p>Category:{postDetails.category}</p>
                    <span>Added on{postDetails.createdate}</span>
                </div>
                <div className="contactDetails">
                    <p>Seller details</p>
                    <p>Name:{userDetails.username}</p>
                    <p>Contact:{userDetails.phone}</p>
                </div>
            </div>
        </div>
    );
}
export default View;
