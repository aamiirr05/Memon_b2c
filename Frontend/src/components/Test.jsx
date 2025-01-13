import { useState } from 'react';

const RoomNameInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full">
      <label
        htmlFor="roomName"
        className={`absolute left-2 top-2 text-gray-500 transition-all duration-300 ${
          isFocused || value ? '-top-3 text-sm text-blue-500' : 'text-base'
        }`}
      >
        Room Name
      </label>
      <input
        type="text"
        id="roomName"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 pt-5"
      />
    </div>
  );
};

export default RoomNameInput;
