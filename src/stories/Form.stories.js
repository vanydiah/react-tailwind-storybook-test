import Dropdown from '../components/Dropdown';
import React, { useState } from 'react';

export default {
  title: 'Form/Select Dropdown Field',
  component: Dropdown,
  argTypes: {
    multiple: { control: 'boolean', description: 'Enable multi-select' },
    searchable: { control: 'boolean', description: 'Enable search' },
    usePortal: { control: 'boolean', description: 'Render dropdown in portal' },
    placeholder: { control: 'text', description: 'Placeholder text' },
  },
};

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option with icon', value: 2 },
  { label: 'Long Long Option 3', value: 3 },
  { label: 'Long Long Long Option 4', value: 4 },
  { label: 'Long Long Long Long Option 5', value: 5 },
  { label: 'Long Long Long Long Long Option 6', value: 6 },
];

const DropdownField = (args) => {
  const [value, setValue] = useState(args.multiple ? [] : null);
  // Reset value type if toggle changes
  React.useEffect(() => {
    setValue(args.multiple ? [] : null);
  }, [args.multiple]);
  return (
    <form className="w-full max-w-md mx-auto mt-10">
      <label className="block mb-2 font-medium">Label</label>
      <Dropdown
        {...args}
        options={options}
        value={value}
        onChange={setValue}
      />
    </form>
  );
};

export const SelectDropdownField = DropdownField.bind({});
SelectDropdownField.args = {
  multiple: false,
  searchable: true,
  usePortal: false,
  placeholder: 'Select option...'
};
