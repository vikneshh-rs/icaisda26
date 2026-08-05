import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import listenerQr from '../assets/Images/hub.jpg';
import { 
  User,
  Phone,
  BookOpen,
  School,
  Briefcase,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  UploadCloud,
  FileText
} from 'lucide-react';

export default function ListenerRegistration() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [participantRegion, setParticipantRegion] = useState('Indian'); // 'Indian' or 'International'

  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    course: '',
    institution: '',
    department: '',
    year: '',
    paymentCategory: '',
    utrNo: '',
    paymentProof: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'paymentProof') {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit.');
        return;
      }
      setForm((prev) => ({ ...prev, paymentProof: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadToSupabase = async (file, bucketName, folderPath) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const fileName = `${Date.now()}_${uniqueId}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed to bucket ${bucketName}: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const getFeeAmount = () => {
    if (form.paymentCategory === 'Co-Authors, Scholars, and Others') {
      return participantRegion === 'Indian' ? '₹2,000' : '$40';
    }
    if (form.paymentCategory === 'UG and PG Students') {
      return participantRegion === 'Indian' ? '₹1,000' : '$25';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supabase) {
      alert('Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
      return;
    }

    if (!form.paymentProof) {
      alert('Please upload your payment proof.');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload Payment Proof
      let paymentProofURL = await uploadToSupabase(
        form.paymentProof,
        'conference-files',
        'listener_payment_proofs'
      );

      // 2. Insert into Supabase Table
      const { error } = await supabase
        .from('listener_registrations')
        .insert([
          {
            name: form.name,
            mobile_number: form.mobileNumber,
            course: form.course,
            institution: form.institution,
            department: form.department,
            year: form.year,
            payment_category: form.paymentCategory,
            utr_no: form.utrNo,
            payment_proof_url: paymentProofURL,
            region: participantRegion
          }
        ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(`Something went wrong during submission: ${error.message || JSON.stringify(error)}\n\nPlease try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center mt-20 items-center w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-4xl border border-slate-100 mt-10">
        
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-6 animate-fadeIn">
            {/* Animated SVG Checkmark */}
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center shadow-lg border border-emerald-100">
              <svg className="w-16 h-16 text-emerald-500" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            
            <style>
              {`
                .checkmark__circle {
                  stroke-dasharray: 166;
                  stroke-dashoffset: 166;
                  stroke-width: 3;
                  stroke-miterlimit: 10;
                  stroke: #10b981;
                  fill: none;
                  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                }
                .checkmark__check {
                  transform-origin: 50% 50%;
                  stroke-dasharray: 48;
                  stroke-dashoffset: 48;
                  stroke-width: 4;
                  stroke-linecap: round;
                  stroke: #10b981;
                  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
                }
                @keyframes stroke {
                  100% {
                    stroke-dashoffset: 0;
                  }
                }
                .animate-fadeIn {
                  animation: fadeIn 0.8s ease-out forwards;
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}
            </style>

            <div className="space-y-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Registration Successful
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                You are all set!
              </h2>
              <p className="text-slate-555 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                Thank you, <span className="font-bold text-slate-800">{form.name}</span>. Your listener registration and payment proof (UTR: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs font-bold">{form.utrNo}</span>) have been received.
              </p>
            </div>

            <div className="py-4 px-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-200/50 rounded-2xl max-w-md w-full shadow-sm">
              <p className="text-emerald-700 font-extrabold text-lg md:text-xl tracking-wide animate-pulse">
                See you on 12th & 13th November 2026!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition duration-300 shadow-md text-sm animate-fadeIn"
              >
                Go to Homepage
              </button>
              <button
                onClick={() => navigate('/registration')}
                className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition duration-300 text-sm animate-fadeIn"
              >
                Back to Registration Options
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center space-y-3 mb-10">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                ICAISDA 2026
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Listener Registration
              </h1>
              <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
                Complete the form and provide proof of transfer to register as a conference listener.
              </p>
              <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full mt-4"></div>
            </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-semibold text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            {successMessage}
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* SECTION 1: PERSONAL & INSTITUTION DETAILS */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-800">Listener Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Full Name <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Mobile Number <span className='text-red-500'>*</span></label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter your phone number"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Course <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="course"
                  placeholder="e.g. B.Tech CSE, M.Sc, Ph.D"
                  value={form.course}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Department <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Computer Science & Engineering"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">College / Institution <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="institution"
                  placeholder="Enter college or institution name"
                  value={form.institution}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 md:col-span-1"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Year <span className='text-red-500'>*</span></label>
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                >
                  <option value="">Select Academic Year</option>
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                  <option value="IV Year">IV Year</option>
                  <option value="PG - I Year">PG - I Year</option>
                  <option value="PG - II Year">PG - II Year</option>
                  <option value="Research Scholar / Other">Research Scholar / Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: PAYMENT DETAILS */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-800">Payment Details (QR Code Only)</h2>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 py-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-inner">
              <span className="text-sm font-semibold text-slate-600 text-center">Scan the QR code below using any UPI app to pay:</span>
              <div className="p-4 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col items-center">
                <img
                  src={listenerQr}
                  alt="Payment QR"
                  className="w-48 h-48 md:w-60 md:h-60 object-contain"
                />
                <span className="text-xs font-bold text-slate-500 mt-2">UPI ID: 8441101051941@cnrb</span>
                <span className="text-xs text-slate-400 mt-0.5">THE HUB</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Nationality / Region <span className='text-red-500'>*</span></label>
                <select
                  value={participantRegion}
                  onChange={(e) => setParticipantRegion(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                >
                  <option value="Indian">Indian Participant (INR)</option>
                  <option value="International">International Participant (USD)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Category <span className='text-red-500'>*</span></label>
                <select
                  name="paymentCategory"
                  value={form.paymentCategory}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                >
                  <option value="">Select Category</option>
                  <option value="Co-Authors, Scholars, and Others">Co-Authors, Scholars, and Others</option>
                  <option value="UG and PG Students">UG and PG Students</option>
                </select>
              </div>
            </div>

            {getFeeAmount() && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 shadow-sm animate-fadeIn">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">Registration Fee Due</span>
                <div className="text-2xl md:text-3xl font-black text-emerald-950">
                  {getFeeAmount()}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">UTR / Transaction No. <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="utrNo"
                  placeholder="Enter 12-digit UTR/Transaction number"
                  value={form.utrNo}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Attach Payment Proof <span className='text-red-500'>*</span></label>
                <div className="p-3 border border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition relative">
                  <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs text-slate-600 font-medium">Click to select receipt (Max 5MB)</span>
                  <input
                    type="file"
                    name="paymentProof"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    required
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {form.paymentProof && (
                    <div className="mt-2 p-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Selected: {form.paymentProof.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition duration-300 shadow-lg hover:shadow-xl disabled:bg-emerald-300 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting Registration..." : "Submit Registration"}
            </button>
          </div>

        </form>
        </>
        )}
      </div>
    </div>
  );
}
