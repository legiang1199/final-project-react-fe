import { useState, useEffect } from "react";
import axios from "axios";
import UserApi from "@/api/userApi";
import jwt_decode from "jwt-decode";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

function EditProfile() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    UserApi.getUserById(userId).then((data) => {
      setProfile(data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    UserApi.patchEditUser(userId, profile)
      .then((data) => {
        setProfile(data);
        setIsEditing(false); 
        alert("Eidt profile successfully");
        window.location.href = "/profile";
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <Card color="transparent" className="flex-center" shadow={false}>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              onChange={handleInputChange}
              size="lg"
              placeholder={profile.fullname}
              name="fullname"
              type="text"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              onChange={handleInputChange}
              size="lg"
              name="email"
              type="email"
              placeholder={profile.email}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone Number
            </Typography>

            <Input
              onChange={handleInputChange}
              size="lg"
              name="phoneNumber"
              type="number"
              placeholder={profile.phoneNumber}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Address
            </Typography>
            <Input
              onChange={handleInputChange}
              size="lg"
              name="address"
              type="text"
              placeholder={profile.address}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Button color="" type="submit">
              <Typography color="white">Save</Typography>
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Full Name:
          </Typography>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {profile.fullname}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email:
          </Typography>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {profile.email}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Phone Number:
          </Typography>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {profile.phoneNumber}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Address:
          </Typography>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {profile.address}
          </Typography>
        </div>
      )}
      <div className="flex justify-between mt-4">
        {isEditing ? (
          <Button color="red" className="w-80 max-w-screen-lg sm:w-96" onClick={() => setIsEditing(false)}>
            <Typography color="white">Cancel</Typography>
          </Button>
        ) : (
          <Button color="red" className="w-80 max-w-screen-lg sm:w-96" onClick={() => setIsEditing(true)}>
            <Typography color="white">Edit</Typography>
          </Button>
        )}
      </div>
    </Card>
  );
}

export default EditProfile;
