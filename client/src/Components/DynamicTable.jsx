import React, { useState, useEffect, useMemo } from "react";
import ChairIcon from "@mui/icons-material/Chair";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DynamicTable = ({ data }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatAvailability, setSeatAvailability] = useState(data);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showings, setShowings] = useState([]);
  const [user, setUser] = useState({});
  const socket = useMemo(() => io("http://localhost:3002"), []);

  const navigate = useNavigate();
  const showingID = useParams().id;
  // const { showingID } = "658334a2ed59946e06f5306c"
const handleBookSeat = () => {
  if (selectedSeat) {
    const selectedRowLetter = rowLabels[selectedSeat.rowIndex];
    let rowInteger = rowLetters.indexOf(selectedRowLetter) + 1;

    let colInteger = parseInt(columnLabels[selectedSeat.cellIndex], 10) -1;
    if (colInteger > 2) {
      colInteger += 1;
    }

    if (!colInteger) {
      console.log("No Seat Selected");
    } else {
      const row = toString("row" + rowInteger);
      const data = {
        rowInteger,
        colInteger,
      };
      console.log("Selected Seat:", data, {
        row: rowInteger,
        col: colInteger,
      });

      setLoading(true);
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const id = jwtDecode(token).userId;
          console.log("showingID", showingID);
          // axios
            // .get(`http://localhost:5555/users/${id}`)
            // .then((response) => {
            //   setUser(response.data);
            //   setLoading(false);

              let seatNo = "";
              if (rowInteger === 1) {
                seatNo = "A" + colInteger;
              } else if (rowInteger === 2) {
                seatNo = "B" + colInteger;
              } else if (rowInteger === 3) {
                seatNo = "C" + colInteger;
              } else {
                seatNo = "D" + colInteger;
              }
              console.log("Seat", seatNo);
              const bookingData = {
                userID: id,
                showingID: showingID,
                seatNo: seatNo,
              };
              console.log(bookingData);
              axios
                .post(`http://localhost:5555/bookings`, bookingData)
                .then((response) => {
                  setBookings(response.data);
                  setLoading(false);
                  navigate(`/booking-success/${response.data._id}`);
                })
                .catch((error) => {
                  console.log(error);
                  setLoading(false);
                })    
            // })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        } catch (error) {
          console.error("Error decoding token:", error);
          setLoading(false);
        }
      }
    }
  } else {
    console.log("No seat selected to book");
  }
};


  useEffect(() => {
    const handleRecieveSeat = ({ rowIndex, cellIndex }) => {
      console.log("Received", { rowIndex, cellIndex });

      const updatedSeats = [...seatAvailability];
      updatedSeats[rowIndex][cellIndex] = "Occupied";
      setSeatAvailability(updatedSeats);

      if (
        selectedSeat &&
        selectedSeat.rowIndex === rowIndex &&
        selectedSeat.cellIndex === cellIndex
      ) {
        setSelectedSeat(null);
      }
    };

    socket.on("RecieveSeat", handleRecieveSeat);

    return () => {
      socket.off("RecieveSeat", handleRecieveSeat);
    };
  }, [socket, seatAvailability, selectedSeat]);

  const selectSeat = (rowIndex, cellIndex, status) => {
    const newStatus = status === "Available" ? "Selected" : "Available";
    let emitStatus = newStatus;

    if (status === "Selected") {
      emitStatus = "Available";
      socket.emit("SeatOccupied", { rowIndex, cellIndex, status: "Occupied" });
    } else {
      socket.emit("SeatSelected", { rowIndex, cellIndex, status: newStatus });
    }

    const updatedSelectedSeat =
      selectedSeat &&
      selectedSeat.rowIndex === rowIndex &&
      selectedSeat.cellIndex === cellIndex
        ? null
        : { rowIndex, cellIndex };

    setSelectedSeat(updatedSelectedSeat);

    if (status === "Selected") {
      const updatedStatus = displaySeat("Available", rowIndex, cellIndex);
      if (
        updatedStatus &&
        updatedStatus.props &&
        updatedStatus.props.children &&
        updatedStatus.props.children.includes("Selected")
      ) {
        socket.emit("SeatSelected", {
          rowIndex,
          cellIndex,
          status: "Selected",
        });
      } else {
        socket.emit("SeatSelected", {
          rowIndex,
          cellIndex,
          status: "Available",
        });
      }
    }
  };

  const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const colNumbs = "123 4567890";

  const rowLabels =
    seatAvailability.length > 0
      ? Array.from(rowLetters).slice(0, seatAvailability.length)
      : [];
  const columnLabels = seatAvailability[0]
    ? Array.from(colNumbs).slice(0, seatAvailability[0].length)
    : [];

  const displaySeat = (status, rowIndex, cellIndex) => {
    let className = "";

    if (status === "Occupied") {
      className = "text-white bg-gray-500";
      return (
        <div
          className={`disabled p-2 rounded-lg border border-gray-300 m-1 ${className}`}
        >
          <ChairIcon /> {status}
        </div>
      );
    } else if (status === "Available") {
      if (
        selectedSeat &&
        selectedSeat.rowIndex === rowIndex &&
        selectedSeat.cellIndex === cellIndex
      ) {
        className = "bg-green-500";
      } else {
        className = "bg-red-500";
      }
      return (
        <div
          className={`p-2 rounded-lg border border-gray-300 m-1 text-white ${className}`}
        >
          <ChairIcon />{" "}
          {selectedSeat &&
          selectedSeat.rowIndex === rowIndex &&
          selectedSeat.cellIndex === cellIndex
            ? "Selected"
            : status}
        </div>
      );
    } else if (status === "Aisle") {
      className = "bg-gray-200";
      return (
        <div
          className={`disabled p-2 rounded-lg border border-gray-300 m-1 ${className}`}
        >
          {status}
        </div>
      );
    }

    return null;
  };

  const selectedSeatText =
    selectedSeat !== null && selectedSeat.cellIndex !== 3 // Check if the selection is not in the 4th column
      ? `Selected Seat: ${rowLabels[selectedSeat.rowIndex]}${
          columnLabels[selectedSeat.cellIndex]
        }`
      : "No seat selected";

  return (
    <>
      <div>
        <div className="flex justify-center">
          <table className="mt-10">
            <thead>
              <tr>
                <th></th>
                {columnLabels.map((label, index) => (
                  <th key={index}>{label === " " ? "Aisle" : label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seatAvailability.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="font-bold">{rowLabels[rowIndex]}</td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <button
                        onClick={() => selectSeat(rowIndex, cellIndex, cell)}
                      >
                        {displaySeat(cell, rowIndex, cellIndex)}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <br />
          <p className="mt-10 text-lg">{selectedSeatText}</p>
        </div>
      </div>
      <div className="flex min-h-full flex-1 justify-center items-center px-6 py-12 lg:px-8">
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-4 w-80 h-30 px-4 rounded-lg"
          onClick={handleBookSeat}
        >
          Book Seat
        </button>
      </div>
    </>
  );
};

export default DynamicTable;