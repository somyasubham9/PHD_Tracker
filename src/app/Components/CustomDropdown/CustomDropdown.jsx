import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const CustomDropdown = ({ options, selectedValues, onChange, isSet }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        if (!isSet) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (option) => {
        if (!isSet) {
            const isSelected = selectedValues.includes(option.id);
            let updatedValues;
            if (isSelected) {
                updatedValues = selectedValues.filter((value) => value !== option.id);
            } else {
                updatedValues = [...selectedValues, option.id];
            }
            onChange(updatedValues);
        }
    };

    return (
        <div className="relative">
            <div
                className={`w-full h-10 border border-gray-300 rounded-md px-4 py-6 flex items-center justify-between ${isSet ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}
                onClick={toggleDropdown}
            >
                <div className="flex flex-wrap">
                    {selectedValues.map((value) => {
                        const selectedOption = options.find((option) => option.id === value);
                        if (!selectedOption) return null;
                        return (
                            <span key={selectedOption.id} className="mr-2 bg-blue-200 text-blue-700 rounded-md px-2 py-2">
                                {selectedOption.first_name} {selectedOption.last_name}
                                {!isSet && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOptionClick(selectedOption);
                                        }}
                                        className="ml-2 focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                )}
                            </span>
                        );
                    })}
                </div>
                {isOpen && !isSet ? <MdArrowDropUp className="text-gray-500" /> : <MdArrowDropDown className="text-gray-500" />}
            </div>
            {isOpen && !isSet && (
                <div className="absolute w-full mt-1 bg-white shadow-md rounded-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedValues.includes(option.id) ? "bg-gray-200" : ""}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.first_name} {option.last_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
