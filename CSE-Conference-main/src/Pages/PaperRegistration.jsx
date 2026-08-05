import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { paymentQr } from '../assets';
import { 
  FileText, 
  UploadCloud, 
  Link2, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const aiTopics = [
  "Machine Learning and Deep Learning",
  "Large Language Models and Transformers",
  "AI Algorithms and Architectures",
  "Reinforcement Learning and Autonomous Systems",
  "Generative, Responsive, and Explainable AI",
  "Automated Code Generation and Algorithm Optimization",
  "Information Theory for AI",
  "Statistical Learning Theory in AI",
  "Graphical Models and Probabilistic Inference",
  "Representation Learning and Feature Engineering",
  "Human-Machine Interaction and Data Capturing Techniques",
  "AI Model Optimization and Efficiency",
  "Bias, Fairness, and Ethics in AI Models",
  "AI-Powered Cloud Resource Allocation",
  "Natural Language Processing and Speech Recognition",
  "Computer Vision and Image Processing"
];

const aiApplicationsTopics = [
  "AI in Healthcare and Medicine",
  "AI in Supply Chain Management and Automation",
  "AI in Financial Systems and FinTech",
  "AI and the Internet of Things (IoT)",
  "AI in Cybersecurity and Privacy",
  "AI in Education and Intelligent Learning Systems",
  "AI in Robotics and Autonomous Systems",
  "AI in Manufacturing and Industry 4.0",
  "AI in Blockchain and Decentralized Systems"
];

const secureDataAnalyticsTopics = [
  "Encryption Methods for Data Analysis",
  "Applications of Data Analytics in Security Domains",
  "Data Analytics for Security Attacks and Defenses",
  "Secure Social Network Analysis and Mining",
  "Stream Data Analytics for Cybersecurity",
  "Privacy in Big Data Management and Analytics",
  "Security Issues in Supply Chain Analytics",
  "Security Issues in Computer Vision and Video Analytics",
  "Privacy-Preserving Big Data Analytics",
  "Network and Information Security Using Data Analytics",
  "Fraud Detection and Risk Management",
  "Threat Intelligence and Incident Response",
  "Blockchain and Data Security",
  "Privacy, Surveillance, and AI Ethics",
  "Secure Software Development",
  "Leveraging AI for Enhanced Cybersecurity",
  "Advances in Data Science and Analytics"
];

const secureCommunicationsTopics = [
  "Secure Edge and Fog Computing",
  "High-Performance Secure Computing Systems",
  "Pervasive and Mobile Computing",
  "Secure Wireless Communication",
  "Network Protocols and Congestion Control",
  "Secure Vehicular Networks and Communication",
  "Intelligent Sensors and Sensor Networks",
  "Blockchain for Secure Communication",
  "Multimedia Processing and Communication",
  "Ad Hoc, PAN, and Mesh Networks",
  "Communication Challenges in IoT and Resource-Constrained Devices",
  "Network Function Virtualization and Software-Defined Networking"
];

const sustainableEmergingTopics = [
  "AI for Sustainable Development",
  "AI for Social Good and Sustainable Development",
  "AI in Smart Agriculture",
  "AI in Smart Cities and Urban Planning",
  "AI in Environmental Monitoring and Climate Science",
  "AI in Energy Management and Smart Grids",
  "AI in Digital Governance and E-Governance",
  "Sustainable Communication and Computing",
  "Networking and Computing for Sustainability, Society, and Development",
  "AI and Emerging Technologies",
  "Prompt and Cognitive Computing",
  "Quantum Computing, Quantum Machine Learning and Quantum Algorithms",
  "Quantum Communication and Cryptography",
  "Secure Next-Generation Networks",
  "Agentic AI and Intelligent Agents"
];

const getFee = (type, category) => {
  if (type === "Presenter - Full Paper") {
    if (category === "Scholars and Students") return { inr: "₹8,000", usd: "$100" };
    if (category === "Academicians") return { inr: "₹9,000", usd: "$125" };
    if (category === "Industry and R&D") return { inr: "₹10,000", usd: "$150" };
  } else if (type === "Presenter - Abstract Only") {
    if (category === "Academicians") return { inr: "₹3,000", usd: "$75" };
    if (category === "Scholars") return { inr: "₹2,500", usd: "$60" };
    if (category === "PG and UG Students") return { inr: "₹2,000", usd: "$50" };
  } else if (type === "Listener") {
    if (category === "Co-authors, Scholars, and others") return { inr: "₹2,000", usd: "$40" };
    if (category === "UG and PG students") return { inr: "₹1,000", usd: "$25" };
  }
  return null;
};

const getCategoriesForType = (type) => {
  if (type === "Presenter - Full Paper") {
    return ["Scholars and Students", "Academicians", "Industry and R&D"];
  }
  if (type === "Presenter - Abstract Only") {
    return ["Academicians", "Scholars", "PG and UG Students"];
  }
  if (type === "Listener") {
    return ["Co-authors, Scholars, and others", "UG and PG students"];
  }
  return [];
};

export default function PaperRegistration() {
  const [domain, setDomain] = useState('');
  const [topic, setTopic] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paperSource, setPaperSource] = useState('file'); // 'file' or 'link'
  const [customDomain, setCustomDomain] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [registrationType, setRegistrationType] = useState('');
  const [participantRegion, setParticipantRegion] = useState('Indian'); // 'Indian' or 'International'

  const [form, setForm] = useState({
    paperTitle: '',
    author: '',
    email: '',
    designation: '',
    contactNo: '',
    modeOfParticipation: '',
    googleDriveLink: '',
    paperFile: null,
    modeOfPayment: '',
    utrNo: '',
    dateOfTransfer: '',
    paymentProof: null,
  });

  const navigate = useNavigate();
  const [showQr, setShowQr] = useState(false);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'paymentProof') {
      const file = files[0];
      const maxSizeMB = 1;
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!file) return;

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, or PDF files are allowed for payment proof.');
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Payment proof file size must be less than ${maxSizeMB}MB.`);
        return;
      }

      setForm((prev) => ({ ...prev, paymentProof: file }));
    } else if (name === 'paperFile') {
      const file = files[0];
      const maxSizeMB = 5;
      const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!file) return;

      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF or Word (.doc, .docx) files are allowed for the paper.');
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Paper file size must be less than ${maxSizeMB}MB.`);
        return;
      }

      setForm((prev) => ({ ...prev, paperFile: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Helper to upload a file to Supabase storage
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

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supabase) {
      alert('Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
      return;
    }

    if (!domain || (domain === 'Others' && !customDomain)) {
      alert('Please select or specify a domain.');
      return;
    }

    if (domain !== 'Others' && !topic) {
      alert('Please select a topic.');
      return;
    }

    if (domain === 'Others' && !customTopic) {
      alert('Please specify a topic.');
      return;
    }

    if (paperSource === 'file' && !form.paperFile) {
      alert('Please upload your paper file.');
      return;
    }

    if (paperSource === 'link' && !form.googleDriveLink) {
      alert('Please provide a Google Drive link for your paper.');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload Payment Proof
      let paymentProofURL = null;
      if (form.paymentProof) {
        paymentProofURL = await uploadToSupabase(
          form.paymentProof,
          'conference-files',
          'payment_proofs'
        );
      }

      // 2. Upload Paper File (if file source selected)
      let paperFileURL = null;
      if (paperSource === 'file' && form.paperFile) {
        paperFileURL = await uploadToSupabase(
          form.paperFile,
          'conference-files',
          'papers'
        );
      } else if (paperSource === 'link') {
        paperFileURL = form.googleDriveLink;
      }

      // 3. Store metadata in Supabase Table
      const { data, error } = await supabase
        .from('paper_submissions')
        .insert([
          {
            paper_title: form.paperTitle,
            author: form.author,
            email: form.email,
            designation: form.designation,
            contact_no: form.contactNo,
            mode_of_participation: form.modeOfParticipation,
            domain: domain === 'Others' ? customDomain : domain,
            topic: domain === 'Others' ? customTopic : topic,
            submission_type: paperSource,
            file_url: paperFileURL,
            payment_proof_url: paymentProofURL,
            mode_of_payment: form.modeOfPayment,
            utr_no: form.utrNo,
            date_of_transfer: form.dateOfTransfer,
            status: 'pending'
          }
        ]);

      if (error) {
        throw error;
      }

      setSuccessMessage('✅ Paper registration and files submitted successfully!');
      alert('Paper registration and files submitted successfully!');
      navigate('/registration');
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(`Something went wrong during submission: ${error.message || JSON.stringify(error)}\n\nPlease check your Supabase credentials/configuration and try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center mt-20 items-center w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-4xl border border-slate-100 mt-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            ICAISDA 2026
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Paper Registration & Payment
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
            Submit your research details, upload your manuscript, and provide proof of transfer to complete your registration.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-semibold text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            {successMessage}
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* SECTION 1: AUTHORS & PAPER INFO */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800">Paper & Author Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Paper Title <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="paperTitle"
                  placeholder="Enter full paper title"
                  value={form.paperTitle}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Author Name <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="author"
                  placeholder="Primary presenter's name"
                  value={form.author}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Author Email <span className='text-red-500'>*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="author@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Registration Type <span className='text-red-500'>*</span></label>
                <select
                  value={registrationType}
                  onChange={(e) => {
                    setRegistrationType(e.target.value);
                    setForm(prev => ({ ...prev, designation: '' }));
                  }}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                >
                  <option value="">Select Registration Type</option>
                  <option value="Presenter - Full Paper">Presenter - Full Paper Publication</option>
                  <option value="Presenter - Abstract Only">Presenter - Abstract Only</option>
                  <option value="Listener">Listener</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Category <span className='text-red-500'>*</span></label>
                <select
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  required
                  disabled={!registrationType}
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850 disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value="">Select Category</option>
                  {getCategoriesForType(registrationType).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Nationality / Region <span className='text-red-500'>*</span></label>
                <select
                  value={participantRegion}
                  onChange={(e) => setParticipantRegion(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                >
                  <option value="Indian">Indian Participant (INR)</option>
                  <option value="International">International Participant (USD)</option>
                </select>
              </div>

              {getFee(registrationType, form.designation) && (
                <div className="md:col-span-2 bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-sm font-semibold text-blue-900 animate-fadeIn">
                  <span>Applicable Registration Fee:</span>
                  <div className="flex flex-wrap gap-3">
                    {participantRegion === 'Indian' ? (
                      <span className="bg-blue-100/80 text-blue-800 px-4 py-2 rounded-xl border border-blue-200 text-base font-bold">
                        🇮🇳 India: {getFee(registrationType, form.designation).inr}
                      </span>
                    ) : (
                      <span className="bg-indigo-100/80 text-indigo-800 px-4 py-2 rounded-xl border border-indigo-200 text-base font-bold">
                        🌐 Others: {getFee(registrationType, form.designation).usd}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Contact No. <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="contactNo"
                  placeholder="e.g. +91 9876543210"
                  value={form.contactNo}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Mode of Participation <span className='text-red-500'>*</span></label>
                <select
                  name="modeOfParticipation"
                  value={form.modeOfParticipation}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                >
                  <option value="">Select Mode</option>
                  <option value="IN PERSON">IN PERSON (Preferred)</option>
                  <option value="ONLINE MODE">ONLINE MODE</option>
                </select>
              </div>
            </div>

            {/* Domain and Topic Selection */}
            <div className="space-y-4 pt-4">
              <label className="text-sm font-semibold text-slate-700 block">Research Domain <span className='text-red-500'>*</span></label>
              <div className="flex flex-wrap gap-3">
                {[
                  "Artificial Intelligence",
                  "AI Applications in Industry and Society",
                  "Secure Data Analytics",
                  "Secure Communications and Computing",
                  "Sustainable Development and Emerging Technologies",
                  "Others"
                ].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDomain(d);
                      setTopic('');
                      setCustomDomain('');
                      setCustomTopic('');
                    }}
                    className={`px-5 py-2.5 rounded-xl font-medium transition text-sm ${
                      domain === d
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {domain && domain !== 'Others' && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700">Select Topic <span className='text-red-500'>*</span></label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                >
                  <option value="">Select a Topic</option>
                  {(() => {
                    switch (domain) {
                      case 'Artificial Intelligence': return aiTopics;
                      case 'AI Applications in Industry and Society': return aiApplicationsTopics;
                      case 'Secure Data Analytics': return secureDataAnalyticsTopics;
                      case 'Secure Communications and Computing': return secureCommunicationsTopics;
                      case 'Sustainable Development and Emerging Technologies': return sustainableEmergingTopics;
                      default: return [];
                    }
                  })().map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}

            {domain === 'Others' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Specify Custom Domain <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter your custom research domain"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Specify Custom Topic <span className='text-red-500'>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter your custom topic"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: PAPER UPLOAD OPTIONS */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-800">Manuscript Submission</h2>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 block">Choose Submission Method:</label>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaperSource('file')}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-2xl transition hover:bg-slate-50 ${
                    paperSource === 'file' 
                      ? 'border-blue-500 bg-blue-50/55 ring-2 ring-blue-500/20' 
                      : 'border-slate-200'
                  }`}
                >
                  <UploadCloud className={`w-6 h-6 ${paperSource === 'file' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-xs md:text-sm font-bold text-slate-800">Upload PDF / Word</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaperSource('link')}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-2xl transition hover:bg-slate-50 ${
                    paperSource === 'link' 
                      ? 'border-blue-500 bg-blue-50/55 ring-2 ring-blue-500/20' 
                      : 'border-slate-200'
                  }`}
                >
                  <Link2 className={`w-6 h-6 ${paperSource === 'link' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-xs md:text-sm font-bold text-slate-800">Google Drive Link</span>
                </button>
              </div>

              {paperSource === 'file' ? (
                <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition relative">
                  <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600 font-medium">Click to select files or drag here</span>
                  <span className="text-xs text-slate-400 mt-1">Accepts PDF, DOC, or DOCX (Max size 5MB)</span>
                  <input
                    type="file"
                    name="paperFile"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {form.paperFile && (
                    <div className="mt-4 p-2 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Selected: {form.paperFile.name}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Google Drive Sharing Link <span className='text-red-500'>*</span></label>
                  <input
                    type="url"
                    name="googleDriveLink"
                    placeholder="https://drive.google.com/file/d/..."
                    value={form.googleDriveLink}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                  />
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    Please ensure the link permission is set to "Anyone with the link can view".
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: PAYMENT DETAILS */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-800">Payment & Bank Details</h2>
            </div>

            {/* Bank Info Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700 shadow-inner">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Bank Name</span>
                <span className="font-bold text-slate-800">CANARA BANK</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Branch Name</span>
                <span className="font-bold text-slate-800">Pondicherry Engineering College</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Account Name</span>
                <span className="font-bold text-slate-800">ICAISDA</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Account No.</span>
                <span className="font-bold text-slate-800">110259455262</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">IFSC Code</span>
                <span className="font-bold text-slate-800">CNRB0008441</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">MICR Code</span>
                <span className="font-bold text-slate-800">605015004</span>
              </div>
              {getFee(registrationType, form.designation) && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 shadow-sm animate-fadeIn col-span-1 md:col-span-2">
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block">Your Registration Fee Amount</span>
                  <div className="flex justify-center gap-6 text-2xl md:text-3xl font-black text-emerald-950">
                    {participantRegion === 'Indian' ? (
                      <span>🇮🇳 {getFee(registrationType, form.designation).inr} <span className="text-xs font-bold text-slate-400 block mt-1">(Indian Participant Rate)</span></span>
                    ) : (
                      <span>🌐 {getFee(registrationType, form.designation).usd} <span className="text-xs font-bold text-slate-400 block mt-1">(International Participant Rate)</span></span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-4 py-2">
              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition shadow-md"
              >
                {showQr ? "Hide Payment QR" : "Show Payment QR Code"}
              </button>

              {showQr && (
                <div className="p-4 bg-white border border-slate-200 rounded-3xl shadow-lg animate-fadeIn flex flex-col items-center">
                  <img
                    src={paymentQr}
                    alt="Payment QR"
                    className="w-48 h-48 md:w-60 md:h-60 object-contain"
                  />
                  <span className="text-xs text-slate-400 mt-2">Scan with GPay, PhonePe, or any UPI app</span>
                </div>
              )}
            </div>

            {/* Payment Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Mode of Payment <span className='text-red-500'>*</span></label>
                <select
                  name="modeOfPayment"
                  value={form.modeOfPayment}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                >
                  <option value="">Select Option</option>
                  <option value="GPAY">GPAY</option>
                  <option value="UPI">UPI</option>
                  <option value="BANK TRANSFER">BANK TRANSFER</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">UTR / Transaction No. <span className='text-red-500'>*</span></label>
                <input
                  type="text"
                  name="utrNo"
                  placeholder="Enter reference / transaction ID"
                  value={form.utrNo}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Date of Transfer <span className='text-red-500'>*</span></label>
                <input
                  type="date"
                  name="dateOfTransfer"
                  value={form.dateOfTransfer}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-850"
                />
                <span className="text-xs text-slate-400 block mt-1">Specify payment date (not submission date)</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Payment Proof File (JPG, PNG, PDF) <span className='text-red-500'>*</span></label>
                <input
                  type="file"
                  name="paymentProof"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
                <span className="text-xs text-slate-400 block mt-1">Upload receipt or screenshot (Max size 1MB)</span>
              </div>
            </div>
          </div>

          {/* Accommodation Disclaimer */}
          <div className="p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-900 rounded-r-xl space-y-1">
            <h3 className="font-bold text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Accommodation & Travel Details
            </h3>
            <p className="text-xs leading-relaxed text-amber-800">
              No TA (Travel Allowance) or DA (Daily Allowance) will be provided for attending or presenting at this conference. Outstation participants are required to make travel and accommodation arrangements at their own expense.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base ${
              loading
                ? 'bg-slate-350 cursor-not-allowed opacity-75 text-slate-500'
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white hover:scale-[1.01]'
            }`}
          >
            {loading ? 'Submitting Registration...' : '📩 Submit Registration & Paper'}
          </button>
        </form>
      </div>
    </div>
  );
}
