import React, { useState } from 'react';
import axios from 'axios';

const PolicyComponent = () => {
  const [policyInfo, setPolicyInfo] = useState(null);

  const fetchPolicyInfo = async (policyId) => {
    try {
      const response = await axios.get(`http://localhost:8001/policies/${policyId}`);
      setPolicyInfo(response.data);
    } catch (error) {
      console.error('Error fetching policy information:', error);
    }
  };

  return (
    <div>
      <button onClick={() => fetchPolicyInfo(1)}>Auto Policy</button>
      <button onClick={() => fetchPolicyInfo(2)}>Term Policy</button>
      {policyInfo && (
        <div>
          <h2>{policyInfo.policyName}</h2>
          <p>{policyInfo.policyDescription}</p>
          <p>{policyInfo.termsAndConditons}</p>
        </div>
      )}
    </div>
  );
};

export default PolicyComponent;
