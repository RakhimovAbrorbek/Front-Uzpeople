import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdLock, MdLockOpen, MdExitToApp } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const token = localStorage.getItem("access_token");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/not-found");
    } else {
      fetchUsers();
    }
  }, [userRole, navigate]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.filter(user => user.role === "user"));
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleAction = async (action) => {
    const endpointMap = {
      block: (id) => `/api/users/block/${id}`,
      unblock: (id) => `/api/users/unblock/${id}`,
      delete: (id) => `/api/users/${id}`,
    };

    for (let id of selectedUsers) {
      try {
        const method = action === "delete" ? "delete" : "patch";
        await axios({
          method,
          url: endpointMap[action](id),
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error(`${action} failed for user ${id}`);
      }
    }

    setSelectedUsers([]);
    fetchUsers();
  };

  // New function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const formatDate = (iso) => {
    if (!iso) return "Not yet";
    const date = new Date(iso);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 hover:scale-105 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center gap-4">
          <FaUserShield className="text-5xl" /> Admin Panel
        </h2>
        <div className="overflow-x-auto rounded-xl shadow border border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3 text-left">Select</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelect(user.id)}
                      className="form-checkbox h-4 w-4 text-blue-400 bg-gray-600 border-gray-500 rounded focus:ring-blue-400 transition"
                    />
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${user.status === "active" ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">{formatDate(user.lastLogin)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={() => handleAction("delete")}
          >
            <MdDelete /> Delete
          </button>
          <button
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={() => handleAction("block")}
          >
            <MdLock /> Block
          </button>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={() => handleAction("unblock")}
          >
            <MdLockOpen /> Unblock
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={handleLogout}
          >
            <MdExitToApp /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
