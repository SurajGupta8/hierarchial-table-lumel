import React from 'react';
import '../styles/TableHeader.css';

const TableHeader = () => {
  return (
    <div className="table-header">
      <div className="label-header">Label</div>
      <div className="value-header">Value</div>
      <div className="input-header">Input</div>
      <div className="button-header">Allocation %</div>
      <div className="button-header">Allocation Val</div>
      <div className="variance-header">Variance %</div>
    </div>
  );
};

export default TableHeader;