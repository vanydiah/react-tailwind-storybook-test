import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Dropdown Component
 * Features:
 * - Searchable (toggleable)
 * - Portal support (toggleable)
 * - Single/multiple selection
 * - Customizable option rendering
 * - Search filtering
 * - Feature toggles
 * - Z-index compatibility
 */
const Dropdown = ({
  options = [],
  value,
  onChange,
  multiple = false,
  searchable = false,
  usePortal = false,
  renderOption,
  filterFunction,
  zIndex = 1050,
  featureToggles = {},
  placeholder = 'Select...'
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  // Feature toggles
  const isSearchable = featureToggles.searchable ?? searchable;
  const isPortal = featureToggles.usePortal ?? usePortal;
  const isMultiple = featureToggles.multiple ?? multiple;

  // Filter options
  const filteredOptions = isSearchable && search
    ? (filterFunction
        ? options.filter(opt => filterFunction(opt, search))
        : options.filter(opt => String(opt.label || opt).toLowerCase().includes(search.toLowerCase()))
      )
    : options;

  // Handle selection
  const handleSelect = (option) => {
    if (isMultiple) {
      if (Array.isArray(value) && value.includes(option)) {
        onChange(value.filter(v => v !== option));
      } else {
        onChange([...(Array.isArray(value) ? value : []), option]);
      }
    } else {
      onChange(option);
      setOpen(false);
    }
  };

  // Highlight search keyword in option label
  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\$&')})`, 'gi');
    return String(text).split(regex).map((part, i) =>
      regex.test(part)
        ? <span key={i} className="bg-green-400 text-black rounded px-1">{part}</span>
        : part
    );
  };

  // Render option
  const renderOpt = (option, idx) => {
    const label = renderOption ? renderOption(option) : (option.label || option);
    return (
      <div
        key={idx}
        className="dropdown-option cursor-pointer px-3 py-2 hover:bg-gray-100"
        onClick={() => handleSelect(option)}
      >
        {isSearchable && search ? highlightText(label, search) : label}
      </div>
    );
  };

  // Dropdown menu
  const menu = (
    <div
      className="dropdown-menu absolute bg-white border rounded shadow-lg mt-1"
      style={{ zIndex }}
    >
      {isSearchable && (
        <input
          className="dropdown-search w-full px-3 py-2 border-b outline-none"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          tabIndex={0}
          autoFocus={open}
        />
      )}
      <div className="dropdown-options max-h-60 overflow-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map(renderOpt)
        ) : (
          <div className="px-3 py-2 text-gray-400">No options</div>
        )}
      </div>
    </div>
  );

  // Multi-select chips/tags UI
  const handleRemove = (option, e) => {
    e.stopPropagation();
    if (isMultiple && Array.isArray(value)) {
      onChange(value.filter(v => v !== option));
    }
  };

  const displayValue = isMultiple
    ? (
        Array.isArray(value) && value.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {value.map((v, i) => (
              <span key={i} className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm mr-1 mb-1">
                {typeof v === 'object' ? (v.label || v.value || '') : String(v)}
                <button
                  type="button"
                  className="ml-1 text-gray-400 hover:text-gray-700 focus:outline-none"
                  onClick={e => handleRemove(v, e)}
                  tabIndex={-1}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )
      )
    : (value
        ? (typeof value === 'object' ? (value.label || value.value || '') : String(value))
        : <span className="text-gray-400">{placeholder}</span>);

  // Portal rendering
  const menuNode = isPortal && open
    ? ReactDOM.createPortal(menu, document.body)
    : open && menu;

  return (
    <div className="dropdown relative" ref={ref}>
      <div
        className="dropdown-control border px-3 py-2 rounded cursor-pointer bg-white min-h-[42px] flex items-center flex-wrap gap-1"
        onClick={() => setOpen(o => !o)}
        tabIndex={0}
        onBlur={e => {
          // Only close if focus moves outside the dropdown
          if (e.relatedTarget && ref.current && ref.current.contains(e.relatedTarget)) {
            return;
          }
          setTimeout(() => setOpen(false), 150);
        }}
      >
        {displayValue}
      </div>
      {menuNode}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  searchable: PropTypes.bool,
  usePortal: PropTypes.bool,
  renderOption: PropTypes.func,
  filterFunction: PropTypes.func,
  zIndex: PropTypes.number,
  featureToggles: PropTypes.object,
  placeholder: PropTypes.string
};

export default Dropdown;
