import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Lock, 
  FileText, 
  Users, 
  Download, 
  RefreshCw, 
  LogOut,
  ExternalLink,
  Search
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('papers'); // 'papers' or 'listeners'
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

  // Export to CSV helper
  const exportToCSV = (data, filename) => {
    if (data.length === 0) return;
    
    // Extract headers (exclude file blobs or large custom props if any)
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers row
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        const escaped = ('' + (val ?? '')).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    
    // Create download link
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters search results
  const filteredPapers = papers.filter(p => 
    (p.paper_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.paper_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredListeners = listeners.filter(l => 
    (l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     l.mobile_number?.includes(searchTerm) ||
     l.course?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            <h1 className="text-3xl font-black text-slate-900">Admin Control Panel</h1>
            <p className="text-slate-500 text-sm">Overview of submitted papers and listener registrations.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData} 
              disabled={loading}
              className="flex items-center gap-1 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm text-slate-650 hover:bg-slate-50 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-sm text-blue-100 font-bold uppercase tracking-wider">Presenter Submissions</span>
              <h3 className="text-4xl font-black">{papers.length}</h3>
              <p className="text-xs text-blue-200">Registered papers & authors</p>
            </div>
            <FileText className="w-12 h-12 text-white/30" />
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-sm text-emerald-100 font-bold uppercase tracking-wider">Listener Registrations</span>
              <h3 className="text-4xl font-black">{listeners.length}</h3>
              <p className="text-xs text-emerald-200">Total registered attendees</p>
            </div>
            <Users className="w-12 h-12 text-white/30" />
          </div>
        </div>

        {/* TABS & SEARCH BAR */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 max-w-xs w-full">
              <button
                onClick={() => { setActiveTab('papers'); setSearchTerm(''); }}
                className={`flex-1 py-2 text-center text-sm font-bold rounded-lg transition ${
                  activeTab === 'papers' 
                    ? 'bg-white text-blue-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Papers ({papers.length})
              </button>
              <button
                onClick={() => { setActiveTab('listeners'); setSearchTerm(''); }}
                className={`flex-1 py-2 text-center text-sm font-bold rounded-lg transition ${
                  activeTab === 'listeners' 
                    ? 'bg-white text-emerald-950 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Listeners ({listeners.length})
              </button>
            </div>

            {/* Search and Export */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search database..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <button
                onClick={() => {
                  if (activeTab === 'papers') exportToCSV(papers, 'paper_submissions');
                  else exportToCSV(listeners, 'listener_registrations');
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-md w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* DATA TABLES */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-inner">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-12 space-y-3">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-slate-400 text-sm font-semibold">Loading records...</span>
              </div>
            ) : activeTab === 'papers' ? (
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
                    <th className="p-4">Paper ID</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Type / Region</th>
                    <th className="p-4">Domain / Topic</th>
                    <th className="p-4">UTR No.</th>
                    <th className="p-4 text-center">Payment Proof</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
                  {filteredPapers.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="p-8 text-center text-slate-400">No submissions found.</td>
                    </tr>
                  ) : (
                    filteredPapers.map((paper) => (
                      <tr key={paper.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-blue-900">{paper.paper_id || 'N/A'}</td>
                        <td className="p-4 max-w-xs truncate font-medium text-slate-900" title={paper.paper_title}>{paper.paper_title}</td>
                        <td className="p-4 font-semibold">{paper.author}</td>
                        <td className="p-4">{paper.email}</td>
                        <td className="p-4 font-mono text-xs">{paper.contact_no}</td>
                        <td className="p-4">
                          <span className="block font-medium">{paper.designation}</span>
                          <span className="text-xs text-slate-400">{paper.region}</span>
                        </td>
                        <td className="p-4 text-xs">
                          <span className="block font-bold text-slate-500 uppercase">{paper.domain}</span>
                          <span className="block text-slate-400 max-w-xs truncate">{paper.topic}</span>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-500">{paper.utr_no}</td>
                        <td className="p-4 text-center">
                          {paper.payment_proof_url ? (
                            <a 
                              href={paper.payment_proof_url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-bold"
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-300">None</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
                    <th className="p-4">Name</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Institution</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Year</th>
                    <th className="p-4">Category / Region</th>
                    <th className="p-4">UTR No.</th>
                    <th className="p-4 text-center">Payment Proof</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 text-slate-700">
                  {filteredListeners.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="p-8 text-center text-slate-400">No listener registrations found.</td>
                    </tr>
                  ) : (
                    filteredListeners.map((listener) => (
                      <tr key={listener.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-slate-900">{listener.name}</td>
                        <td className="p-4 font-mono text-xs">{listener.mobile_number}</td>
                        <td className="p-4">{listener.course}</td>
                        <td className="p-4 max-w-xs truncate" title={listener.institution}>{listener.institution}</td>
                        <td className="p-4">{listener.department}</td>
                        <td className="p-4">{listener.year}</td>
                        <td className="p-4">
                          <span className="block font-medium">{listener.payment_category}</span>
                          <span className="text-xs text-slate-400">{listener.region}</span>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-500">{listener.utr_no}</td>
                        <td className="p-4 text-center">
                          {listener.payment_proof_url ? (
                            <a 
                              href={listener.payment_proof_url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline font-bold"
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-300">None</span>
                          )}
                        </td>
                      </tr>
                    ))
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
