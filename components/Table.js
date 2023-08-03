import React from "react";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {Object.entries(data).map((item, index) => {
              return (
                <th key={index} className="border p-4">
                  {item[0]}
                </th>
              );
            })}
            {/* Add more header columns as needed */}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            {Object.entries(data).map((item, index) => {
              return (
                <td key={index} className="border text-center p-4">
                  {item[1]}
                </td>
              );
            })}
            {/* Add more data rows as needed */}
          </tr>
          {/* Additional data rows */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
