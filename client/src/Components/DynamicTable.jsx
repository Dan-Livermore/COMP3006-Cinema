import React from 'react';
import ChairIcon from '@mui/icons-material/Chair';

const DynamicTable = ({ data }) => {
    const sendSeat = () => {
      let className = 'text-white bg-green-500';
      return (
        <div className={`p-2 rounded-lg border border-gray-300 m-1 ${className}`}>
          <ChairIcon />
          {' Selected'}
        </div>
      );
    }
  const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const colNumbs = '123 4567890';

  const rowLabels = data.length > 0 ? Array.from(rowLetters).slice(0, data.length) : [];

  const columnLabels = data[0] ? Array.from(colNumbs).slice(0, data[0].length) : [];

  // Function to determine which icon to render based on cell content
  const displaySeat = (status) => {
    let className = '';

    if (status === 'Occupied') {
      className = 'text-white bg-gray-500';
      return (
        <div className={`disabled p-2 rounded-lg border border-gray-300 m-1 ${className}`}>
          <ChairIcon />
          {' '}
          {status}
        </div>
      );
    } else if (status === 'Available') {
      className = 'bg-red-500 text-white';
      return (
        <div className={`p-2 rounded-lg border border-gray-300 m-1 ${className}`}>
          <ChairIcon />
          {' '}
          {status}
        </div>
      );
    } else if (status === 'Aisle') {
      className = 'bg-gray-200 ';
      return (
        <div className={`disabled p-2 rounded-lg border border-gray-300 m-1 ${className}`}>
          {status}
        </div>
      );
    }

    return null;
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {columnLabels.map((label, index) => (
            <th key={index}>{label === ' ' ? 'Aisle' : label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
          <td className="font-bold">{rowLabels[rowIndex]}</td>
            {row.slice(0, row.length).map((cell, cellIndex) => (
              <td key={cellIndex}>
                <button onClick={sendSeat}>
                  {displaySeat(cell)}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
