import React from 'react';
import PolicyComponent4 from './parent';

const Dashboard = ({ onNavigate }) => {
    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={() => onNavigate('userpolicy')}>My Policy</button>
            <button onClick={() => onNavigate('policynav')}>Policy Component</button>
        </div>
    );
};

export default Dashboard;
