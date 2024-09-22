import React, { useState } from "react";
import "./customSelect.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface CustomSelectProps {
  options: string[];
  defaultOption?: string;
  onSelect: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOption,
  onSelect,
  label,
  placeholder = "Select an option",
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultOption
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="custom-select-container">
      <label htmlFor="custom-select">{label}</label>
      <div
        className="custom-select"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="selected-option">
          {selectedOption ? selectedOption : placeholder}
        </span>
        <span className={`${isDropdownOpen ? "open" : ""}`}>
          <MdOutlineKeyboardArrowDown style={{ fontSize: "1rem" }} />
        </span>
      </div>

      {isDropdownOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                option === selectedOption ? "selected" : ""
              }`}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
