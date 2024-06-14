import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TermPolicyForm from './termform';
import AutoPolicyForm from './autoform';

const AutoPolicy1 = () => {
  const [policyInfo, setPolicyInfo] = useState(null);
  const [premiumResult, setPremiumResult] = useState('');
  const [navigateToTermForm, setNavigateToTermForm] = useState(false);
  const [vehicleValue, setVehicleValue] = useState('');
  const [coverageType, setCoverageType] = useState('BASIC');
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    const fetchPolicyInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8001/policies/1');
        setPolicyInfo(response.data);
      } catch (error) {
        console.error('Error fetching policy information:', error);
      }
    };

    fetchPolicyInfo();
  }, []);

  const validateVehicleValue = (value) => {
    if (value < 30000) {
      return "Vehicle value must be more than ₹30,000.";
    }
    if (value % 100 !== 0) {
      return "Vehicle value must end with '00'.";
    }
    return "";
  };

  const calculatePremium = () => {
    const validationMessage = validateVehicleValue(parseFloat(vehicleValue));
    const paymentFrequency = document.getElementById('paymentFrequency').value;
    setValidationMessage(validationMessage);
    if (validationMessage) {
      return;
    }

    let basePremium = 0;

    switch (coverageType) {
      case 'BASIC':
        basePremium = 5000;
        break;
      case 'STANDARD':
        basePremium = 15000;
        break;
      case 'COMPREHENSIVE':
        basePremium = 25000;
        break;
      default:
        break;
    }

    let adjustedPremium = basePremium;

    let frequencyMultiplier;
    switch (paymentFrequency) {
      case 'annually':
        frequencyMultiplier = 1;
        break;
      case 'half-yearly':
        frequencyMultiplier = 1 / 2;
        break;
      case 'quarterly':
        frequencyMultiplier = 1 / 4;
        break;
      case 'monthly':
        frequencyMultiplier = 1 / 12;
        break;
    }

    const finalPremium = adjustedPremium * frequencyMultiplier;
    setPremiumResult(finalPremium);
  };

  const handleSave = () => {
    const dataToSave = {
      coverage: 0,
      term: 0, // Placeholder, you need to replace it with the actual term value
      premiumTerm: document.getElementById('paymentFrequency').value, // Placeholder, you need to replace it with the actual premium term value
      premium: premiumResult,
      premiumCount: 2,
      startDate: "2050-08-05",
      endDate: "2060-08-05",
      status: "pending",
      policy: { policyId: 1 },
    };

    axios.post('http://localhost:8001/user-policies/create', dataToSave)
      .then(response => {
        console.log('Data saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };

  const handleNavigateToTermForm = () => {
    setNavigateToTermForm(true);
  };

  if (!policyInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {navigateToTermForm ? (
        <AutoPolicyForm />
      ) : (
        <div>
          <h2>{policyInfo.policyName}</h2>
          <p>{policyInfo.policyDescription}</p>
          <p>{policyInfo.termsAndConditons}</p>
          <div className="container">
            <h1 className="text-center my-4">Auto Insurance Premium Calculator</h1>
            <form>
              <div className="form-group">
                <label htmlFor="vehicleValue">Vehicle Value (₹)</label>
                <input type="number" className="form-control" id="vehicleValue" value={vehicleValue} onChange={(e) => setVehicleValue(e.target.value)} required />
                <div className="error-message">{validationMessage}</div>
              </div>
              <div className="form-group">
                <label htmlFor="coverageType">Coverage Type</label>
                <select className="form-control" id="coverageType" value={coverageType} onChange={(e) => setCoverageType(e.target.value)} required>
                  <option value="BASIC">Basic</option>
                  <option value="STANDARD">Standard</option>
                  <option value="COMPREHENSIVE">Comprehensive</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="paymentFrequency">Payment Frequency:</label>
                <select className="form-control" id="paymentFrequency" name="paymentFrequency">
                  <option value="annually">Annually</option>
                  <option value="half-yearly">Half-Yearly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={calculatePremium}>Calculate Premium</button>
            </form>
            <div className="mt-4 p-3 bg-secondary text-white rounded">{premiumResult}</div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleNavigateToTermForm}>Go to Term Form</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoPolicy1;
