import React, { useState } from "react";
import { useEffect } from "react";

import UserApi from "@/api/userApi";
import { Button } from "antd";
import UserList from "@/components/admin/userControl";
import { useParams } from "react-router-dom";
import CategoryApi from "@/api/categoryApi";

export default function UserControl() {
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const deleteUser = (id) => {
    UserApi.deleteUser(id)
      .then((data) => {
        console.log(data);
        setStatus("success");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCategory = (id) => {
    CategoryApi.deleteCategory(id)
    .then((data) => {
      console.log(data);
      setStatus("success");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    UserApi.getAllUsers()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
    CategoryApi.getAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  const filteredUsers = user.filter((user) => user.role === 'user');

  return (
    <div className="flex flex-auto gap-4">
      <table className="table-auto">
        <thead>
          <p className="font-bold">User List</p>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Fullname</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        {filteredUsers.map((user) => (
          <tbody>
            <tr>
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.fullname}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.phoneNumber}</td>
              <td className="border px-4 py-2">{user.address}</td>
              <td className="border px-4 py-2">
                <Button onClick={() => deleteUser(user._id)}>Delete</Button>
              </td>
            </tr>
          </tbody>
        ))}
        <thead className="gap-4 py-2 ">
          <div className="flex flex-auto gap-4 py-4">
            <p className="font-bold">Category List</p>
            <Button>
              <a href="/category">Create Category</a>
            </Button>
          </div>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category) => (
            <tr>
              <td className="border px-4 py-2">{category._id}</td>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">{category.description}</td>
              <td className="border px-4 py-2">
                <Button onClick={() => deleteCategory(category._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
