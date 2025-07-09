import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateProfileAPI, getProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import UpdatePassword from "./UpdatePassword";

const UserProfile = () => {
  // Fetch current user profile
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfileAPI,
  });

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update-profile"],
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: profileData?.username || "",
      email: profileData?.email || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Update Profile</h1>

      {isProfileLoading && <AlertMessage type="loading" message="Loading profile..." />}
      {isPending && <AlertMessage type="loading" message="Updating..." />}
      {isError && <AlertMessage type="error" message={error.message} />}
      {isSuccess && <AlertMessage type="success" message="Profile updated successfully" />}
      {isProfileError && <AlertMessage type="error" message="Failed to load profile data" />}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-2xl text-gray-400" />
          <div className="flex-1">
            <label htmlFor="username" className="text-sm text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps("username")}
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300"
              placeholder="Your username"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-2xl text-gray-400" />
          <div className="flex-1">
            <label htmlFor="email" className="text-sm text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300"
              placeholder="Your email"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>

      <UpdatePassword />
    </div>
  );
};

export default UserProfile;
