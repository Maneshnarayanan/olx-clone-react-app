import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/firebase";
import { postContext } from "../../store/postContext";
import { useNavigate } from "react-router-dom";


function Posts() {
    const [items, setItems] = useState([]);
    const {setPostDetails} = useContext(postContext)
    const navigate= useNavigate()
    let list=[];
    useEffect(() => {
           fetchProductData();    
           
        // console.log(items);
    }, []);

    const fetchProductData = async () => {
        const querySnapshot = await getDocs(collection(db, "Products"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list=[...list,doc.data()]
            list=list.filter((item,
                index) => list.indexOf(item) === index);
            //alert(doc.data())
        });
        list=list.filter((item,
            index) => list.indexOf(item) === index);
        
        setItems(list);
        // console.log(list)
        // console.log(items)        

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
                    items.map(product => {
                       return(
                        <div className="card" onClick={()=>{
                            setPostDetails(product)
                            navigate('/view')
                        }}>
                            <div className="favorite">
                                <Heart></Heart>
                            </div>
                            <div className="image">
                                <img src={product.image} alt="no image" />
                            </div>
                            <div className="content">
                                <p className="rate">&#x20B9; {product.price}</p>
                                <span className="kilometer">{product.category}</span>
                                <p className="name"> {product.pname}</p>
                            </div>
                            <div className="date">
                                <span>added on:{product.createdate}</span>
                            </div>
                        </div>)
                    })}
                </div>
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
