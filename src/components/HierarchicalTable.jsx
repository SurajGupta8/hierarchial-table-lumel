import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableFooter from './TableFooter';
import '../styles/HierarchicalTable.css';

const HierarchicalTable = ({ 
  data, 
  originalData, 
  inputValues, 
  grandTotal, 
  onInputChange, 
  onPercentageAllocation, 
  onValueAllocation, 
  findOriginalValue 
}) => {
  const calculateVariance = (currentValue, originalValue) => {
    if (originalValue === 0) return 0;
    return ((currentValue - originalValue) / originalValue) * 100;
  };

  return (
    <div className="table-container">
      <TableHeader />
      
      <div className="table-body">
        {data.map(row => (
          <TableRow 
            key={row.id}
            row={row}
            level={0}
            inputValues={inputValues}
            onInputChange={onInputChange}
            onPercentageAllocation={onPercentageAllocation}
            onValueAllocation={onValueAllocation}
            findOriginalValue={findOriginalValue}
            calculateVariance={calculateVariance}
          />
        ))}
      </div>
      
      <TableFooter 
        grandTotal={grandTotal}
        originalTotal={originalData.rows.reduce((sum, row) => sum + row.value, 0)}
        calculateVariance={calculateVariance}
      />
    </div>
  );
};

export default HierarchicalTable;