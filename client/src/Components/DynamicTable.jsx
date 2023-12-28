import React, { useState } from "react";
import ChairIcon from "@mui/icons-material/Chair";

const DynamicTable = ({ data }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const selectSeat = (rowIndex, cellIndex, status) => {
    if (status === 'Available' || (selectedSeat && selectedSeat.rowIndex === rowIndex && selectedSeat.cellIndex === cellIndex)) {
      setSelectedSeat(selectedSeat && selectedSeat.rowIndex === rowIndex && selectedSeat.cellIndex === cellIndex ? null : { rowIndex, cellIndex });
    }
  };

  const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const colNumbs = "123 4567890";

  const rowLabels =
    data.length > 0 ? Array.from(rowLetters).slice(0, data.length) : [];
  const columnLabels = data[0]
    ? Array.from(colNumbs).slice(0, data[0].length)
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
      className = "bg-red-500 text-white";
      return (
        <div
          className={`p-2 rounded-lg border border-gray-300 m-1 ${className} ${
            selectedSeat &&
            selectedSeat.rowIndex === rowIndex &&
            selectedSeat.cellIndex === cellIndex
              ? "bg-green-500"
              : ""
          }`}
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
    selectedSeat !== null
      ? `Selected Seat: ${rowLabels[selectedSeat.rowIndex]}${
          columnLabels[selectedSeat.cellIndex]
        }`
      : "No seat selected";

  return (
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
            {data.map((row, rowIndex) => (
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
  );
};

export default DynamicTable;
