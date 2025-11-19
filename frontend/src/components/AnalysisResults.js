import React, { useState, useMemo } from 'react';

/**
 * AnalysisResults (JSX) — ES Lint warning fixed (stable 'issues' identity)
 */
export default function AnalysisResults({ analysis }) {
  // Hooks at top-level
  const [filter, setFilter] = useState('ALL');

  // Safe top-level normalization
  const filename = analysis?.filename ?? '—';
  const analysisTime = analysis?.analysisTime ?? '—';
  const data = analysis?.analysis ?? {};

  const {
    totalIssues = 0,
    critical = 0,
    high = 0,
    medium = 0,
    low = 0,
    securityScore: rawScore = 0,
    issues: rawIssues = [],
    recommendations = [],
    configSummary = null,
  } = data;

  const securityScore = Number.isFinite(rawScore) ? Math.max(0, Math.min(100, rawScore)) : 0;

  // <-- FIX: memoize `issues` so it has a stable identity unless `rawIssues` changes
  const issues = useMemo(() => (Array.isArray(rawIssues) ? rawIssues : []), [rawIssues]);

  const getSeverityClasses = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return { bg: 'bg-red-100', border: 'border-red-300', badgeBg: 'bg-red-700', badgeText: 'text-white' };
      case 'HIGH':
        return { bg: 'bg-orange-100', border: 'border-orange-300', badgeBg: 'bg-orange-700', badgeText: 'text-white' };
      case 'MEDIUM':
        return { bg: 'bg-yellow-100', border: 'border-yellow-300', badgeBg: 'bg-yellow-700', badgeText: 'text-white' };
      case 'LOW':
        return { bg: 'bg-green-100', border: 'border-green-300', badgeBg: 'bg-green-700', badgeText: 'text-white' };
      default:
        return { bg: 'bg-gray-100', border: 'border-gray-300', badgeBg: 'bg-gray-700', badgeText: 'text-white' };
    }
  };

  const getScoreTextClass = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    if (score >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreRating = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 50) return 'Fair';
    if (score >= 25) return 'Poor';
    return 'Critical';
  };

  // Memoized counts for filter UI (now depends on stable `issues`)
  const counts = useMemo(() => {
    const c = { ALL: issues.length, CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
    for (let i = 0; i < issues.length; i++) {
      const s = issues[i]?.severity;
      if (s === 'CRITICAL') c.CRITICAL += 1;
      else if (s === 'HIGH') c.HIGH += 1;
      else if (s === 'MEDIUM') c.MEDIUM += 1;
      else if (s === 'LOW') c.LOW += 1;
    }
    return c;
  }, [issues]);

  const filteredIssues = useMemo(() => {
    if (filter === 'ALL') return issues;
    return issues.filter((it) => it && it.severity === filter);
  }, [issues, filter]);

  const getIssueKey = (issue, index) => {
    if (!issue) return `issue-${index}`;
    if (issue.id) return String(issue.id);
    if (issue.cve && issue.cve !== 'N/A') return String(issue.cve);
    if (issue.title) return `${issue.title.split(' ').filter(Boolean).join('-')}-${index}`;
    return `issue-${index}`;
  };

  if (!analysis || typeof analysis !== 'object') return null;

  return (
    <div className="space-y-6">
      {/* File Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Filename</p>
            <p className="font-medium text-gray-900">{filename}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Analysis Time</p>
            <p className="font-medium text-gray-900">{analysisTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Issues</p>
            <p className="font-medium text-gray-900">{totalIssues ?? issues.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Security Score</p>
            <p className={`font-bold text-2xl ${getScoreTextClass(securityScore)}`}>{securityScore}/100</p>
            <p className={`text-sm ${getScoreTextClass(securityScore)}`}>{getScoreRating(securityScore)}</p>
          </div>
        </div>

        {/* Password Strength Analysis */}
        {data.passwordAnalysis && (
          <div className={`mt-4 p-4 rounded-lg border-2 ${
            data.passwordAnalysis.strength === 'CRITICAL' ? 'bg-red-50 border-red-300' :
            data.passwordAnalysis.strength === 'WEAK' ? 'bg-orange-50 border-orange-300' :
            data.passwordAnalysis.strength === 'MODERATE' ? 'bg-yellow-50 border-yellow-300' :
            'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  🔐 Password Strength Analysis
                </h4>
                <p className="text-sm text-gray-700">
                  Strength: <strong>{data.passwordAnalysis.strength}</strong> | 
                  Score: <strong>{data.passwordAnalysis.score}/100</strong>
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                data.passwordAnalysis.strength === 'CRITICAL' ? 'bg-red-200 text-red-800' :
                data.passwordAnalysis.strength === 'WEAK' ? 'bg-orange-200 text-orange-800' :
                data.passwordAnalysis.strength === 'MODERATE' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {data.passwordAnalysis.strength}
              </div>
            </div>
            {data.passwordAnalysis.issues && data.passwordAnalysis.issues.length > 0 && (
              <div className="mt-3 space-y-1">
                {data.passwordAnalysis.issues.map((issue, idx) => (
                  <p key={idx} className="text-xs text-gray-600">
                    ⚠️ {issue.title}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Score visualization */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Score</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${getScoreTextClass(securityScore)} bg-opacity-20`}>
                {getScoreRating(securityScore)}
              </span>
            </div>
            <div className="text-right">
              <span className={`text-xs font-semibold inline-block ${getScoreTextClass(securityScore)}`}>{securityScore}%</span>
            </div>
          </div>

          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              role="progressbar"
              aria-valuenow={securityScore}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${securityScore}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                securityScore >= 75 ? 'bg-green-500' : securityScore >= 50 ? 'bg-yellow-500' : securityScore >= 25 ? 'bg-orange-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Issue counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Critical</p>
              <p className="text-3xl font-bold text-red-700">{critical}</p>
            </div>
            <div className="text-4xl" aria-hidden>🔴</div>
          </div>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">High</p>
              <p className="text-3xl font-bold text-orange-700">{high}</p>
            </div>
            <div className="text-4xl" aria-hidden>🟠</div>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Medium</p>
              <p className="text-3xl font-bold text-yellow-700">{medium}</p>
            </div>
            <div className="text-4xl" aria-hidden>🟡</div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Low</p>
              <p className="text-3xl font-bold text-green-700">{low}</p>
            </div>
            <div className="text-4xl" aria-hidden>🟢</div>
          </div>
        </div>
      </div>

      {/* Config summary */}
      {configSummary && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600">Total Interfaces</p>
              <p className="text-2xl font-bold text-blue-700">{configSummary.totalInterfaces || 0}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600">VTY Lines</p>
              <p className="text-2xl font-bold text-purple-700">{configSummary.totalVTYLines || 0}</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-sm text-indigo-600">Access Lists</p>
              <p className="text-2xl font-bold text-indigo-700">{configSummary.totalACLs || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {Array.isArray(recommendations) && recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, i) => (
              <li key={`rec-${i}`} className="text-sm text-blue-800 flex items-start">
                <span className="mr-2">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Issues list */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Detected Issues</h3>

          <div className="flex space-x-2" role="tablist" aria-label="Severity filter">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((severity) => {
              const isActive = filter === severity;
              return (
                <button
                  key={severity}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(severity)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {severity} ({counts[severity] ?? 0})
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No issues found for this filter.</p>
          ) : (
            filteredIssues.map((issue, index) => {
              const severity = issue?.severity ?? 'UNKNOWN';
              const sev = getSeverityClasses(severity);
              return (
                <div
                  key={getIssueKey(issue, index)}
                  className={`border-2 rounded-lg p-4 ${sev.bg} ${sev.border}`}
                  aria-labelledby={`issue-title-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${sev.badgeBg} ${sev.badgeText}`}>{severity}</span>
                        <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700">{issue?.category ?? 'General'}</span>
                      </div>

                      <h4 id={`issue-title-${index}`} className="font-semibold text-gray-900 mb-1">{issue?.title ?? 'Untitled issue'}</h4>

                      <p className="text-sm text-gray-700 mb-2">{issue?.description ?? 'No description provided.'}</p>

                      {issue?.location && <p className="text-xs text-gray-600 mb-2">📍 Location: {issue.location}</p>}

                      {issue?.recommendation && (
                        <div className="mt-3 bg-white bg-opacity-50 rounded p-3">
                          <p className="text-xs font-semibold text-gray-800 mb-1">💡 Recommendation:</p>
                          <p className="text-sm text-gray-700">{issue.recommendation}</p>
                        </div>
                      )}

                      {issue?.cve && issue.cve !== 'N/A' && <p className="text-xs text-gray-600 mt-2">🔗 Reference: {issue.cve}</p>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
