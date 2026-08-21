import React, { useState, useEffect } from 'react';
import { AssessmentRecord, AdminAnalytics, ChakraKey } from '../types';
import { CHAKRA_METADATA, CHAKRA_ORDER } from '../data/chakras';
import { ChakraIcon } from './ChakraIcon';
import { LotusIcon } from './LotusIcon';
import { ParticipantDetailModal } from './ParticipantDetailModal';
import {
  Users,
  Search,
  Download,
  RefreshCw,
  LogOut,
  Sparkles,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onViewParticipantApp: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token,
  onLogout,
  onViewParticipantApp
}) => {
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentRecord | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [resAssessments, resAnalytics] = await Promise.all([
        fetch('/api/admin/assessments', {
          headers: { 'x-admin-token': token }
        }),
        fetch('/api/admin/analytics', {
          headers: { 'x-admin-token': token }
        })
      ]);

      if (resAssessments.status === 401 || resAnalytics.status === 401) {
        onLogout();
        return;
      }

      const dataAssessments = await resAssessments.json();
      const dataAnalytics = await resAnalytics.json();

      if (dataAssessments.assessments) {
        setAssessments(dataAssessments.assessments);
      }
      if (dataAnalytics.analytics) {
        setAnalytics(dataAnalytics.analytics);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const handleDeleteAssessment = async (responseId: string) => {
    try {
      const res = await fetch(`/api/admin/assessments/${responseId}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      });
      if (res.ok) {
        setAssessments((prev) => prev.filter((a) => a.responseId !== responseId));
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error deleting assessment:', err);
    }
  };

  const handleExportCSV = () => {
    if (assessments.length === 0) return;

    const headers = [
      'Participant Name',
      'Response ID',
      'Date',
      'Root Score',
      'Sacral Score',
      'Solar Plexus Score',
      'Heart Score',
      'Throat Score',
      'Third Eye Score',
      'Crown Score',
      'Strongest Chakra',
      'Lowest Chakra'
    ];

    const rows = assessments.map((a) => [
      `"${a.name.replace(/"/g, '""')}"`,
      a.responseId,
      `"${a.formattedDate}"`,
      a.results.rootScore,
      a.results.sacralScore,
      a.results.solarPlexusScore,
      a.results.heartScore,
      a.results.throatScore,
      a.results.thirdEyeScore,
      a.results.crownScore,
      `"${a.results.strongestChakra}"`,
      `"${a.results.lowestChakra}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inner_balance_assessments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAssessments = assessments.filter((a) => {
    const query = searchQuery.toLowerCase();
    return (
      a.name.toLowerCase().includes(query) ||
      a.responseId.toLowerCase().includes(query) ||
      a.results.strongestChakra.toLowerCase().includes(query) ||
      a.results.lowestChakra.toLowerCase().includes(query) ||
      a.formattedDate.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#0A0C14] text-slate-100 flex flex-col selection:bg-amber-400/30">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center">
            <LotusIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif-title text-lg sm:text-xl font-medium text-slate-100 leading-tight">
              Inner Balance Dashboard
            </h1>
            <p className="text-[11px] text-slate-400">
              Private Assessment Collection & Analytics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onViewParticipantApp}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>Participant Assessment</span>
          </button>

          <button
            onClick={fetchDashboardData}
            disabled={isRefreshing}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white text-xs font-medium shadow-sm transition-all cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs font-medium border border-slate-800 hover:border-rose-800/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Responses */}
          <div className="p-5 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Total Assessments
              </p>
              <h3 className="font-serif-title text-3xl font-light text-slate-100 mt-1">
                {analytics ? analytics.totalAssessments : assessments.length}
              </h3>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Recorded Submissions</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Most Common Strongest */}
          <div className="p-5 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Top Strongest Area
              </p>
              <h3 className="font-serif-title text-2xl font-light text-emerald-400 mt-1">
                {analytics?.mostCommonStrongest || 'None'}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Most frequent high alignment
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Most Common Lowest */}
          <div className="p-5 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Top Reflection Area
              </p>
              <h3 className="font-serif-title text-2xl font-light text-amber-400 mt-1">
                {analytics?.mostCommonLowest || 'None'}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Most frequent growth area
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Latest Entry */}
          <div className="p-5 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Latest Submission
              </p>
              <h3 className="font-serif-title text-lg font-light text-slate-100 mt-1 truncate max-w-[150px]">
                {assessments[0]?.name || 'None'}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                {assessments[0]?.formattedDate || 'Awaiting entry'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Analytics Section: Average Scores Breakdown */}
        {analytics && (
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-serif-title text-xl font-medium text-slate-100">
                  Cohort Average Chakra Scores
                </h2>
                <p className="text-xs text-slate-400">
                  Mean score per dimension across all {analytics.totalAssessments} participants (0 - 20 Scale)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 pt-2">
              {CHAKRA_ORDER.map((key) => {
                const meta = CHAKRA_METADATA[key];
                const avgScore = analytics.averageScores[key] || 0;
                const percentage = Math.round((avgScore / 20) * 100);

                return (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-300">
                        {meta.name}
                      </span>
                      <ChakraIcon chakraKey={key} size={16} />
                    </div>

                    <div className="my-2">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif-title text-2xl font-light text-slate-100">
                          {avgScore}
                        </span>
                        <span className="text-[10px] text-slate-500">/ 20</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${meta.barGradient}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-500 italic truncate">
                      {meta.sanskritName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Assessments Data Table */}
        <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 overflow-hidden shadow-xl">
          {/* Table Controls */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-title text-xl font-medium text-slate-100">
                Participant Records
              </h2>
              <p className="text-xs text-slate-400">
                Showing {filteredAssessments.length} of {assessments.length} submissions
              </p>
            </div>

            {/* Search input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, ID, or chakra..."
                className="w-full px-4 py-2 pl-9 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-amber-400"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Participant</th>
                  <th className="py-3.5 px-3">ID</th>
                  <th className="py-3.5 px-3">Date</th>
                  <th className="py-3.5 px-2 text-center" title="Root Chakra">Root</th>
                  <th className="py-3.5 px-2 text-center" title="Sacral Chakra">Sacral</th>
                  <th className="py-3.5 px-2 text-center" title="Solar Plexus Chakra">Solar Plx</th>
                  <th className="py-3.5 px-2 text-center" title="Heart Chakra">Heart</th>
                  <th className="py-3.5 px-2 text-center" title="Throat Chakra">Throat</th>
                  <th className="py-3.5 px-2 text-center" title="Third Eye Chakra">3rd Eye</th>
                  <th className="py-3.5 px-2 text-center" title="Crown Chakra">Crown</th>
                  <th className="py-3.5 px-3">Strongest</th>
                  <th className="py-3.5 px-3">Lowest</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-light">
                {isLoading ? (
                  <tr>
                    <td colSpan={13} className="py-12 text-center text-slate-500 text-xs">
                      Loading participant submissions...
                    </td>
                  </tr>
                ) : filteredAssessments.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="py-12 text-center text-slate-500 text-xs">
                      No assessment submissions match your query.
                    </td>
                  </tr>
                ) : (
                  filteredAssessments.map((record) => (
                    <tr
                      key={record.responseId}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedAssessment(record)}
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4 font-medium text-slate-100 whitespace-nowrap">
                        {record.name}
                      </td>

                      {/* Response ID */}
                      <td className="py-3.5 px-3 font-mono text-[11px] text-amber-300/90 whitespace-nowrap">
                        #{record.responseId}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                        {record.formattedDate}
                      </td>

                      {/* Scores */}
                      <td className="py-3.5 px-2 text-center font-mono font-medium text-slate-300">
                        {record.results.rootScore}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-medium text-slate-300">
                        {record.results.sacralScore}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-medium text-slate-300">
                        {record.results.solarPlexusScore}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-medium text-slate-300">
                        {record.results.heartScore}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-medium text-slate-300">
                        {record.results.throatScore}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-medium text-slate-300">
                        {record.results.thirdEyeScore}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-medium text-slate-300">
                        {record.results.crownScore}
                      </td>

                      {/* Strongest */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
                          {record.results.strongestChakra}
                        </span>
                      </td>

                      {/* Lowest */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-[11px] font-medium">
                          {record.results.lowestChakra}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedAssessment(record)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedAssessment && (
        <ParticipantDetailModal
          assessment={selectedAssessment}
          onClose={() => setSelectedAssessment(null)}
          onDelete={handleDeleteAssessment}
        />
      )}
    </div>
  );
};
