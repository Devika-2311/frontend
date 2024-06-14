// TermPolicyDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TermPolicyForm from './termform';

const TermPolicyDetails = () => {
  const [policyInfo, setPolicyInfo] = useState(null);
  const [premiumResult, setPremiumResult] = useState('');
  const [navigateToTermForm, setNavigateToTermForm] = useState(false);

  useEffect(() => {
    const fetchPolicyInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8001/policies/2');
        setPolicyInfo(response.data);
      } catch (error) {
        console.error('Error fetching policy information:', error);
      }
    };

    fetchPolicyInfo();
  }, []);

  const calculatePremium = () => {
    const sumAssured = parseFloat(document.getElementById('sumAssured').value);
    const baseRate = 0.001;
    const age = parseInt(document.getElementById('age').value);
    const smoker = document.querySelector('input[name="smoker"]:checked').value === 'true';
    const occupation = document.querySelector('input[name="occupation"]:checked').value;
    const accidentalDeathBenefit = document.querySelector('input[name="accidentalDeathBenefit"]:checked').value === 'true';
    const criticalIllnessRider = document.querySelector('input[name="criticalIllnessRider"]:checked').value === 'true';
    const waiverOfPremium = document.querySelector('input[name="waiverOfPremium"]:checked').value === 'true';
    const paymentFrequency = document.getElementById('paymentFrequency').value;

    const basePremium = sumAssured * baseRate;
    const ageFactor = age > 45 ? 0.25 : 0.10;
    const healthFactor = smoker ? 0.20 : 0.10;
    const occupationFactor = occupation === 'high' ? 0.15 : 0.05;

    let adjustedPremium = basePremium + (basePremium * ageFactor) + (basePremium * healthFactor) + (basePremium * occupationFactor);

    if (accidentalDeathBenefit) adjustedPremium += 2000;
    if (criticalIllnessRider) adjustedPremium += 3000;
    if (waiverOfPremium) adjustedPremium += 1000;

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
    const frequencyText = {
      'annually': 'Annual',
      'half-yearly': 'Half-Yearly',
      'quarterly': 'Quarterly',
      'monthly': 'Monthly'
    }[paymentFrequency];

    setPremiumResult(finalPremium);
  };

  const handleSave = () => {
    const dataToSave = {
      coverage: parseFloat(document.getElementById('sumAssured').value),
      term: parseInt(document.getElementById('termLength').value),
      premiumTerm: document.getElementById('paymentFrequency').value,
      premium: premiumResult,
      premiumCount: 2,
      startDate: "2050-08-05",
      endDate: "2060-08-05",
      status: "pending",
      policy: { policyId: 2 },
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
        <TermPolicyForm />
      ) : (
        <div>
          <h2>{policyInfo.policyName}</h2>
          <p>{policyInfo.policyDescription}</p>
          <p>{policyInfo.termsAndConditons}</p>
          <div className="container">
            <h1 className="text-center my-4">Term Life Insurance Calculator</h1>
            <form id="insuranceForm" className="border p-4 rounded bg-light">
              <div className="form-group">
                <label htmlFor="sumAssured">Sum Assured (₹):</label>
                <select className="form-control" id="sumAssured" name="sumAssured">
                  <option value="2500000">₹25 lakh</option>
                  <option value="5000000">₹50 lakh</option>
                  <option value="10000000">₹1 crore</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input type="number" className="form-control" id="age" name="age" required />
              </div>

              <div className="form-group">
                <label htmlFor="smoker">Smoker:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="smokerYes" name="smoker" value="true" className="form-check-input" />
                    <label htmlFor="smokerYes" className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="smokerNo" name="smoker" value="false" className="form-check-input" checked />
                    <label htmlFor="smokerNo" className="form-check-label">No</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="occupation">Occupation:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="normalRisk" name="occupation" value="normal" className="form-check-input" checked />
                    <label htmlFor="normalRisk" className="form-check-label">Normal Risk</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="highRisk" name="occupation" value="high" className="form-check-input" />
                    <label htmlFor="highRisk" className="form-check-label">High Risk</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="termLength">Term Length (years):</label>
                <input type="number" className="form-control" id="termLength" name="termLength" required />
              </div>

              <div className="form-group">
                <label htmlFor="accidentalDeathBenefit">Accidental Death Benefit:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="adbYes" name="accidentalDeathBenefit" value="true" className="form-check-input" />
                    <label htmlFor="adbYes" className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="adbNo" name="accidentalDeathBenefit" value="false" className="form-check-input" checked />
                    <label htmlFor="adbNo" className="form-check-label">No</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="criticalIllnessRider">Critical Illness Rider:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="cirYes" name="criticalIllnessRider" value="true" className="form-check-input" />
                    <label htmlFor="cirYes" className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="cirNo" name="criticalIllnessRider" value="false" className="form-check-input" checked />
                    <label htmlFor="cirNo" className="form-check-label">No</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="waiverOfPremium">Waiver of Premium:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="wopYes" name="waiverOfPremium" value="true" className="form-check-input" />
                    <label htmlFor="wopYes" className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" id="wopNo" name="waiverOfPremium" value="false" className="form-check-input" checked />
                    <label htmlFor="wopNo" className="form-check-label">No</label>
                  </div>
                </div>
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

export default TermPolicyDetails;
