import React, { useState } from "react";
import "./customSelect.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Option {
  label: any;
  value: any;
}

interface CustomSelectProps {
  options: Option[];
  defaultOption?: Option;
  onSelect: (value: string) => void;
  label?: string;
  placeholder?: string;
  value?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOption,
  onSelect,
  label,
  placeholder = "Select an option",
  value,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    defaultOption
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.value); // Use option.value instead of option directly
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
          {selectedOption ? selectedOption.label : placeholder}
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
                option.value === selectedOption?.value ? "selected" : ""
              }`}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
