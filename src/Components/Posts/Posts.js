import React from "react";
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";

function Posts() {

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


    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards">
                  {
                    <div className="card">
                      <div className="favorite">
                          <Heart></Heart>
                      </div>
                      <div className="image">
                          <img src="../../../Images/R15V3.jpg" alt="" />
                      </div>
                      <div className="content">
                          <p className="rate">&#x20B9; 250000</p>
                          <span className="kilometer">Two Wheeler</span>
                          <p className="name"> YAMAHA R15V3</p>
                      </div>
                      <div className="date">
                          <span>Tue May 04 2021</span>
                      </div>
                  </div>
              </div>
              }

            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt="" />
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
