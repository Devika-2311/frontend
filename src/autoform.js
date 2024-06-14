import React, { useState } from 'react';

const AutoPolicyForm = () => {
  const [formData, setFormData] = useState({
    vehicleModelNo: '',
    licensePlateNo: '',
    driverLicense: '',
    vehicleValue: '',
    primaryUse: '',
    vehicleType: '',
    driverAge: '',
    cheatSheet: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8001/auto-policies/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Auto policy created successfully');
        // Optionally reset form fields after successful submission
        // setFormData({ ...initialState });
      } else {
        // Handle error cases
        alert('Failed to create auto policy');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create auto policy');
    }
  };

  return (
    <div>
      <h2>Auto Policy Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Vehicle Model No:
          <input type="text" name="vehicleModelNo" value={formData.vehicleModelNo} onChange={handleInputChange} />
        </label>
        <label>
          License Plate No:
          <input type="text" name="licensePlateNo" value={formData.licensePlateNo} onChange={handleInputChange} />
        </label>
        <label>
          Driver License:
          <input type="text" name="driverLicense" value={formData.driverLicense} onChange={handleInputChange} />
        </label>
        <label>
          Vehicle Value:
          <input type="text" name="vehicleValue" value={formData.vehicleValue} onChange={handleInputChange} />
        </label>
        <label>
          Primary Use:
          <input type="text" name="primaryUse" value={formData.primaryUse} onChange={handleInputChange} />
        </label>
        <label>
          Vehicle Type:
          <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} />
        </label>
        <label>
          Driver Age:
          <input type="text" name="driverAge" value={formData.driverAge} onChange={handleInputChange} />
        </label>
        <label>
          Cheat Sheet:
          <input type="text" name="cheatSheet" value={formData.cheatSheet} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AutoPolicyForm;
