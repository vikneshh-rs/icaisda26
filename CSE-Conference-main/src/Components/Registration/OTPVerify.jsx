import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OTPVerify() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const phone = localStorage.getItem('phone');
    try {
      await axios.post('http://localhost:5000/verify-otp', { phone, otp });
      alert('Phone verified!');
      navigate('/login');
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2>Verify OTP</h2>
      <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
      <button type="submit">Verify</button>
    </form>
  );
}

export default OTPVerify;
