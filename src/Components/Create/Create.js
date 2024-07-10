import React, { Fragment, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate= useNavigate()
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

    const [pname, setPname] = useState("");
    const [category, setcategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const storage = getStorage();
            const imageRef = ref(storage, "images/" + image.name);
            uploadBytesResumable(imageRef, image, image.metadata)
                .then((snapshot) => {
                    console.log("Uploaded", snapshot.totalBytes, "bytes.");
                    console.log("File metadata:", snapshot.metadata);
                    // Let's get a download URL for the file.
                    getDownloadURL(snapshot.ref).then((url) => {
                        console.log("File available at", url);
                        if (userDetails) {
                           setDoc(doc(db, "Products", pname), {
                              pname,
                              category,
                              price,
                              image:url,
                              userid:userDetails.id,
                          });
                      }
                    });

                    
                })
                .catch((error) => {
                    console.error("Upload failed", error);
                    // ...
                });
             
            
        } catch (error) {}
        toast.success("Product added Successfully", {
          position: "top-center",
        });
        //window.location.href = "/";
        navigate("/");
    };

    return (
        <Fragment>
            <Header />
            <card>
                <div className="centerDiv">
                    <form>
                        <label htmlFor="fname">Name</label>
                        <br />
                        <input
                            value={pname}
                            onChange={(e) => setPname(e.target.value)}
                            className="input"
                            type="text"
                            id="fname"
                            name="Name"
                            defaultValue="John"
                        />
                        <br />
                        <label htmlFor="fname">Category</label>
                        <br />
                        <input
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                            className="input"
                            type="text"
                            id="fname"
                            name="category"
                            defaultValue="John"
                        />
                        <br />
                        <label htmlFor="fname">Price</label>
                        <br />
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input"
                            type="number"
                            id="fname"
                            name="Price"
                        />
                        <br />
                    </form>
                    <br />
                    <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : null}></img>
                    <form>
                        <br />
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
                        <br />
                        <button onClick={handleSubmit} className="uploadBtn">
                            upload and Submit
                        </button>
                    </form>
                </div>
            </card>
        </Fragment>
    );
};

export default Create;
