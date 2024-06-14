// PolicyNav.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AutoPolicyDetails from './autopolicy';
import TermPolicyDetails from './termpolicy';

const PolicyNav1 = () => {
    const navigate = useNavigate();
    const handleAuto = () => {
        // Implement payment processing logic here
        navigate('/autopolicy');
    };
    const handleTerm = () => {
        // Implement payment processing logic here
        navigate('/termpolicy');
    };
  return (
    <div>
        <button type="button" id="auto" onClick={handleAuto}>auto</button>
        <button type="button" id="term" onClick={handleTerm}>auto</button>
    </div>
    
  );
};

export default PolicyNav1;
