import { useState, useRef, useEffect } from 'react';
import { LucideChevronDown } from 'lucide-react';

const SearchableDropdown = ({ options, selectedValue, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for outside clicks
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button with a down arrow to toggle the dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded w-full bg-darkgreen text-peach text-left"
      >
        {selectedValue || 'Select a country'}
        <LucideChevronDown size={18} />
      </button>

      {/* Dropdown list */}
      {isDropdownOpen && (
        <div className="border border-darkgreen rounded w-full max-h-60 overflow-auto absolute bg-darkgreen text-peach mt-1 z-50 ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a country..."
            className="px-4 py-2 w-full bg-peach focus:outline-darkgreen focus:ring-2 focus:ring-darkgreen text-darkgreen border-b border-peach placeholder:text-darkgreen/50 "
          />
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-peach/20 cursor-pointer"
                  onClick={() => {
                    onSelect(option); // Trigger callback to update selected country in parent
                    setSearchQuery(''); // Clear search query after selection
                    setIsDropdownOpen(false); // Close dropdown after selection
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-peach">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
