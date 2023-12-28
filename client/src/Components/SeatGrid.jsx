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
      <DynamicTable data={myData} />
    </div>
  );
};

export default SeatGrid;
