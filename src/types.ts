export type ChakraKey = 
  | 'root' 
  | 'sacral' 
  | 'solarPlexus' 
  | 'heart' 
  | 'throat' 
  | 'thirdEye' 
  | 'crown';

export interface ChakraMeta {
  key: ChakraKey;
  name: string;
  sanskritName: string;
  colorHex: string;
  badgeBgClass: string;
  badgeTextClass: string;
  barGradient: string;
  glowClass: string;
  tagline: string;
  description: string;
}

export type ScoringWeights = Partial<Record<ChakraKey, number>>;

export interface AnswerChoice {
  text: string;
  weights?: ScoringWeights;
}

export interface Question {
  id: number;
  scenario: string;
  choices: [AnswerChoice, AnswerChoice, AnswerChoice, AnswerChoice];
}

export interface QuestionAnswerDetail {
  questionId: number;
  choiceIndex: number;
  scenario: string;
  selectedText: string;
}

export interface AssessmentResultsData {
  rootScore: number;
  sacralScore: number;
  solarPlexusScore: number;
  heartScore: number;
  throatScore: number;
  thirdEyeScore: number;
  crownScore: number;
  strongestChakra: string;
  lowestChakra: string;
}

export interface AssessmentResults {
  scores: Record<ChakraKey, number>;
  strongest: ChakraKey[];
  lowest: ChakraKey[];
  completedAt: string;
}


export interface AssessmentRecord {
  responseId: string;
  name: string;
  timestamp: string; // ISO string
  formattedDate: string; // e.g. "21 Aug 2026, 09:30 AM"
  answers: Record<number, QuestionAnswerDetail>;
  results: AssessmentResultsData;
}

export interface AdminAnalytics {
  totalAssessments: number;
  averageScores: {
    root: number;
    sacral: number;
    solarPlexus: number;
    heart: number;
    throat: number;
    thirdEye: number;
    crown: number;
  };
  mostCommonStrongest: string;
  mostCommonLowest: string;
  strongestDistribution: Record<string, number>;
  lowestDistribution: Record<string, number>;
}

export type AppView = 'participant' | 'admin-login' | 'admin-dashboard';
export type ParticipantStep = 'landing' | 'questionnaire' | 'submitting' | 'complete';
