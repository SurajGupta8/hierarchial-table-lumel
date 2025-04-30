import React from 'react';
import { useState, useEffect } from 'react';
import HierarchicalTable from './components/HierarchicalTable';
import { initialData } from './data/initialData';
import './styles/App.css';

const App = () => {
  const [data, setData] = useState(initialData);
  const [originalData, setOriginalData] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const deepCopy = JSON.parse(JSON.stringify(initialData));
    setOriginalData(deepCopy);

    let total = 0;
    deepCopy.rows.forEach(row => {
      if (row.children) {
        row.children.forEach(child => {
          total += child.value;
        });
      } else {
        total += row.value;
      }
    });
    setGrandTotal(total);
  }, []);

  const handleInputChange = (id, value) => {
    setInputValues({
      ...inputValues,
      [id]: value
    });
  };

  const findOriginalValue = (id) => {
    for (const row of originalData?.rows || []) {
      if (row.id === id) return row.value;
      if (row.children) {
        for (const child of row.children) {
          if (child.id === id) return child.value;
        }
      }
    }
    return 0;
  };

  const findRowById = (rows, id) => {
    for (const row of rows) {
      if (row.id === id) return row;
      if (row.children) {
        const found = findRowById(row.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentRow = (rows, childId) => {
    for (const row of rows) {
      if (row.children) {
        for (const child of row.children) {
          if (child.id === childId) return row;
        }
        const found = findParentRow(row.children, childId);
        if (found) return found;
      }
    }
    return null;
  };

  const updateParentValues = (newData) => {
    const updatedData = { ...newData };

    updatedData.rows.forEach(row => {
      if (row.children && row.children.length > 0) {
        row.value = row.children.reduce((sum, child) => sum + child.value, 0);
      }
    });

    const newGrandTotal = updatedData.rows.reduce((sum, row) => sum + row.value, 0);
    setGrandTotal(newGrandTotal);

    return updatedData;
  };

  const handlePercentageAllocation = (id) => {
    const percentValue = parseFloat(inputValues[id] || 0);
    if (isNaN(percentValue)) return;

    const newData = { ...data };
    const row = findRowById(newData.rows, id);
    
    if (row) {
      const increase = (row.value * percentValue) / 100;
      row.value += increase;

      if (row.children && row.children.length > 0) {
        const totalChildrenValue = row.children.reduce((sum, child) => sum + child.value, 0);
        
        row.children.forEach(child => {
          if (totalChildrenValue > 0) {
            const proportion = child.value / totalChildrenValue;
            child.value += increase * proportion;
          } else {
            child.value += increase / row.children.length;
          }
        });
      }

      const parentRow = findParentRow(newData.rows, id);
      if (parentRow) {
        parentRow.value = parentRow.children.reduce((sum, child) => sum + child.value, 0);
      }
      
      setData(updateParentValues(newData));
      setInputValues({ ...inputValues, [id]: '' });
    }
  };

  const handleValueAllocation = (id) => {
    const directValue = parseFloat(inputValues[id] || 0);
    if (isNaN(directValue)) return;

    const newData = { ...data };
    const row = findRowById(newData.rows, id);
    
    if (row) {
      row.value = directValue;

      if (row.children && row.children.length > 0) {
        const totalChildrenValue = row.children.reduce((sum, child) => sum + child.value, 0);
        
        if (totalChildrenValue > 0) {
          row.children.forEach(child => {
            const proportion = child.value / totalChildrenValue;
            child.value = directValue * proportion;
          });
        } else {
          const equalShare = directValue / row.children.length;
          row.children.forEach(child => {
            child.value = equalShare;
          });
        }
      }

      const parentRow = findParentRow(newData.rows, id);
      if (parentRow) {
        parentRow.value = parentRow.children.reduce((sum, child) => sum + child.value, 0);
      }
      
      setData(updateParentValues(newData));
      setInputValues({ ...inputValues, [id]: '' });
    }
  };

  if (!originalData) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <h1>Hierarchical Table</h1>
      
      <HierarchicalTable 
        data={data.rows}
        originalData={originalData}
        inputValues={inputValues}
        grandTotal={grandTotal}
        onInputChange={handleInputChange}
        onPercentageAllocation={handlePercentageAllocation}
        onValueAllocation={handleValueAllocation}
        findOriginalValue={findOriginalValue}
      />
    </div>
  );
};

export default App;