import React, { useEffect, useState } from 'react';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/user/${userId}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [userId]);

  const reorder = async (order) => {
    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: userId,
        items: order.items.map(item => ({
          meal: item.meal._id || item.meal,
          quantity: item.quantity,
        })),
        total: order.total,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
      }),
    });

    if (res.ok) alert('Reorder placed!');
    else alert('Failed to reorder');
  };

  return (
    <div>
      <h2>Order History</h2>
      {orders.map((order, idx) => (
        <div key={idx}>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.total}</p>
          <button onClick={() => reorder(order)}>Reorder</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
