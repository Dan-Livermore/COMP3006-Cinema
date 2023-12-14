import React from 'react';

const SeatGrid = ({ rows, seatsPerRow, onSeatClick }) => {
  const renderSeats = () => {
    const seatGrid = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatNumber = `${row}-${seat}`;
        rowSeats.push(
          <div
            key={seatNumber}
            className="p-2 border border-gray-300 cursor-pointer"
            onClick={() => onSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }
      seatGrid.push(
        <div key={row} className="flex justify-center">
          {rowSeats}
        </div>
      );
    }
    return seatGrid;
  };

  return <div className="flex flex-col">{renderSeats()}</div>;
};

export default SeatGrid;