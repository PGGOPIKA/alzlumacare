import React, { useState, useEffect } from 'react';
import './MedicationRemainder.css';

const initialFormData = {
  'Medication Reminder': [{ medicine: '', dose: '', time: '' }],
  'Food and Hydration Reminder': [{ foodTime: '', waterTime: '' }],
  'Doctor Consultation Reminder': [{ doctor: '', hospital: '', date: '', consultationTime: '' }],
};

const MedicationRemainder = ({ defaultSelected }) => {
  const [activeButton, setActiveButton] = useState('Medication Reminder');
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const validDefault = defaultSelected && initialFormData[defaultSelected] ? defaultSelected : 'Medication Reminder';
    setActiveButton(validDefault);
  }, [defaultSelected]);

  const handleButtonClick = (btn) => {
    setActiveButton(btn);
  };

  const handleChange = (index, field, value) => {
    const updatedSection = [...formData[activeButton]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [activeButton]: updatedSection });
  };

  const handleAdd = () => {
    let newEntry = {};
    if (activeButton === 'Medication Reminder') newEntry = { medicine: '', dose: '', time: '' };
    if (activeButton === 'Food and Hydration Reminder') newEntry = { foodTime: '', waterTime: '' };
    if (activeButton === 'Doctor Consultation Reminder') newEntry = { doctor: '', hospital: '', date: '', consultationTime: '' };
    setFormData({ ...formData, [activeButton]: [...formData[activeButton], newEntry] });
  };

  const handleSave = () => {
    console.log(`${activeButton} Saved:`, formData[activeButton]);
    alert(`${activeButton} saved successfully!`);
  };

  const renderFormFields = () => {
    const fields = formData[activeButton];
    if (!fields || fields.length === 0) return <p>No fields available.</p>;

    return fields.map((entry, index) => (
      <div key={index} style={{ marginBottom: '15px' }}>
        {Object.keys(entry).map((field) => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <input
              type={field.includes('date') ? 'date' : field.includes('time') ? 'time' : 'text'}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              value={entry[field]}
              onChange={(e) => handleChange(index, field, e.target.value)}
              style={{
                marginBottom: '5px', 
                padding: '10px', 
                borderRadius: '5px', 
                width: '100%',  // Ensures full width for the input fields
              }}
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #003973, #e5e5be)',
        height: '100vh',
        padding: '40px',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        overflowY: 'auto',
      }}
    >
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>{activeButton.toUpperCase()}</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px' }}>
        {Object.keys(initialFormData).map((btnText) => (
          <button
            key={btnText}
            className="nav-button"
            onClick={() => handleButtonClick(btnText)}
            style={{
              backgroundColor: activeButton === btnText ? '#000000' : '#174ea6',
              color: 'white',
            }}
          >
            {btnText.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '40px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
        {renderFormFields()}

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleAdd} className="nav-button" style={{ marginRight: '10px' }}>
            ADD
          </button>
          <button onClick={handleSave} className="nav-button">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicationRemainder;
