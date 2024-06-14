import React, { useState } from 'react';
import Dashboard from './dashboard';
import PolicyComponent2 from './policyterm';
import PolicyComponent3 from './policycomponent3';
import PolicyComponent4 from './parent';
import PolicyNav from './policynav';
import PolicyNav1 from './policynav1';
import UserPolicyDetails from './mypolicy';

const LoginComponent = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('emailId', emailId);
            formData.append('password', password);
            
            const response = await fetch('http://localhost:8001/users/login', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data === true) {
                setLoggedIn(true);
                if (response.data && response.data.sessionToken) {
                    const sessionToken = response.data.sessionToken;
                    localStorage.setItem('sessionToken', sessionToken);
                    console.log(sessionToken);
                }
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {loggedIn ? (
                currentPage === 'dashboard' ? (
                    <Dashboard onNavigate={handleNavigate} />
                ) :
                 currentPage === 'userpolicy' ? (
                    <UserPolicyDetails/>
                ) : currentPage === 'policynav' ? (
                   <PolicyNav/>
                ) : null
            ) : (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
            )}
        </div>
    );
};

export default LoginComponent;
