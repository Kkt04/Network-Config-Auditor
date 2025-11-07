/**
 * Main App Component
 * This is the entry point for the React application
 */

import React, { useState, useEffect } from 'react';
import ConfigInput from './components/ConfigInput';
import AnalysisResults from './components/AnalysisResults';
import { analyzeConfigFile, checkServerHealth } from './utils/api';

function App() {
  // State management
  const [analysis, setAnalysis] = useState(null); // Stores analysis results
  const [loading, setLoading] = useState(false); // Loading state during analysis
  const [error, setError] = useState(null); // Error messages
  const [serverOnline, setServerOnline] = useState(true); // Backend server status

  // Check if backend server is running on component mount
  useEffect(() => {
    const checkServer = async () => {
      const isOnline = await checkServerHealth();
      setServerOnline(isOnline);
      
      if (!isOnline) {
        setError('⚠️ Backend server is not running. Please start the backend server on port 5003.');
      }
    };

    checkServer();
  }, []);

  /**
   * Handle file analysis
   * Called when user uploads a file and clicks analyze
   */
  const handleAnalyze = async (file) => {
    try {
      // Reset states
      setLoading(true);
      setError(null);
      setAnalysis(null);

      // Call API to analyze file
      const result = await analyzeConfigFile(file);

      // Update state with results
      if (result.success) {
        setAnalysis(result);
      } else {
        setError(result.error || 'Analysis failed');
      }
    } catch (err) {
      // Handle errors
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset analysis and start over
   */
  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🔒 Secure Network Configuration Auditor
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Automated security analysis for router and switch configurations
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${serverOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {serverOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <div className="mt-1 text-sm text-blue-700">
                <p className="mt-1">This prototype demonstrates configuration parsing and security vulnerability detection.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        {!analysis && (
          <ConfigInput 
            onAnalyze={handleAnalyze} 
            loading={loading}
            disabled={!serverOnline}
          />
        )}

        {/* Analysis Results Section */}
        {analysis && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Analyze Another File
              </button>
            </div>
            <AnalysisResults analysis={analysis} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-lg text-gray-600">Analyzing configuration...</p>
            <p className="text-sm text-gray-500">This usually takes a few seconds</p>
          </div>
        )}

        {/* Features Section - Shown when no analysis is displayed */}
        {!analysis && !loading && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Detection</h3>
              <p className="text-gray-600 text-sm">
                Automatically scans configuration files for security vulnerabilities and misconfigurations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Scoring</h3>
              <p className="text-gray-600 text-sm">
                Get an overall security score and prioritized list of issues to address.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Receive actionable recommendations to fix detected vulnerabilities.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Network Configuration Auditor - Milestone 2 Implementation | Computer Networks Project
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
