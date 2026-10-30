import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Lock, 
  FileText, 
  Users, 
  Download, 
  RefreshCw, 
  LogOut,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  Phone,
  Layers,
  CreditCard,
  Building,
  GraduationCap
} from 'lucide-react';

// Fee calculation helpers based on conference rules
export const getPaperFee = (paper) => {
  if (paper.amount) return paper.amount;
  const des = paper.designation?.trim();
  const subType = (paper.submission_type || '').toLowerCase();
  const isIntl = paper.region === 'International';

  // Abstract Only
  if (subType.includes('abstract') || des === 'Scholars') {
    if (des === 'Academicians') return isIntl ? '$75' : '₹3,000';
    if (des === 'Scholars') return isIntl ? '$60' : '₹2,500';
    if (des === 'PG and UG Students') return isIntl ? '$50' : '₹2,000';
    return isIntl ? '$60' : '₹2,500';
  }

  // Full Paper Presenter / Publisher
  if (des === 'Scholars and Students') return isIntl ? '$100' : '₹8,000';
  if (des === 'Academicians') return isIntl ? '$125' : '₹9,000';
  if (des === 'Industry and R&D') return isIntl ? '$150' : '₹10,000';

  // Default rate for conference papers
  return isIntl ? '$100' : '₹8,000';
};

export const getPaperRegisteredAs = (paper) => {
  const subType = (paper.submission_type || '').toLowerCase();
  const des = paper.designation?.trim() || '';

  if (subType.includes('abstract') || des === 'Scholars') {
    return 'Publisher (Abstract Only)';
  }
  return 'Publisher (Full Paper)';
};

export const getListenerFee = (listener) => {
  if (listener.amount) return listener.amount;
  const isIntl = listener.region === 'International';
  if (listener.payment_category === 'Co-Authors, Scholars, and Others') {
    return isIntl ? '$40' : '₹2,000';
  }
  if (listener.payment_category === 'UG and PG Students') {
    return isIntl ? '$25' : '₹1,000';
  }
  return isIntl ? '$25' : '₹1,000';
};

export const getListenerRegisteredAs = (listener) => {
  if (listener.payment_category) {
    return `Listener (${listener.payment_category})`;
  }
  return 'Listener';
};

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAdminAuthenticated') === 'true'
  );
  const [loginError, setLoginError] = useState('');
  
  // Data States
  const [papers, setPapers] = useState([]);
  const [listeners, setListeners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'papers', or 'listeners'
  const [searchTerm, setSearchTerm] = useState('');

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'DesignClubofPTU') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
  };

  // Fetch data from Supabase
  const fetchData = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      // Fetch paper submissions
      const { data: paperData, error: paperError } = await supabase
        .from('paper_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (paperError) throw paperError;
      setPapers(paperData || []);

      // Fetch listener registrations
      const { data: listenerData, error: listenerError } = await supabase
        .from('listener_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (listenerError) throw listenerError;
      setListeners(listenerData || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Handle Verify Payment toggle
  const handleVerifyPayment = async (paperId, newStatus = 'verified') => {
    if (!supabase) {
      alert('Database connection not available.');
      return;
    }
    setUpdatingId(paperId);
    try {
      const { error } = await supabase
        .from('paper_submissions')
        .update({ status: newStatus })
        .eq('id', paperId);

      if (error) throw error;

      // Optimistically update local papers state
      setPapers((prevPapers) =>
        prevPapers.map((p) =>
          p.id === paperId ? { ...p, status: newStatus } : p
        )
      );
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert(`Failed to update status in database: ${err.message || 'Unknown error'}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Unified registrations list (Paper Publishers + Listeners combined)
  const allRegistrations = useMemo(() => {
    const paperItems = papers.map(p => ({
      uniqueKey: `paper-${p.id}`,
      id: p.id,
      kind: 'paper',
      name: p.author || 'N/A',
      contactNumber: p.contact_no || 'N/A',
      paperTitle: p.paper_title || 'N/A',
      amountPaid: getPaperFee(p),
      registeredAs: getPaperRegisteredAs(p),
      paperId: p.paper_id || 'N/A',
      email: p.email || 'N/A',
      category: p.designation || 'N/A',
      domainTopic: `${p.domain || ''}${p.topic ? ' • ' + p.topic : ''}`,
      utrNo: p.utr_no || 'N/A',
      paymentProofUrl: p.payment_proof_url,
      status: p.status || 'pending',
      date: p.created_at,
      raw: p
    }));

    const listenerItems = listeners.map(l => ({
      uniqueKey: `listener-${l.id}`,
      id: l.id,
      kind: 'listener',
      name: l.name || 'N/A',
      contactNumber: l.mobile_number || 'N/A',
      paperTitle: 'N/A (Listener)',
      amountPaid: getListenerFee(l),
      registeredAs: getListenerRegisteredAs(l),
      paperId: '—',
      email: l.institution || 'N/A',
      category: l.payment_category || 'N/A',
      domainTopic: `${l.course || ''}${l.department ? ' • ' + l.department : ''}`,
      utrNo: l.utr_no || 'N/A',
      paymentProofUrl: l.payment_proof_url,
      status: 'verified', // Listeners don't have pending status column
      date: l.created_at,
      raw: l
    }));

    return [...paperItems, ...listenerItems].sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });
  }, [papers, listeners]);

  // Verified papers count
  const verifiedPapersCount = papers.filter(p => p.status === 'verified').length;

  // Filtered queries
  const term = searchTerm.toLowerCase().trim();

  const filteredAll = useMemo(() => {
    if (!term) return allRegistrations;
    return allRegistrations.filter(item => 
      item.name?.toLowerCase().includes(term) ||
      item.contactNumber?.toLowerCase().includes(term) ||
      item.paperTitle?.toLowerCase().includes(term) ||
      item.amountPaid?.toLowerCase().includes(term) ||
      item.registeredAs?.toLowerCase().includes(term) ||
      item.paperId?.toLowerCase().includes(term) ||
      item.category?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.domainTopic?.toLowerCase().includes(term) ||
      item.utrNo?.toLowerCase().includes(term) ||
      item.status?.toLowerCase().includes(term)
    );
  }, [allRegistrations, term]);

  const filteredPapers = useMemo(() => {
    if (!term) return papers;
    return papers.filter(p => {
      const amount = getPaperFee(p);
      const regAs = getPaperRegisteredAs(p);
      return (
        p.author?.toLowerCase().includes(term) ||
        p.contact_no?.includes(term) ||
        p.paper_title?.toLowerCase().includes(term) ||
        amount?.toLowerCase().includes(term) ||
        regAs?.toLowerCase().includes(term) ||
        p.paper_id?.toLowerCase().includes(term) ||
        p.email?.toLowerCase().includes(term) ||
        p.designation?.toLowerCase().includes(term) ||
        p.domain?.toLowerCase().includes(term) ||
        p.topic?.toLowerCase().includes(term) ||
        p.status?.toLowerCase().includes(term) ||
        p.utr_no?.toLowerCase().includes(term)
      );
    });
  }, [papers, term]);

  const filteredListeners = useMemo(() => {
    if (!term) return listeners;
    return listeners.filter(l => {
      const amount = getListenerFee(l);
      const regAs = getListenerRegisteredAs(l);
      return (
        l.name?.toLowerCase().includes(term) ||
        l.mobile_number?.includes(term) ||
        amount?.toLowerCase().includes(term) ||
        regAs?.toLowerCase().includes(term) ||
        l.institution?.toLowerCase().includes(term) ||
        l.course?.toLowerCase().includes(term) ||
        l.department?.toLowerCase().includes(term) ||
        l.payment_category?.toLowerCase().includes(term) ||
        l.utr_no?.toLowerCase().includes(term)
      );
    });
  }, [listeners, term]);

  // CSV Export with priority columns first
  const downloadCSV = (rows, filename) => {
    if (!rows || rows.length === 0) {
      alert('No data available to export.');
      return;
    }
    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];

    for (const row of rows) {
      const values = headers.map(header => {
        const val = row[header] ?? '';
        const escaped = ('' + val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvLines.push(values.join(','));
    }

    const blob = new Blob([csvLines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (activeTab === 'all') {
      const formatted = filteredAll.map(item => ({
        'Name': item.name,
        'Contact Number': item.contactNumber,
        'Paper Title': item.paperTitle,
        'How Much Paid': item.amountPaid,
        'Registered As': item.registeredAs,
        'Paper ID': item.paperId,
        'Category / Designation': item.category,
        'Email / Institution': item.email,
        'Domain / Topic / Dept': item.domainTopic,
        'UTR No.': item.utrNo,
        'Payment Status': item.status,
        'Payment Proof URL': item.paymentProofUrl || '',
        'Registration Date': item.date ? new Date(item.date).toLocaleString() : ''
      }));
      downloadCSV(formatted, 'all_registrations');
    } else if (activeTab === 'papers') {
      const formatted = filteredPapers.map(p => ({
        'Name': p.author || '',
        'Contact Number': p.contact_no || '',
        'Paper Title': p.paper_title || '',
        'How Much Paid': getPaperFee(p),
        'Registered As': getPaperRegisteredAs(p),
        'Paper ID': p.paper_id || '',
        'Email': p.email || '',
        'Category / Designation': p.designation || '',
        'Domain': p.domain || '',
        'Topic': p.topic || '',
        'Mode of Participation': p.mode_of_participation || '',
        'UTR No.': p.utr_no || '',
        'Payment Status': p.status || 'pending',
        'Date of Transfer': p.date_of_transfer || '',
        'Payment Proof URL': p.payment_proof_url || '',
        'Registration Date': p.created_at ? new Date(p.created_at).toLocaleString() : ''
      }));
      downloadCSV(formatted, 'paper_publishers_registrations');
    } else {
      const formatted = filteredListeners.map(l => ({
        'Name': l.name || '',
        'Contact Number': l.mobile_number || '',
        'Paper Title': 'N/A (Listener)',
        'How Much Paid': getListenerFee(l),
        'Registered As': getListenerRegisteredAs(l),
        'Course': l.course || '',
        'Institution': l.institution || '',
        'Department': l.department || '',
        'Year': l.year || '',
        'Payment Category': l.payment_category || '',
        'Region': l.region || '',
        'UTR No.': l.utr_no || '',
        'Payment Proof URL': l.payment_proof_url || '',
        'Registration Date': l.created_at ? new Date(l.created_at).toLocaleString() : ''
      }));
      downloadCSV(formatted, 'listener_registrations');
    }
  };

  // Helper badge renderer for "Registered As"
  const renderRegisteredBadge = (registeredAs) => {
    if (registeredAs.includes('Full Paper')) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          Publisher (Full Paper)
        </span>
      );
    }
    if (registeredAs.includes('Abstract')) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
          Publisher (Abstract)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
        {registeredAs}
      </span>
    );
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 px-4">
        <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-md w-full border border-white/20 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mx-auto border border-blue-400/30">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-wide">ICAISDA Admin Gate</h1>
            <p className="text-slate-400 text-sm">Please enter the security password to access the registration database.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-white/10 bg-white/5 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-center"
            />
            {loginError && <p className="text-rose-400 text-xs font-semibold">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-300 shadow-lg"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="w-full min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Control Panel</h1>
            <p className="text-slate-500 text-sm">Overview of registered attendees, paper publishers, and listener registrations.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData} 
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg transition shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Total Registrations</span>
              <h3 className="text-3xl font-black">{papers.length + listeners.length}</h3>
              <p className="text-xs text-slate-400">All registered attendees</p>
            </div>
            <Users className="w-10 h-10 text-white/30" />
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-blue-100 font-bold uppercase tracking-wider">Publishers / Papers</span>
              <h3 className="text-3xl font-black">{papers.length}</h3>
              <p className="text-xs text-blue-200">Authors &amp; research papers</p>
            </div>
            <FileText className="w-10 h-10 text-white/30" />
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-purple-100 font-bold uppercase tracking-wider">Listeners</span>
              <h3 className="text-3xl font-black">{listeners.length}</h3>
              <p className="text-xs text-purple-200">Attendee registrations</p>
            </div>
            <Users className="w-10 h-10 text-white/30" />
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-1.5">
              <span className="text-xs text-emerald-100 font-bold uppercase tracking-wider">Payments Verified</span>
              <h3 className="text-3xl font-black">{verifiedPapersCount}</h3>
              <p className="text-xs text-emerald-200">{papers.length - verifiedPapersCount} pending review</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-white/30" />
          </div>
        </div>

        {/* TABS & SEARCH BAR */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
            
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 max-w-md w-full">
              <button
                onClick={() => { setActiveTab('all'); setSearchTerm(''); }}
                className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-lg transition ${
                  activeTab === 'all' 
                    ? 'bg-white text-indigo-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All ({allRegistrations.length})
              </button>
              <button
                onClick={() => { setActiveTab('papers'); setSearchTerm(''); }}
                className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-lg transition ${
                  activeTab === 'papers' 
                    ? 'bg-white text-blue-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Publishers ({papers.length})
              </button>
              <button
                onClick={() => { setActiveTab('listeners'); setSearchTerm(''); }}
                className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-lg transition ${
                  activeTab === 'listeners' 
                    ? 'bg-white text-purple-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Listeners ({listeners.length})
              </button>
            </div>

            {/* Search and Export */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search name, phone, title, fee, role, UTR..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-md w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* TABLE SUMMARY NOTICE */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-1">
            <span className="font-semibold text-slate-700">Display Priority:</span>
            <span>Name, Contact Number, Paper Title, How Much Paid, and Registered As appear first.</span>
          </div>

          {/* DATA TABLES */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-inner">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-12 space-y-3">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-slate-400 text-sm font-semibold">Loading records...</span>
              </div>
            ) : activeTab === 'all' ? (
              /* --- ALL REGISTRATIONS VIEW --- */
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                    {/* PRIORITY COLUMNS FIRST */}
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100">1. Name</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100">2. Contact Number</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100 min-w-[240px]">3. Paper Title</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100 text-center">4. How Much Paid</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100 text-center">5. Registered As</th>
                    {/* OTHER COLUMNS */}
                    <th className="p-4">Paper ID</th>
                    <th className="p-4">Category / Role</th>
                    <th className="p-4">Email / Details</th>
                    <th className="p-4">UTR No.</th>
                    <th className="p-4 text-center">Payment Proof</th>
                    <th className="p-4 text-center">Payment Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
                  {filteredAll.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-slate-400 font-medium">No registrations match your search.</td>
                    </tr>
                  ) : (
                    filteredAll.map((item) => (
                      <tr key={item.uniqueKey} className="hover:bg-slate-50/70 transition-colors">
                        {/* 1. Name */}
                        <td className="p-4 font-bold text-slate-900 bg-blue-50/15 border-r border-slate-100">
                          {item.name}
                        </td>

                        {/* 2. Contact Number */}
                        <td className="p-4 bg-blue-50/15 border-r border-slate-100">
                          <a 
                            href={`tel:${item.contactNumber}`} 
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            {item.contactNumber}
                          </a>
                        </td>

                        {/* 3. Paper Title */}
                        <td className="p-4 bg-blue-50/15 border-r border-slate-100 max-w-xs">
                          {item.kind === 'paper' ? (
                            <span className="font-semibold text-slate-800 line-clamp-2" title={item.paperTitle}>
                              {item.paperTitle}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 italic bg-slate-100 px-2 py-0.5 rounded">
                              N/A (Listener)
                            </span>
                          )}
                        </td>

                        {/* 4. How Much Paid */}
                        <td className="p-4 text-center bg-blue-50/15 border-r border-slate-100">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                            <CreditCard className="w-3 h-3 text-emerald-600" />
                            {item.amountPaid}
                          </span>
                        </td>

                        {/* 5. Registered As */}
                        <td className="p-4 text-center bg-blue-50/15 border-r border-slate-100">
                          {renderRegisteredBadge(item.registeredAs)}
                        </td>

                        {/* OTHER COLUMNS */}
                        <td className="p-4 font-mono font-bold text-xs text-indigo-900">
                          {item.paperId}
                        </td>

                        <td className="p-4 text-xs font-medium text-slate-700">
                          {item.category}
                        </td>

                        <td className="p-4 text-xs">
                          <span className="block font-medium text-slate-800 truncate max-w-[200px]" title={item.email}>{item.email}</span>
                          <span className="block text-slate-400 truncate max-w-[200px]" title={item.domainTopic}>{item.domainTopic}</span>
                        </td>

                        <td className="p-4 font-mono text-xs text-slate-600">
                          {item.utrNo}
                        </td>

                        <td className="p-4 text-center">
                          {item.paymentProofUrl ? (
                            <a 
                              href={item.paymentProofUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline font-bold"
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-300">None</span>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {item.kind === 'paper' ? (
                            item.status === 'verified' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                Pending
                              </span>
                            )
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                              Confirmed
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {item.kind === 'paper' ? (
                            item.status === 'verified' ? (
                              <button
                                onClick={() => handleVerifyPayment(item.id, 'pending')}
                                disabled={updatingId === item.id}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 rounded-lg transition disabled:opacity-50"
                                title="Revert back to Pending"
                              >
                                <RotateCcw className="w-3 h-3" />
                                {updatingId === item.id ? '...' : 'Revert'}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleVerifyPayment(item.id, 'verified')}
                                disabled={updatingId === item.id}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{updatingId === item.id ? '...' : 'Verify'}</span>
                              </button>
                            )
                          ) : (
                            <span className="text-xs text-slate-400 font-medium">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : activeTab === 'papers' ? (
              /* --- PUBLISHERS / PAPERS VIEW --- */
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                    {/* PRIORITY COLUMNS FIRST */}
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100">1. Name (Author)</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100">2. Contact Number</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100 min-w-[240px]">3. Paper Title</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100 text-center">4. How Much Paid</th>
                    <th className="p-4 bg-blue-50/40 text-blue-900 border-r border-blue-100 text-center">5. Registered As</th>
                    {/* OTHER COLUMNS */}
                    <th className="p-4">Paper ID</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Domain / Topic</th>
                    <th className="p-4">Mode</th>
                    <th className="p-4">UTR No.</th>
                    <th className="p-4 text-center">Payment Proof</th>
                    <th className="p-4 text-center">Payment Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
                  {filteredPapers.length === 0 ? (
                    <tr>
                      <td colSpan="14" className="p-8 text-center text-slate-400 font-medium">No submissions found.</td>
                    </tr>
                  ) : (
                    filteredPapers.map((paper) => {
                      const amountPaid = getPaperFee(paper);
                      const registeredAs = getPaperRegisteredAs(paper);

                      return (
                        <tr key={paper.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* 1. Name */}
                          <td className="p-4 font-bold text-slate-900 bg-blue-50/15 border-r border-slate-100">
                            {paper.author}
                          </td>

                          {/* 2. Contact Number */}
                          <td className="p-4 bg-blue-50/15 border-r border-slate-100">
                            <a 
                              href={`tel:${paper.contact_no}`} 
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                            >
                              <Phone className="w-3 h-3 text-slate-400" />
                              {paper.contact_no || 'N/A'}
                            </a>
                          </td>

                          {/* 3. Paper Title */}
                          <td className="p-4 bg-blue-50/15 border-r border-slate-100 max-w-xs">
                            <span className="font-semibold text-slate-800 line-clamp-2" title={paper.paper_title}>
                              {paper.paper_title}
                            </span>
                          </td>

                          {/* 4. How Much Paid */}
                          <td className="p-4 text-center bg-blue-50/15 border-r border-slate-100">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                              <CreditCard className="w-3 h-3 text-emerald-600" />
                              {amountPaid}
                            </span>
                          </td>

                          {/* 5. Registered As */}
                          <td className="p-4 text-center bg-blue-50/15 border-r border-slate-100">
                            {renderRegisteredBadge(registeredAs)}
                          </td>

                          {/* OTHER COLUMNS */}
                          <td className="p-4 font-mono font-bold text-xs text-blue-900">
                            {paper.paper_id || 'N/A'}
                          </td>

                          <td className="p-4 text-xs font-medium text-slate-600 max-w-[180px] truncate" title={paper.email}>
                            {paper.email}
                          </td>

                          <td className="p-4 text-xs font-semibold text-slate-700">
                            {paper.designation}
                          </td>

                          <td className="p-4 text-xs">
                            <span className="block font-bold text-slate-600 uppercase">{paper.domain}</span>
                            <span className="block text-slate-400 max-w-xs truncate" title={paper.topic}>{paper.topic}</span>
                          </td>

                          <td className="p-4 text-xs font-medium">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {paper.mode_of_participation || 'N/A'}
                            </span>
                          </td>

                          <td className="p-4 font-mono text-xs text-slate-600">
                            {paper.utr_no}
                          </td>

                          <td className="p-4 text-center">
                            {paper.payment_proof_url ? (
                              <a 
                                href={paper.payment_proof_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline font-bold"
                              >
                                View <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-slate-300">None</span>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            {paper.status === 'verified' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-sm">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                Pending
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            {paper.status === 'verified' ? (
                              <button
                                onClick={() => handleVerifyPayment(paper.id, 'pending')}
                                disabled={updatingId === paper.id}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 rounded-lg transition disabled:opacity-50"
                                title="Revert back to Pending"
                              >
                                <RotateCcw className="w-3 h-3" />
                                {updatingId === paper.id ? '...' : 'Revert'}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleVerifyPayment(paper.id, 'verified')}
                                disabled={updatingId === paper.id}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{updatingId === paper.id ? '...' : 'Verify'}</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            ) : (
              /* --- LISTENERS VIEW --- */
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                    {/* PRIORITY COLUMNS FIRST */}
                    <th className="p-4 bg-purple-50/40 text-purple-900 border-r border-purple-100">1. Name</th>
                    <th className="p-4 bg-purple-50/40 text-purple-900 border-r border-purple-100">2. Contact Number</th>
                    <th className="p-4 bg-purple-50/40 text-purple-900 border-r border-purple-100 min-w-[200px]">3. Paper Title</th>
                    <th className="p-4 bg-purple-50/40 text-purple-900 border-r border-purple-100 text-center">4. How Much Paid</th>
                    <th className="p-4 bg-purple-50/40 text-purple-900 border-r border-purple-100 text-center">5. Registered As</th>
                    {/* OTHER COLUMNS */}
                    <th className="p-4">Course</th>
                    <th className="p-4">Institution</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Year</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Region</th>
                    <th className="p-4">UTR No.</th>
                    <th className="p-4 text-center">Payment Proof</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
                  {filteredListeners.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="p-8 text-center text-slate-400 font-medium">No listener registrations found.</td>
                    </tr>
                  ) : (
                    filteredListeners.map((listener) => {
                      const amountPaid = getListenerFee(listener);
                      const registeredAs = getListenerRegisteredAs(listener);

                      return (
                        <tr key={listener.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* 1. Name */}
                          <td className="p-4 font-bold text-slate-900 bg-purple-50/15 border-r border-slate-100">
                            {listener.name}
                          </td>

                          {/* 2. Contact Number */}
                          <td className="p-4 bg-purple-50/15 border-r border-slate-100">
                            <a 
                              href={`tel:${listener.mobile_number}`} 
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline"
                            >
                              <Phone className="w-3 h-3 text-slate-400" />
                              {listener.mobile_number || 'N/A'}
                            </a>
                          </td>

                          {/* 3. Paper Title */}
                          <td className="p-4 bg-purple-50/15 border-r border-slate-100">
                            <span className="text-xs text-slate-400 italic bg-slate-100 px-2.5 py-1 rounded">
                              N/A (Listener)
                            </span>
                          </td>

                          {/* 4. How Much Paid */}
                          <td className="p-4 text-center bg-purple-50/15 border-r border-slate-100">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
                              <CreditCard className="w-3 h-3 text-emerald-600" />
                              {amountPaid}
                            </span>
                          </td>

                          {/* 5. Registered As */}
                          <td className="p-4 text-center bg-purple-50/15 border-r border-slate-100">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                              {registeredAs}
                            </span>
                          </td>

                          {/* OTHER COLUMNS */}
                          <td className="p-4 font-medium text-xs text-slate-800">{listener.course}</td>
                          <td className="p-4 max-w-xs truncate text-xs font-medium text-slate-800" title={listener.institution}>{listener.institution}</td>
                          <td className="p-4 text-xs">{listener.department}</td>
                          <td className="p-4 text-xs font-semibold">{listener.year}</td>
                          <td className="p-4 text-xs font-medium text-slate-600">{listener.payment_category}</td>
                          <td className="p-4 text-xs font-medium text-slate-500">{listener.region}</td>
                          <td className="p-4 font-mono text-xs text-slate-600">{listener.utr_no}</td>
                          <td className="p-4 text-center">
                            {listener.payment_proof_url ? (
                              <a 
                                href={listener.payment_proof_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 hover:underline font-bold"
                              >
                                View <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-slate-300">None</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
