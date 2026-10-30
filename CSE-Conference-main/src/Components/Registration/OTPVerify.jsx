import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OTPVerify() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    alert('Phone verified!');
    navigate('/registration');
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
