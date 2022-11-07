import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
//import './Orders.css'
import { useStateValue } from "./Stateprovider";
import Order from './Order'
import { getDoc,doc } from 'firebase/firestore';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
   const docRef=doc(db,"users",user?.uid);
   const docsnap=getDoc(docRef);
  useEffect(() => {
    if(user) {
      db
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders