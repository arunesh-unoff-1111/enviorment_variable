import { ChakraKey, Question, AssessmentResults } from '../types';
import { CHAKRA_ORDER } from '../data/chakras';

export function calculateChakraScores(
  answers: Record<number, number>, // question.id -> selectedChoiceIndex (0..3)
  questions: Question[]
): AssessmentResults {
  const rawScores: Record<ChakraKey, number> = {
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0
  };

  const maxPossibleScores: Record<ChakraKey, number> = {
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0
  };

  // Compute max possible raw score for each chakra across questions
  questions.forEach((q) => {
    // Find max points for each chakra key in this question
    CHAKRA_ORDER.forEach((key) => {
      let maxForThisQuestion = 0;
      q.choices.forEach((choice) => {
        const weight = choice.weights[key] || 0;
        if (weight > maxForThisQuestion) {
          maxForThisQuestion = weight;
        }
      });
      maxPossibleScores[key] += maxForThisQuestion;
    });

    // Add user's selected points
    const selectedChoiceIdx = answers[q.id];
    if (selectedChoiceIdx !== undefined && q.choices[selectedChoiceIdx]) {
      const selectedWeights = q.choices[selectedChoiceIdx].weights;
      CHAKRA_ORDER.forEach((key) => {
        rawScores[key] += selectedWeights[key] || 0;
      });
    }
  });

  // Normalize scores to 0-20 scale
  const scores: Record<ChakraKey, number> = {
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0
  };

  CHAKRA_ORDER.forEach((key) => {
    const maxPoss = maxPossibleScores[key] || 1;
    const raw = rawScores[key] || 0;
    const normalized = Math.round((raw / maxPoss) * 20);
    scores[key] = Math.min(20, Math.max(0, normalized));
  });

  // Determine strongest and lowest areas
  let maxScore = -1;
  let minScore = 21;

  CHAKRA_ORDER.forEach((key) => {
    const score = scores[key];
    if (score > maxScore) maxScore = score;
    if (score < minScore) minScore = score;
  });

  const strongest = CHAKRA_ORDER.filter((key) => scores[key] === maxScore);
  const lowest = CHAKRA_ORDER.filter((key) => scores[key] === minScore);

  return {
    scores,
    strongest,
    lowest,
    completedAt: new Date().toISOString()
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
