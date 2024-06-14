import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TermPolicyForm from './termform';



const PolicyComponent4 = () => {
  const [policyInfo, setPolicyInfo] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [premiumResult, setPremiumResult] = useState('');
  const [navigateToTermForm, setNavigateToTermForm] = useState(false);
  
  const fetchPolicyInfo = async (policyId) => {
    try {
      const response = await axios.get(`http://localhost:8001/policies/${policyId}`);
      setPolicyInfo(response.data);
      // Show calculator only when Term Policy is clicked
      if (policyId === 2) {
        setShowCalculator(true);
      } else {
        setShowCalculator(false);
      }
    } catch (error) {
      console.error('Error fetching policy information:', error);
    }
  };

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

    // Calculate base premium
    const basePremium = sumAssured * baseRate;
    const ageFactor = age > 45 ? 0.25 : 0.10;
    const healthFactor = smoker ? 0.20 : 0.10;
    const occupationFactor = occupation === 'high' ? 0.15 : 0.05;

    let adjustedPremium = basePremium + (basePremium * ageFactor) + (basePremium * healthFactor) + (basePremium * occupationFactor);

    // Add riders
    if (accidentalDeathBenefit) adjustedPremium += 2000;
    if (criticalIllnessRider) adjustedPremium += 3000;
    if (waiverOfPremium) adjustedPremium += 1000;

    // Calculate premium based on payment frequency
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
 // Example premium calculation result
 const calculatedResult = finalPremium; // Replace this with your actual premium calculation result

 // Update the premium result state
 setPremiumResult(calculatedResult);
    
  };
  const handleSave = () => {
    // Prepare the data to be saved
    const dataToSave = {
      coverage: parseFloat(document.getElementById('sumAssured').value),
      term: parseInt(document.getElementById('termLength').value),
      premiumTerm: document.getElementById('paymentFrequency').value,
      premium: premiumResult, 
      premiumCount:2,
      startDate:"2050-08-05",
      endDate:"2060-08-05",
      status:"pending",
      // Update this with your actual premium calculation result
      policy: { policyId: 2 },
    //   user:{userId:2}, // Set policy id as 2
    };

    // Call your backend API to save the data
    axios.post('http://localhost:8001/user-policies/create', dataToSave)
      .then(response => {
        console.log('Data saved successfully:', response.data);
        console.log(dataToSave);
    
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };
  const handleNavigateToTermForm = () => {
    setNavigateToTermForm(true); // Set state to indicate navigation
  };

  return (
    <div>
    {navigateToTermForm ? (
      <TermPolicyForm /> // Render TermFormComponent if state is true
    ) : (
      <div>
        <div>
        <button onClick={() => fetchPolicyInfo(1)}>Auto Policy</button>
        <button onClick={() => fetchPolicyInfo(2)}>Term Policy</button>
      </div>
      {policyInfo && (
        <div>
          <h2>{policyInfo.policyName}</h2>
          <p>{policyInfo.policyDescription}</p>
          <p>{policyInfo.termsAndConditons}</p>
          {showCalculator && (
            <div className="container">
              <h1 className="text-center my-4">Term Life Insurance Calculator</h1>
              <form id="insuranceForm" className="border p-4 rounded bg-light">
              <div class="form-group">
                <label for="sumAssured">Sum Assured (₹):</label>
                <select class="form-control" id="sumAssured" name="sumAssured">
                    <option value="2500000">₹25 lakh</option>
                    <option value="5000000">₹50 lakh</option>
                    <option value="10000000">₹1 crore</option>
                </select>
            </div>

           
            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" class="form-control" id="age" name="age" required/>
            </div>

            

            <div class="form-group">
                <label for="smoker">Smoker:</label>
                <div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="smokerYes" name="smoker" value="true" class="form-check-input"/>
                        <label for="smokerYes" class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="smokerNo" name="smoker" value="false" class="form-check-input" checked/>
                        <label for="smokerNo" class="form-check-label">No</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="occupation">Occupation:</label>
                <div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="normalRisk" name="occupation" value="normal" class="form-check-input" checked/>
                        <label for="normalRisk" class="form-check-label">Normal Risk</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="highRisk" name="occupation" value="high" class="form-check-input"/>
                        <label for="highRisk" class="form-check-label">High Risk</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="termLength">Term Length (years):</label>
                <input type="number" class="form-control" id="termLength" name="termLength" required/>
            </div>

            <div class="form-group">
                <label for="accidentalDeathBenefit">Accidental Death Benefit:</label>
                <div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="adbYes" name="accidentalDeathBenefit" value="true" class="form-check-input"/>
                        <label for="adbYes" class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="adbNo" name="accidentalDeathBenefit" value="false" class="form-check-input" checked/>
                        <label for="adbNo" class="form-check-label">No</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="criticalIllnessRider">Critical Illness Rider:</label>
                <div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="cirYes" name="criticalIllnessRider" value="true" class="form-check-input"/>
                        <label for="cirYes" class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="cirNo" name="criticalIllnessRider" value="false" class="form-check-input" checked/>
                        <label for="cirNo" class="form-check-label">No</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="waiverOfPremium">Waiver of Premium:</label>
                <div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="wopYes" name="waiverOfPremium" value="true" class="form-check-input"/>
                        <label for="wopYes" class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="wopNo" name="waiverOfPremium" value="false" class="form-check-input" checked/>
                        <label for="wopNo" class="form-check-label">No</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="paymentFrequency">Payment Frequency:</label>
                <select class="form-control" id="paymentFrequency" name="paymentFrequency">
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
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

 

export default PolicyComponent4;

  

 