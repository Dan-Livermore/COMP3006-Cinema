import React, { useState, useEffect } from "react";
import BackButton from "../../../Components/BackButton";
import Spinner from "../../../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBooking = () => {
  const [userID, setUserID] = useState("");
  const [showingID, setShowingID] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/bookings/${id}`)
      .then((response) => {
        setUserID(response.data.userID);
        setShowingID(response.data.showingID);
        setSeatNo(response.data.seatNO);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check console");
        console.log(error);
      });
  }, []);

  const handleEditBooking = () => {
    const data = {
      userID,
      showingID,
      seatNo
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/bookings/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Booking Updated Successfully", { variant: "success" });
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
      <h1 className="text-3xl my-4 text-center">Edit Booking</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">userID</label>
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">showingID</label>/label>
          <input
            type="text"
            value={showingID}
            onChange={(e) => setShowingID(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Seat Number
          </label>
          <input
            type="text"
            value={seatNo}
            onChange={(e) => setSeatNo(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-400  hover:bg-sky-600 rounded-lg m-8"
          onClick={handleEditBooking}
        >
          Save
        </button>
      </div>
      <BackButton />
    </div>
  );
};

export default EditBooking;
