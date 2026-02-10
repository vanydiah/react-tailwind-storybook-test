import React, { useState, useRef } from 'react';
import './App.css';
import { Button } from './components/Button';
import Dropdown from './components/Dropdown';

function App() {
  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Long Option 4', value: 4 },
    { label: 'Long Long Option 5', value: 5 },
  ];

  // State for single and multiple select
  const [singleValue, setSingleValue] = React.useState(null);
  const [multiValue, setMultiValue] = React.useState([]);

  return (
    <div className="App p-8 space-y-16">
      <div>
        <h2 className="text-lg font-bold mb-5 text-left">Dropdown Demo (Single Select)</h2>
        <div className="flex flex-row items-center gap-4">
          <div className="w-[250px] flex-shrink-0">
            <label className="block font-medium text-left">Choose an option:</label>
          </div>
          <div className="flex-grow">
            <Dropdown
              options={options}
              value={singleValue}
              onChange={setSingleValue}
              searchable={true}
              placeholder="Select option..."
            />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">Selected: {singleValue ? (singleValue.label || singleValue.value) : 'None'}</div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2 text-left">Dropdown Demo (Multiple Select)</h2>
        <div className="flex flex-row items-center gap-4">
          <div className="w-[250px] flex-shrink-0">
            <label className="block font-medium text-left">Choose some options:</label>
          </div>
          <div className="flex-grow">
            <Dropdown
              options={options}
              value={multiValue}
              onChange={setMultiValue}
              multiple={true}
              searchable={true}
              placeholder="Select options..."
            />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">Selected: {multiValue.length > 0 ? multiValue.map(v => v.label || v.value).join(', ') : 'None'}</div>
      </div>
    </div>
  );
}

export default App;
