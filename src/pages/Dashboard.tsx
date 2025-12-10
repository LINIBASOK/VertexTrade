import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../components/Products';
import Sales from '../components/Sales';
import SalesReport from '../components/SalesReport';
import '../styles/dashboard.scss';
import { LogOut, Package, ShoppingCart, BarChart3 } from 'lucide-react';

type ActiveTab = 'products' | 'sales' | 'report';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    () => (localStorage.getItem('activeTab') as ActiveTab) || 'products'
  );
  const [username, setUsername] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('username');
    if (!token) {
      navigate('/login');
      return;
    }
    setUsername(user || 'User');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="logo">Dashboard</h1>
          <div className="header-right">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="global-search"
            />
            <span className="username">Welcome, {username}</span>
            <button className="logout-button" onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        <nav className="sidebar">
          <div className="nav-group">
            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => handleTabChange('products')}
            >
              <Package size={20} />
              <span>Products</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'sales' ? 'active' : ''}`}
              onClick={() => handleTabChange('sales')}
            >
              <ShoppingCart size={20} />
              <span>Sales</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'report' ? 'active' : ''}`}
              onClick={() => handleTabChange('report')}
            >
              <BarChart3 size={20} />
              <span>Sales Report</span>
            </button>
          </div>
        </nav>

        <main className="main-content">
          {activeTab === 'products' && <Products search={search} />}
          {activeTab === 'sales' && <Sales search={search} />}
          {activeTab === 'report' && <SalesReport />}
        </main>
      </div>
    </div>
  );
}
