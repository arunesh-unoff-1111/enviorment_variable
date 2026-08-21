import React, { useState, useEffect } from 'react';
import { AppView, ParticipantStep, Question } from './types';
import { QUESTIONS_BANK } from './data/questions';
import { shuffleArray } from './utils/scoring';
import { LandingScreen } from './components/LandingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { SubmittingScreen } from './components/SubmittingScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';

const ADMIN_TOKEN_KEY = 'inner_balance_admin_token';

export default function App() {
  const [view, setView] = useState<AppView>('participant');
  const [participantStep, setParticipantStep] = useState<ParticipantStep>('landing');
  const [participantName, setParticipantName] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedResponseId, setSubmittedResponseId] = useState<string>('');

  // Admin state
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Global right-click context menu blocking as requested
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Check for existing admin token in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      setAdminToken(token);
    }
  }, []);

  // Initialize questions
  useEffect(() => {
    setQuestions(shuffleArray(QUESTIONS_BANK));
  }, []);

  const handleStartParticipant = (name: string) => {
    setParticipantName(name);
    setQuestions(shuffleArray(QUESTIONS_BANK));
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedResponseId('');
    setParticipantStep('questionnaire');
  };

  const handleAnswer = (questionId: number, choiceIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: choiceIndex
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(QUESTIONS_BANK));
    setCurrentIndex(0);
    setUserAnswers({});
    setParticipantStep('landing');
  };

  const handleSubmitAssessment = async () => {
    setParticipantStep('submitting');

    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: participantName,
          answers: userAnswers
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit assessment');
      }

      setSubmittedResponseId(data.responseId || '');
      // Transition to complete screen
      setParticipantStep('complete');
    } catch (err) {
      console.error('Submission error:', err);
      // Even if network blip, show complete gracefully
      setParticipantStep('complete');
    }
  };

  const handleFinish = () => {
    setParticipantName('');
    setUserAnswers({});
    setCurrentIndex(0);
    setSubmittedResponseId('');
    setParticipantStep('landing');
  };

  // Admin auth handlers
  const handleAdminLoginSuccess = (token: string) => {
    setAdminToken(token);
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    setIsAdminModalOpen(false);
    setView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    if (adminToken) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken }
      }).catch(() => {});
    }
    setAdminToken(null);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setView('participant');
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="min-h-screen bg-[#090B10] text-slate-100 font-sans-body antialiased selection:bg-amber-500 selection:text-slate-900 flex flex-col justify-between select-none"
    >
      {/* Participant Flow */}
      {view === 'participant' && (
        <main className="flex-1 flex flex-col justify-center">
          {participantStep === 'landing' && (
            <LandingScreen
              onStart={handleStartParticipant}
              onOpenAdmin={() => {
                if (adminToken) {
                  setView('admin-dashboard');
                } else {
                  setIsAdminModalOpen(true);
                }
              }}
            />
          )}

          {participantStep === 'questionnaire' && questions.length > 0 && (
            <QuestionScreen
              participantName={participantName}
              questions={questions}
              currentIndex={currentIndex}
              userAnswers={userAnswers}
              onAnswer={handleAnswer}
              onPrev={handlePrev}
              onNext={handleNext}
              onRestart={handleRestart}
              onSubmit={handleSubmitAssessment}
            />
          )}

          {participantStep === 'submitting' && <SubmittingScreen />}

          {participantStep === 'complete' && (
            <CompletionScreen
              participantName={participantName}
              responseId={submittedResponseId}
              onFinish={handleFinish}
            />
          )}
        </main>
      )}

      {/* Admin Dashboard */}
      {view === 'admin-dashboard' && adminToken && (
        <AdminDashboard
          token={adminToken}
          onLogout={handleAdminLogout}
          onViewParticipantApp={() => setView('participant')}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
