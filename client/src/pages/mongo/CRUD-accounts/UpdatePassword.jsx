import React, { useState, useEffect } from "react";
import BackButton from "../../../Components/BackButton";
import Spinner from "../../../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/users/${id}`)
    .then((response) => {
        setEmail(response.data.email);
        setPassword(response.data.password);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])

  const handleUpdatePassword = () => {
    const data = {
      email,
      password,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/users/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Password Updated Successfully", { variant: "success" });
        try {
          localStorage.removeItem("token");
          navigate("/log-in");
        } catch {
          console.log("Can Not Log Out");
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4 text-center">Edit Password</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Enter New Password
          </label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-400  hover:bg-sky-600 rounded-lg m-8"
          onClick={handleUpdatePassword}
        >
          Save
        </button>
      </div>
      <BackButton />
    </div>
  );
};

export default UpdatePassword;
