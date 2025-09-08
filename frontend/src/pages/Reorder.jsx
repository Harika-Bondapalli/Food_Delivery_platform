// frontend/src/pages/Reorder.jsx
import React, { useState } from "react";

const Reorder = () => {
  const [orderId, setOrderId] = useState("");

  const handleReorder = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/reorder/${orderId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert("Reordered successfully!");
    } else {
      alert("Failed: " + data.message);
    }
  };

  return (
    <div>
      <h2>Reorder</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleReorder}>Reorder</button>
    </div>
  );
};

export default Reorder;
