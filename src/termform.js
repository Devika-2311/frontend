import React, { useState } from 'react';

const TermPolicyForm = () => {
    const [annualIncome, setAnnualIncome] = useState('');
    const [anyDisease, setAnyDisease] = useState(false);
    const [nomineeName, setNomineeName] = useState('');
    const [nomineeRelation, setNomineeRelation] = useState('');
    const [nomineeEmail, setNomineeEmail] = useState('');
    const [nomineeProof, setNomineeProof] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a JSON object with form data
        const formData = {
            annualIncome,
            anyDisease,
            nomineeName,
            nomineeRelation,
            nomineeEmail,
            nomineeProof
        };

        try {
            const response = await fetch('http://localhost:8001/term-policies/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Check if request was successful
            if (response.ok) {
                alert('Term policy created successfully!');
                // Reset form fields after successful submission
                setAnnualIncome('');
                setAnyDisease(false);
                setNomineeName('');
                setNomineeRelation('');
                setNomineeEmail('');
                setNomineeProof('');
            } else {
                alert('Failed to create term policy. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    const handleHomeClick = () => {
        window.location.href = './parent';
    };

    return (
        <div>
             <button onClick={handleHomeClick}>Home</button>
            <h2>Create Term Policy</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Annual Income:</label>
                    <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} required />
                </div>
                <div>
                    <label>Any Disease:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="true"
                                checked={anyDisease === true}
                                onChange={(e) => setAnyDisease(true)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="false"
                                checked={anyDisease === false}
                                onChange={(e) => setAnyDisease(false)}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <label>Nominee Name:</label>
                    <input type="text" value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} required />
                </div>
                <div>
                    <label>Nominee Relation:</label>
                    <input type="text" value={nomineeRelation} onChange={(e) => setNomineeRelation(e.target.value)} required />
                </div>
                <div>
                    <label>Nominee Email:</label>
                    <input type="email" value={nomineeEmail} onChange={(e) => setNomineeEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Nominee Proof:</label>
                    <input type="text" value={nomineeProof} onChange={(e) => setNomineeProof(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default TermPolicyForm;
