import React = require('react');
import * as DropdownInput from 'react-widgets/lib/Combobox';

const noop = (x?) => {}

export default ({id, label, data, onSelect = noop, onChange = noop})=>{
  return <div className="input autocomplete-input">
    <label htmlFor={id}>{label}</label>
    <DropdownInput data={data} onChange={onChange} onSelect={onSelect} suggest={false} filter="contains" placeholder="Type here" duration={0} />
  </div>
};