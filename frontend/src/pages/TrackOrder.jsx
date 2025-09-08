import React, { useEffect, useState } from 'react';

const TrackOrder = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Track Order</h2>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default TrackOrder;
