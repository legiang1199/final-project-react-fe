import React, { useState, useEffect } from "react";
import UserApi from "@/api/userApi";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Col } from "reactstrap";
import ReactPaginate from "react-paginate";

function UserList() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      // Chỉ gửi yêu cầu khi trạng thái là 'idle' (chưa gửi yêu cầu trước đó)
      setStatus("pending");

      UserApi.getAllUsers()
        .then((data) => {
          setUsers(data);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    }
  }, [status]);
  let content;

  if (status === "idle" || status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (status === "success") {
    return (
      <Card color="transparent" shadow={false} className="text-center">
        {users.map((user) => (
          <div classname ="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4" key={user.id}>
            <img
                src={user.avatar}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto"
                />
            <Typography variant="h5" color="blue-gray" className="mb-1 mt-6">
              {user.fullname}
            </Typography>
            {user.email && (
              <Typography className="font-normal text-blue-gray-500">
                {user.email}
              </Typography>
            )}
          </div>
        ))}
      </Card>
    );
  }

  const handleDelete = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);

    UserApi.deleteUser(id)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  };

  return (
    <div>
      <h1>User List</h1>
      {content}
    </div>
  );
}

export default UserList;
