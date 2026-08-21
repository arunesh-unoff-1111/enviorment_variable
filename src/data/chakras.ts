import { ChakraKey, ChakraMeta } from '../types';

export const CHAKRA_METADATA: Record<ChakraKey, ChakraMeta> = {
  root: {
    key: 'root',
    name: 'Root Chakra',
    sanskritName: 'Muladhara',
    colorHex: '#E53E3E',
    badgeBgClass: 'bg-red-500/10 border-red-500/30',
    badgeTextClass: 'text-red-400',
    barGradient: 'from-red-500 to-rose-400',
    glowClass: 'shadow-red-500/30',
    tagline: 'Grounding, stability, and physical foundation',
    description: 'Your score reflects your sense of stability, grounding and security.'
  },
  sacral: {
    key: 'sacral',
    name: 'Sacral Chakra',
    sanskritName: 'Svadhisthana',
    colorHex: '#ED8936',
    badgeBgClass: 'bg-orange-500/10 border-orange-500/30',
    badgeTextClass: 'text-orange-400',
    barGradient: 'from-orange-500 to-amber-400',
    glowClass: 'shadow-orange-500/30',
    tagline: 'Creativity, fluidity, and emotional vitality',
    description: 'Your score reflects your creativity, emotions and relationships.'
  },
  solarPlexus: {
    key: 'solarPlexus',
    name: 'Solar Plexus Chakra',
    sanskritName: 'Manipura',
    colorHex: '#ECC94B',
    badgeBgClass: 'bg-yellow-500/10 border-yellow-500/30',
    badgeTextClass: 'text-yellow-400',
    barGradient: 'from-yellow-500 to-amber-300',
    glowClass: 'shadow-yellow-500/30',
    tagline: 'Personal power, conviction, and inner discipline',
    description: 'Your score reflects your confidence, willpower and personal strength.'
  },
  heart: {
    key: 'heart',
    name: 'Heart Chakra',
    sanskritName: 'Anahata',
    colorHex: '#48BB78',
    badgeBgClass: 'bg-emerald-500/10 border-emerald-500/30',
    badgeTextClass: 'text-emerald-400',
    barGradient: 'from-emerald-500 to-teal-300',
    glowClass: 'shadow-emerald-500/30',
    tagline: 'Compassion, empathy, and emotional harmony',
    description: 'Your score reflects your compassion, love and emotional balance.'
  },
  throat: {
    key: 'throat',
    name: 'Throat Chakra',
    sanskritName: 'Vishuddha',
    colorHex: '#38B2AC',
    badgeBgClass: 'bg-cyan-500/10 border-cyan-500/30',
    badgeTextClass: 'text-cyan-400',
    barGradient: 'from-cyan-500 to-sky-300',
    glowClass: 'shadow-cyan-500/30',
    tagline: 'Authentic expression, truth, and clear dialogue',
    description: 'Your score reflects your communication, self-expression and truth.'
  },
  thirdEye: {
    key: 'thirdEye',
    name: 'Third Eye Chakra',
    sanskritName: 'Ajna',
    colorHex: '#667EEA',
    badgeBgClass: 'bg-indigo-500/10 border-indigo-500/30',
    badgeTextClass: 'text-indigo-400',
    barGradient: 'from-indigo-500 to-blue-400',
    glowClass: 'shadow-indigo-500/30',
    tagline: 'Intuition, pattern recognition, and subtle insight',
    description: 'Your score reflects your intuition, awareness and inner vision.'
  },
  crown: {
    key: 'crown',
    name: 'Crown Chakra',
    sanskritName: 'Sahasrara',
    colorHex: '#9F7AEA',
    badgeBgClass: 'bg-purple-500/10 border-purple-500/30',
    badgeTextClass: 'text-purple-400',
    barGradient: 'from-purple-500 to-violet-400',
    glowClass: 'shadow-purple-500/30',
    tagline: 'Expansive awareness, stillness, and unity',
    description: 'Your score reflects your connection to purpose, meaning and higher awareness.'
  }
};

export const CHAKRA_ORDER: ChakraKey[] = [
  'root',
  'sacral',
  'solarPlexus',
  'heart',
  'throat',
  'thirdEye',
  'crown'
];
