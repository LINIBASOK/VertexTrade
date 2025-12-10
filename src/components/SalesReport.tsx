import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { reportService } from '../services/api';
import '../styles/report.scss';

export interface SalesReportType {
  totalSales: number;
  totalProductsSold: number;
  salesTrend?: { date: string; sales: number }[];
  salesByCategory?: { category: string; value: number }[];
}

export default function SalesReport() {
  const [report, setReport] = useState<SalesReportType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const COLORS = ['#64DD7F', '#01AFF6', '#FFD600', '#FE8E28', '#D03636'];

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await reportService.getSummary();
      setReport(data);
    } catch (err) {
      setError(
        'Failed to load report. Make sure the backend is running on  https://vertextrade.fly.dev'
      );
      console.error('Error loading report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      setIsDownloading(true);
      const blob = await reportService.downloadCSV();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sales-report-${new Date()
        .toISOString()
        .split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download ');
      console.error('Error downloading :', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="report-container">
   
      <div className="report-header">
        <h2>Sales Dashboard</h2>
        <button
          className="btn-download"
          onClick={handleDownloadCSV}
          disabled={isDownloading}
        >
          <Download size={20} />
          {isDownloading ? 'Downloading...' : 'Download Report'}
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading report...</p>
        </div>
      ) : report ? (
        <>
     
          <div className="report-grid">
            <div className="report-card">
              <div className="card-header">
                <h3>Total Sales</h3>
              </div>
              <div className="card-value">${report.totalSales.toFixed(2)}</div>
              <p className="card-description">Total revenue from all sales</p>
            </div>

            <div className="report-card">
              <div className="card-header">
                <h3>Total Products Sold</h3>
              </div>
              <div className="card-value">{report.totalProductsSold}</div>
              <p className="card-description">
                Units sold across all transactions
              </p>
            </div>
          </div>

       
          <div className="charts-grid">
            {report.salesTrend && report.salesTrend.length > 0 && (
              <div className="chart-section">
                <h3>Sales Trend (Last Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={report.salesTrend}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#01AFF6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {report.salesByCategory && report.salesByCategory.length > 0 && (
              <div className="chart-section">
                <h3>Sales by Product</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={report.salesByCategory}
                      dataKey="value"
                      nameKey="category"
                      outerRadius={100}
                      label
                    >
                      {report.salesByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
