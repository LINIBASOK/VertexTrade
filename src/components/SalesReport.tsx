import { useState, useEffect } from 'react';
import { SalesReport as SalesReportType } from '../types';
import { reportService } from '../services/api';
import '../styles/report.scss';
import { Download } from 'lucide-react';

export default function SalesReport() {
  const [report, setReport] = useState<SalesReportType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

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
      setError('Failed to load report. Make sure the backend is running on http://localhost:8080');
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
      link.download = `sales-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download CSV');
      console.error('Error downloading CSV:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Sales Report</h2>
        <button
          className="btn-download"
          onClick={handleDownloadCSV}
          disabled={isDownloading}
        >
          <Download size={20} />
          {isDownloading ? 'Downloading...' : 'Download CSV'}
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading report...</p>
        </div>
      ) : report ? (
        <div className="report-grid">
          <div className="report-card">
            <div className="card-header">
              <h3>Total Sales</h3>
            </div>
            <div className="card-value">
              ${report.totalSales.toFixed(2)}
            </div>
            <p className="card-description">Total revenue from all sales</p>
          </div>

          <div className="report-card">
            <div className="card-header">
              <h3>Total Products Sold</h3>
            </div>
            <div className="card-value">
              {report.totalProductsSold}
            </div>
            <p className="card-description">Units sold across all transactions</p>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
