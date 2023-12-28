import React from 'react';
import DynamicTable from './DynamicTable';

const SeatGrid = () => {
  const myData = [  
    ['Occupied', 'Occupied', 'Available', 'Aisle', 'Occupied', 'Available', 'Available', 'Available'],
    ['Occupied', 'Available', 'Available', 'Aisle', 'Occupied', 'Occupied', 'Occupied', 'Available'],
    ['Occupied', 'Available', 'Available', 'Aisle', 'Occupied', 'Available', 'Occupied', 'Available'],
    ['Occupied', 'Occupied', 'Occupied', 'Aisle', 'Occupied', 'Available', 'Occupied', 'Available']
  ];

  return (
    <div>
      <h2>Dynamic Table</h2>
      <DynamicTable data={myData} />
      <br />
      <p>Selected Seat: <span>PLS SELECT</span></p>
    </div>
  );
};

export default SeatGrid;
