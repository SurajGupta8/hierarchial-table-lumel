import React from 'react';
import RowInput from './RowInput';
import '../styles/TableRow.css';

const TableRow = ({ 
  row, 
  level = 0, 
  inputValues, 
  onInputChange, 
  onPercentageAllocation, 
  onValueAllocation, 
  findOriginalValue,
  calculateVariance 
}) => {
  const formatValue = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const originalValue = findOriginalValue(row.id);
  const variance = calculateVariance(row.value, originalValue);

  return (
    <div className="row-container">
      <div className="table-row">
        <div className="label-cell" >
          {level > 0 && '-- '}{row.label}
        </div>
        <div className="value-cell">{formatValue(row.value)}</div>
        <RowInput 
          rowId={row.id}
          inputValue={inputValues[row.id] || ''}
          onInputChange={onInputChange}
          onPercentageAllocation={onPercentageAllocation}
          onValueAllocation={onValueAllocation}
        />
        <div className="variance-cell">
          {variance.toFixed(2)}%
        </div>
      </div>
      
      {row.children && row.children.map(child => (
        <TableRow 
          key={child.id}
          row={child}
          level={level + 1}
          inputValues={inputValues}
          onInputChange={onInputChange}
          onPercentageAllocation={onPercentageAllocation}
          onValueAllocation={onValueAllocation}
          findOriginalValue={findOriginalValue}
          calculateVariance={calculateVariance}
        />
      ))}
    </div>
  );
};

export default TableRow;