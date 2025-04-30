import React from 'react';
import '../styles/TableFooter.css';

const TableFooter = ({ grandTotal, originalTotal, calculateVariance }) => {
  const formatValue = (value) => {
    return parseFloat(value).toFixed(2);
  };

  return (
    <div className="table-footer">
      <div className="label-cell">Grand Total</div>
      <div className="value-cell">{formatValue(grandTotal)}</div>
      <div className="input-cell"></div>
      <div className="button-cell"></div>
      <div className="button-cell"></div>
      <div className="variance-cell">
        {calculateVariance(grandTotal, originalTotal).toFixed(2)}%
      </div>
    </div>
  );
};

export default TableFooter;