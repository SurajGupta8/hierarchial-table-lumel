import React from 'react';
import '../styles/RowInput.css';

const RowInput = ({ 
  rowId, 
  inputValue, 
  onInputChange, 
  onPercentageAllocation, 
  onValueAllocation 
}) => {
  return (
    <>
      <div className="input-cell">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(rowId, e.target.value)}
          placeholder="Enter value"
          className="value-input"
        />
      </div>
      <div className="button-cell">
        <button 
          onClick={() => onPercentageAllocation(rowId)} 
          className="allocation-btn"
        >
          Allocation %
        </button>
      </div>
      <div className="button-cell">
        <button 
          onClick={() => onValueAllocation(rowId)} 
          className="allocation-btn"
        >
          Allocation Val
        </button>
      </div>
    </>
  );
};

export default RowInput;