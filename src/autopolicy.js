// AutoPolicyDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AutoPolicyDetails = () => {
  const [policyInfo, setPolicyInfo] = useState(null);

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

  if (!policyInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{policyInfo.policyName}</h2>
      <p>{policyInfo.policyDescription}</p>
      <p>{policyInfo.termsAndConditons}</p>
    </div>
  );
};

export default AutoPolicyDetails;
