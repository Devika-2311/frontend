import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AutoPolicyDetails from './autopolicy';
import TermPolicyDetails from './termpolicy';
import AutoPolicy1 from './autopolicy1';

const PolicyNav = () => {
  // Initialize state to track the selected policy
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Function to handle click events on links
  const handlePolicySelect = (policy) => {
    // Update the selected policy state
    setSelectedPolicy(policy);
  };

  return (
    <Router>
      <div>
        <nav>
          {/* Conditionally render links based on whether a policy is selected or not */}
          {!selectedPolicy && (
            <>
              <Link to="/autopolicy" onClick={() => handlePolicySelect('autopolicy')}>Auto Policy</Link>
              <Link to="/termpolicy" onClick={() => handlePolicySelect('termpolicy')}>Term Policy</Link>
            </>
          )}
        </nav>
        <Routes>
          {/* Render AutoPolicyDetails component if Auto Policy is selected */}
          {selectedPolicy === 'autopolicy' && (
            <Route path="/autopolicy" element={<AutoPolicy1 />} />
          )}
          {/* Render TermPolicyDetails component if Term Policy is selected */}
          {selectedPolicy === 'termpolicy' && (
            <Route path="/termpolicy" element={<TermPolicyDetails />} />
          )}
        </Routes>
        {/* Redirect to the selected policy route if a policy is selected */}
        {selectedPolicy && <Navigate to={`/${selectedPolicy}`} replace />}
      </div>
    </Router>
  );
};

export default PolicyNav;
