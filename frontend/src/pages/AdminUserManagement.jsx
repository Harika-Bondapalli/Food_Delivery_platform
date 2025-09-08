import React, { useEffect, useState } from "react";
import BASE_URL from "../api/api";
import "./AdminDashboard.css";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) return;

    try {
      const res = await fetch(`${BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, field, value) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin - User Management</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Chef</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={u.isChef}
                    onChange={(e) =>
                      handleRoleChange(u._id, "isChef", e.target.checked)
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={u.isAdmin}
                    onChange={(e) =>
                      handleRoleChange(u._id, "isAdmin", e.target.checked)
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManagement;
