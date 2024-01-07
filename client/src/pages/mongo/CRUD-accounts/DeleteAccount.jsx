import React, { useState } from "react";
import BackButton from "../../../Components/BackButton";
import Spinner from "../../../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteAccount = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/users/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("User Deleted Successfully", { variant: "success" });
        localStorage.removeItem("token");
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Delete Account</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are You Sure You want to delete your account?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteAccount}
        >
          Yes, Delete it
        </button>
      </div>
      <BackButton />
    </div>
  );
};

export default DeleteAccount;
