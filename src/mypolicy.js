import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPolicyDetails = ({ userId }) => {
  const [userPolicies, setUserPolicies] = useState([]);

  useEffect(() => {
    const fetchUserPolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/user-policies/user`);
        setUserPolicies(response.data);
      } catch (error) {
        console.error('Error fetching user policies:', error);
      }
    };

    fetchUserPolicies();
  }, []);

  return (
    <div>
      <h2>User Policies</h2>
      <table>
        <thead>
          <tr>
            <th>User Policy ID</th>
            <th>Coverage</th>
            <th>Term</th>
            <th>Premium</th>
            <th>Premium Term</th>
            <th>Premium count</th>
            <th>startDate</th>
            <th>endDate</th>
            <th>status</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {userPolicies.map(policy => (
            <tr key={policy.userPolicyId}>
              <td>{policy.userPolicyId}</td>
              <td>{policy.coverage}</td>
              <td>{policy.term}</td>
              <td>{policy.premium}</td>
              <td>{policy.premiumTerm}</td>
              <td>{policy.premiumCount}</td>
              <td>{policy.startDate}</td>
              <td>{policy.endDate}</td>
              <td>{policy.status}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPolicyDetails;
