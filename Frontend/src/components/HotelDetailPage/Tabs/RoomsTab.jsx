import React from 'react';
import { useHotelStore } from '../../../store/useHotelStore';

const RoomsTab = () => {
  const { selectedHotel } = useHotelStore();

  if (!selectedHotel || !selectedHotel.rooms?.length) {
    return <p>No room details available</p>;
  }

  return (
    <table className="table-auto w-full border-collapse border border-darkgreen/30 text-neutral-800 mt-6 mb-12">
      <thead>
        <tr>
          <th className="border border-darkgreen/30 px-4 py-2">Room Type</th>
          <th className="border border-darkgreen/30 px-4 py-2">Price (INR)</th>
        </tr>
      </thead>
      <tbody>
        {selectedHotel.rooms.map((room) => (
          <React.Fragment key={room.room_id}>
            {room.quint_price && (
              <tr>
                <td className="border border-darkgreen/30 px-4 py-2">
                  Quintuple
                </td>
                <td className="border border-darkgreen/30 px-4 py-2">
                  <span className="text-sm">₹ </span>
                  {room.quint_price}
                </td>
              </tr>
            )}
            {room.quad_price && (
              <tr>
                <td className="border border-darkgreen/30 px-4 py-2">
                  Quadruple
                </td>
                <td className="border border-darkgreen/30 px-4 py-2">
                  <span className="text-sm">₹ </span>
                  {room.quad_price}
                </td>
              </tr>
            )}
            {room.triple_price && (
              <tr>
                <td className="border border-darkgreen/30 px-4 py-2">Triple</td>
                <td className="border border-darkgreen/30 px-4 py-2">
                  <span className="text-sm">₹ </span>
                  {room.triple_price}
                </td>
              </tr>
            )}
            {room.double_price && (
              <tr>
                <td className="border border-darkgreen/30 px-4 py-2">Double</td>
                <td className="border border-darkgreen/30 px-4 py-2">
                  <span className="text-sm">₹ </span>
                  {room.double_price}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default RoomsTab;

// import { useHotelStore } from '../../../store/useHotelStore';

// const RoomsTab = () => {
//   const { selectedHotel } = useHotelStore();
//   console.log(selectedHotel);

//   return selectedHotel.rooms?.length ? (
//     <table className="table-auto w-full border-collapse border border-gray-300">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 px-4 py-2">Room Type</th>
//           <th className="border border-gray-300 px-4 py-2">Price (USD)</th>
//         </tr>
//       </thead>
//       <tbody>
//         {selectedHotel.rooms.map((room) => {
//           console.log(room);
//         })}
//       </tbody>
//     </table>
//   ) : (
//     <p>No room details available</p>
//   );
// };

// export default RoomsTab;
