import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/send-otp", { email: form.email });
      setOtpSent(true);
      alert("OTP sent to email");
    } catch {
      alert("Failed to send OTP");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/signup", form);
      alert("Signup successful");
    } catch (err) {
      alert("Signup failed: " + err.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      {["name", "email", "password", "phone", "otp"].map((key) => (
        <input
          key={key}
          type={key === "password" ? "password" : "text"}
          placeholder={key}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full p-2 border mb-2 rounded"
          disabled={key === "otp" && !otpSent}
        />
      ))}
      {!otpSent && <button onClick={sendOtp} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Send OTP</button>}
      <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2 rounded">Signup</button>
    </div>
  );
}
