import React from 'react';
import DynamicTable from './DynamicTable';

const SeatGrid = () => {
  const myData = [  
    ['Available', 'Available', 'Available', 'Aisle', 'Available', 'Available', 'Available', 'Available'],
    ['Available', 'Available', 'Available', 'Aisle', 'Available', 'Available', 'Available', 'Available'],
    ['Available', 'Available', 'Available', 'Aisle', 'Available', 'Available', 'Available', 'Available'],
    ['Available', 'Available', 'Available', 'Aisle', 'Available', 'Available', 'Available', 'Available'],
 
  ];

  return (
    <div>
      <DynamicTable data={myData} />
    </div>
  );
};

export default SeatGrid;
