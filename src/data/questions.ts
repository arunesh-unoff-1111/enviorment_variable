import { Question } from '../types';

export const QUESTIONS_BANK: Question[] = [
  {
    id: 1,
    scenario: "You have been working on a personal project for several weeks and a colleague unexpectedly points out a major oversight. What is your immediate inner reaction?",
    choices: [
      {
        text: "Immediately re-evaluate the structure to figure out how to rebuild it on a solid foundation.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Feel a momentary sting, but take a step back to understand their perspective with an open mind.",
        weights: { heart: 3, thirdEye: 2 }
      },
      {
        text: "Voice my underlying reasoning clearly and ask targeted questions to clarify where the miscommunication occurred.",
        weights: { throat: 3, solarPlexus: 1 }
      },
      {
        text: "Feel inspired by the fresh perspective and brainstorm creative alternative approaches.",
        weights: { sacral: 3, crown: 2 }
      }
    ]
  },
  {
    id: 2,
    scenario: "You suddenly get an entire day completely free of obligations or scheduled plans. How do you naturally choose to spend the morning?",
    choices: [
      {
        text: "Organize my living space, clean up loose ends, or handle home chores to feel grounded.",
        weights: { root: 3, solarPlexus: 1 }
      },
      {
        text: "Reach out to a close friend or family member to share a warm, relaxed meal together.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Dive into a creative hobby, write, paint, or listen to music without any set timer.",
        weights: { sacral: 3, crown: 1 }
      },
      {
        text: "Go for a solitary walk in nature or sit quietly reflecting on my long-term life path.",
        weights: { thirdEye: 3, crown: 2 }
      }
    ]
  },
  {
    id: 3,
    scenario: "In a group meeting, two people begin heatedly arguing over conflicting priorities. How do you usually respond to the atmosphere?",
    choices: [
      {
        text: "Step in to propose a practical, structured compromise that addresses essential constraints.",
        weights: { root: 2, solarPlexus: 2 }
      },
      {
        text: "Listen carefully to both sides, helping each person feel heard and validating their emotional stance.",
        weights: { heart: 3, throat: 2 }
      },
      {
        text: "Synthesize the core principles beneath the disagreement and highlight the overarching picture.",
        weights: { thirdEye: 3, crown: 1 }
      },
      {
        text: "Stay centered and neutral, giving them space to air out their feelings without absorbing their tension.",
        weights: { crown: 3, sacral: 1 }
      }
    ]
  },
  {
    id: 4,
    scenario: "You are faced with a major life choice where all logical options carry equal uncertainty. What guides your final decision?",
    choices: [
      {
        text: "The path that offers the greatest physical stability, financial safety, and practical security.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "What feels most exciting, invigorating, and emotionally resonant right now.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "My internal sense of conviction and personal alignment, regardless of external opinion.",
        weights: { solarPlexus: 3, throat: 2 }
      },
      {
        text: "A subtle, quiet gut feeling or inner instinct that points toward the right horizon.",
        weights: { thirdEye: 3, crown: 2 }
      }
    ]
  },
  {
    id: 5,
    scenario: "When learning a complex new skill that feels frustratingly difficult at first, how do you typically approach the struggle?",
    choices: [
      {
        text: "Commit to a consistent daily practice schedule until I master the core fundamentals.",
        weights: { root: 2, solarPlexus: 3 }
      },
      {
        text: "Remind myself to enjoy the learning process and refrain from judging my early mistakes.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Break down the underlying mechanics analytically to understand the core logic.",
        weights: { thirdEye: 3, solarPlexus: 1 }
      },
      {
        text: "Experiment freely and see what unexpected, unconventional discoveries emerge.",
        weights: { sacral: 3, crown: 2 }
      }
    ]
  },
  {
    id: 6,
    scenario: "A friend unexpectedly cancels dinner plans at the last minute after you prepared for the evening. What goes through your mind?",
    choices: [
      {
        text: "Check in to make sure they are okay and express warm empathy for whatever came up.",
        weights: { heart: 3, throat: 1 }
      },
      {
        text: "Feel brief annoyance about wasted preparation, then pivot to a productive solo task.",
        weights: { solarPlexus: 2, root: 2 }
      },
      {
        text: "Relish the unexpected solo time and use it for a deeply relaxing, restorative activity.",
        weights: { crown: 2, sacral: 2 }
      },
      {
        text: "Express my disappointment gently and transparently so we can set clear future expectations.",
        weights: { throat: 3, heart: 1 }
      }
    ]
  },
  {
    id: 7,
    scenario: "You are asked to give an impromptu speech or toast at a gathering of acquaintances. How do you naturally handle it?",
    choices: [
      {
        text: "Keep it concise, grounded, and focused on acknowledging the practical facts.",
        weights: { root: 3, throat: 1 }
      },
      {
        text: "Speak directly from the heart, sharing a genuine emotional story or warm appreciation.",
        weights: { heart: 3, throat: 2 }
      },
      {
        text: "Use humor, playful charm, and lively storytelling to energize and captivate the room.",
        weights: { sacral: 3, solarPlexus: 2 }
      },
      {
        text: "Offer a thoughtful, reflective insight that highlights the deeper meaning of the gathering.",
        weights: { thirdEye: 2, crown: 3 }
      }
    ]
  },
  {
    id: 8,
    scenario: "When you feel overwhelmed by a sudden influx of urgent demands and clutter, what is your primary coping step?",
    choices: [
      {
        text: "Make a clear, prioritized checklist and systematically clear items one by one.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Take a short pause for deep breathing, physical movement, or stepping outside.",
        weights: { heart: 2, root: 2 }
      },
      {
        text: "Talk it through out loud with someone trustworthy to articulate my mental priorities.",
        weights: { throat: 3, thirdEye: 1 }
      },
      {
        text: "Step back mentally, release the sense of artificial urgency, and remember the bigger picture.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 9,
    scenario: "You notice a peer or neighbor making an obvious mistake that could easily be avoided. What action do you take?",
    choices: [
      {
        text: "Offer practical, direct assistance on the spot to help them resolve the issue immediately.",
        weights: { root: 3, solarPlexus: 1 }
      },
      {
        text: "Wait for them to ask, but remain available as a supportive, non-judgmental presence.",
        weights: { heart: 3, throat: 1 }
      },
      {
        text: "Quietly share a helpful perspective or tip without drawing unnecessary attention to it.",
        weights: { throat: 2, thirdEye: 2 }
      },
      {
        text: "Trust that they will navigate the situation through their own unique experience.",
        weights: { crown: 3, sacral: 1 }
      }
    ]
  },
  {
    id: 10,
    scenario: "When reflecting on past decisions or missed opportunities, which mindset feels most natural to you?",
    choices: [
      {
        text: "Focus on establishing better daily routines and safeguards so I don't repeat the mistake.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Forgive myself and recognize that I acted with the best emotional awareness I had at the time.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Analyze the situation to extract subtle patterns and valuable life lessons for the future.",
        weights: { thirdEye: 3, crown: 1 }
      },
      {
        text: "Acknowledge that every experience is part of a larger tapestry and remain centered in the now.",
        weights: { crown: 3, heart: 1 }
      }
    ]
  },
  {
    id: 11,
    scenario: "You step into a vibrant social gathering where you know very few people. How do you find your rhythm?",
    choices: [
      {
        text: "Find a comfortable vantage point to observe the room before deciding where to mingle.",
        weights: { thirdEye: 2, root: 2 }
      },
      {
        text: "Look for a welcoming individual or small group and initiate a warm conversation.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Introduce myself with quiet confidence and actively engage in various discussions.",
        weights: { solarPlexus: 3, throat: 2 }
      },
      {
        text: "Flow naturally with whoever crosses my path without steering the evening's direction.",
        weights: { crown: 2, sacral: 3 }
      }
    ]
  },
  {
    id: 12,
    scenario: "How do you internally respond when someone expresses a belief that fundamentally contradicts your own?",
    choices: [
      {
        text: "Seek out practical common ground where we can still cooperate productively.",
        weights: { root: 2, solarPlexus: 2 }
      },
      {
        text: "Try to understand the personal feelings and human background that shaped their view.",
        weights: { heart: 3, throat: 1 }
      },
      {
        text: "Engage in a respectful, articulate dialogue to explore the logic on both sides.",
        weights: { throat: 3, thirdEye: 2 }
      },
      {
        text: "Recognize that truth has many angles and hold space for diverse human perspectives.",
        weights: { thirdEye: 2, crown: 3 }
      }
    ]
  },
  {
    id: 13,
    scenario: "When engaging in a creative task or problem-solving effort, when do you feel most in your element?",
    choices: [
      {
        text: "When transforming abstract ideas into concrete, functional, and durable results.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "When playing with colors, shapes, feelings, or fluid concepts without rigid guidelines.",
        weights: { sacral: 3, crown: 1 }
      },
      {
        text: "When presenting the finished narrative and discussing its underlying message with others.",
        weights: { throat: 3, heart: 2 }
      },
      {
        text: "When experiencing a sudden flash of intuitive synthesis during quiet reflection.",
        weights: { thirdEye: 3, crown: 2 }
      }
    ]
  },
  {
    id: 14,
    scenario: "If someone repeatedly disregards a boundary you have communicated, how do you handle the situation?",
    choices: [
      {
        text: "Firmly re-assert the boundary and enact clear, practical limits on our interactions.",
        weights: { solarPlexus: 3, root: 2 }
      },
      {
        text: "Express how their actions affect me emotionally and invite a candid conversation.",
        weights: { throat: 3, heart: 2 }
      },
      {
        text: "Re-evaluate the relational dynamic and calmly create appropriate healthy distance.",
        weights: { thirdEye: 2, solarPlexus: 2 }
      },
      {
        text: "Maintain inner equanimity, knowing my personal peace does not depend on their behavior.",
        weights: { crown: 3, root: 1 }
      }
    ]
  },
  {
    id: 15,
    scenario: "What atmosphere or physical environment leaves you feeling most recharged and renewed?",
    choices: [
      {
        text: "A clean, orderly, and comfortable space where I feel completely safe and secure.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "A vibrant, sensory setting with good music, delicious food, art, and nature.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "A quiet study or nook equipped for writing, reading, and deep intellectual focus.",
        weights: { thirdEye: 3, throat: 2 }
      },
      {
        text: "An expansive, open natural landscape—like a mountain vista or vast shoreline.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 16,
    scenario: "You receive significant public praise for a recent milestone. How do you internally integrate the recognition?",
    choices: [
      {
        text: "Feel satisfied with the personal discipline and effort that went into building the result.",
        weights: { solarPlexus: 3, root: 2 }
      },
      {
        text: "Feel deep warmth and share credit with the collaborators and loved ones who supported me.",
        weights: { heart: 3, crown: 1 }
      },
      {
        text: "Acknowledge the compliment gracefully with clear appreciation, without feeling awkward.",
        weights: { throat: 3, heart: 1 }
      },
      {
        text: "View it as a pleasant fleeting moment, staying focused on the journey rather than praise.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 17,
    scenario: "During travel or daily transit, your transit is delayed by two hours. How do you naturally adapt?",
    choices: [
      {
        text: "Promptly look up practical alternatives or rearrange my schedule to maintain order.",
        weights: { root: 3, solarPlexus: 1 }
      },
      {
        text: "Embrace the delay with humor, treating it as a spontaneous opportunity to explore.",
        weights: { sacral: 3, heart: 1 }
      },
      {
        text: "Use the unexpected free time to read, observe people, or write down fresh thoughts.",
        weights: { thirdEye: 3, crown: 1 }
      },
      {
        text: "Remain completely relaxed in the present, trusting that timing works out as needed.",
        weights: { crown: 3, root: 2 }
      }
    ]
  },
  {
    id: 18,
    scenario: "How do you view and set long-term growth aspirations for yourself?",
    choices: [
      {
        text: "Set concrete, measurable milestones and track my practical progress systematically.",
        weights: { root: 2, solarPlexus: 3 }
      },
      {
        text: "Follow my evolving passions and curiosities, letting goals shift naturally over time.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "Write down clear intentions and speak them aloud to stay aligned with my vocal truth.",
        weights: { throat: 3, thirdEye: 1 }
      },
      {
        text: "Hold a broad, overarching vision of my life purpose while staying open in daily action.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 19,
    scenario: "When a loved one is experiencing a painful emotional trial, what supportive role do you naturally embody?",
    choices: [
      {
        text: "The practical anchor who manages daily chores and logistics so they can rest.",
        weights: { root: 3, solarPlexus: 1 }
      },
      {
        text: "The compassionate presence who offers a warm embrace and safe space to cry or vent.",
        weights: { heart: 4, sacral: 1 }
      },
      {
        text: "The thoughtful sounding board who helps them talk through their complex emotions.",
        weights: { throat: 3, thirdEye: 2 }
      },
      {
        text: "The quiet beacon who holds peaceful space and offers elevated perspective beyond the crisis.",
        weights: { crown: 3, heart: 2 }
      }
    ]
  },
  {
    id: 20,
    scenario: "How do you feel about repetition and structure in your daily schedule?",
    choices: [
      {
        text: "Structure provides essential grounding, efficiency, and a comforting sense of safety.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "I enjoy a basic rhythm, but I need frequent play, spontaneous detours, and sensory variety.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "Routines are valuable only when they support my personal autonomy and self-expression.",
        weights: { throat: 2, solarPlexus: 3 }
      },
      {
        text: "I treat routine as an outer container, placing far greater value on inner mindfulness.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 21,
    scenario: "When selecting clothing, home decor, or personal items, what quality matters most to you?",
    choices: [
      {
        text: "Durability, practical comfort, and a feeling of solid utility.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "Tactile feel, expressive style, playful color, and aesthetic pleasure.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "Distinct character that reflects my individual identity and confident taste.",
        weights: { solarPlexus: 3, throat: 2 }
      },
      {
        text: "Simplicity, harmonious balance, and an uncluttered, serene quality.",
        weights: { thirdEye: 2, crown: 3 }
      }
    ]
  },
  {
    id: 22,
    scenario: "You realize you made a careless remark that offended someone in a conversation. What is your immediate next action?",
    choices: [
      {
        text: "Acknowledge the mistake directly, offer a sincere apology, and ask how to make amends.",
        weights: { throat: 3, heart: 2 }
      },
      {
        text: "Reflect deeply on what led to the comment and how to communicate with greater awareness.",
        weights: { thirdEye: 3, throat: 1 }
      },
      {
        text: "Focus on restoring emotional connection through gentle kindness and presence.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Forgive myself while acknowledging the error, avoiding defensive over-explanation.",
        weights: { crown: 2, solarPlexus: 2 }
      }
    ]
  },
  {
    id: 23,
    scenario: "During a spirited group discussion on a controversial topic, what is your primary objective?",
    choices: [
      {
        text: "Ensure the dialogue stays grounded in verifiable facts and practical reality.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Build empathetic bridges between opposing views so everyone feels respected.",
        weights: { heart: 3, throat: 2 }
      },
      {
        text: "Articulate my authentic stance with clarity, courage, and logical precision.",
        weights: { throat: 3, solarPlexus: 2 }
      },
      {
        text: "Uncover broader patterns, hidden assumptions, and underlying philosophical truths.",
        weights: { thirdEye: 3, crown: 2 }
      }
    ]
  },
  {
    id: 24,
    scenario: "When experiencing a period of low motivation or self-doubt, how do you gently restore your energy?",
    choices: [
      {
        text: "Focus on small, simple tasks to rebuild a sense of order and physical momentum.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Engage in fun, creative play, movement, or rest to nourish my emotional spirits.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "Re-center on my personal values and remind myself of my inner resilience.",
        weights: { solarPlexus: 3, crown: 1 }
      },
      {
        text: "Quiet my thoughts, release self-criticism, and allow natural inspiration to return.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 25,
    scenario: "When launching a new group initiative, which part of the process do you naturally gravitate toward leading?",
    choices: [
      {
        text: "Establishing the logistical structure, timeline, and practical resource allocation.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Fostering group harmony, positive team spirit, and inclusive relationships.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Crafting the core message, communication strategy, and external presentation.",
        weights: { throat: 3, solarPlexus: 2 }
      },
      {
        text: "Formulating the overarching vision, strategic foresight, and big-picture roadmap.",
        weights: { thirdEye: 3, crown: 2 }
      }
    ]
  },
  {
    id: 26,
    scenario: "How do you experience extended periods of quiet solitude?",
    choices: [
      {
        text: "As a grounding window to rest physically and organize my personal space.",
        weights: { root: 3, thirdEye: 1 }
      },
      {
        text: "As a creative sanctuary to listen to music, daydream, or explore feelings.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "As a space for honest internal dialog and clarifying my personal intentions.",
        weights: { throat: 3, solarPlexus: 1 }
      },
      {
        text: "As a serene connection to universal stillness and expanding awareness.",
        weights: { crown: 4, thirdEye: 1 }
      }
    ]
  },
  {
    id: 27,
    scenario: "When navigating conflicting advice from experts you respect, how do you decide which path to follow?",
    choices: [
      {
        text: "Test the advice through small practical experiments to observe real-world results.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Consult trusted friends and gauge which option feels most supportive and warm.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Synthesize the logic of each argument and trust my internal analytical intuition.",
        weights: { thirdEye: 3, solarPlexus: 1 }
      },
      {
        text: "Detach from external opinions and listen quietly for deep inner resonance.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 28,
    scenario: "When an important goal you worked hard toward falls through unexpectedly, what is your reaction?",
    choices: [
      {
        text: "Analyze what went wrong logistically and adapt my strategy for the next attempt.",
        weights: { root: 2, solarPlexus: 3 }
      },
      {
        text: "Allow myself to feel the disappointment fully, then move through it with gentle self-care.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "Talk openly about the outcome with a mentor to process the experience verbally.",
        weights: { throat: 3, heart: 1 }
      },
      {
        text: "Recognize that every detour carries hidden wisdom and trust the overarching journey.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 29,
    scenario: "What role does physical movement (sports, walking, yoga, dancing) play in your wellness routine?",
    choices: [
      {
        text: "It keeps me anchored, physically strong, and grounded in my body.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "It is a joyful, expressive outlet for emotional energy and creative flow.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "It clears mental clutter, sharpening my cognitive clarity and focus.",
        weights: { thirdEye: 3, solarPlexus: 1 }
      },
      {
        text: "It is a meditative practice connecting body, mind, and surrounding atmosphere.",
        weights: { crown: 3, root: 2 }
      }
    ]
  },
  {
    id: 30,
    scenario: "When sharing a new concept with a team or audience, what emphasis comes most naturally?",
    choices: [
      {
        text: "Highlighting practical utility, stability, and risk minimization.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Connecting emotionally and conveying an inspiring, relatable human story.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Articulating key points with precision, clarity, and compelling logic.",
        weights: { throat: 3, solarPlexus: 2 }
      },
      {
        text: "Painting an expansive future vision that broadens their horizons.",
        weights: { thirdEye: 3, crown: 2 }
      }
    ]
  },
  {
    id: 31,
    scenario: "How do you maintain inner stability when unexpected life events create chaos around you?",
    choices: [
      {
        text: "Rely on core health basics—steady sleep, good food, and predictable routines.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "Lean on caring relationships and give myself room for gentle comfort and rest.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Focus firmly on what I can control and voice my practical needs clearly.",
        weights: { solarPlexus: 3, throat: 2 }
      },
      {
        text: "Practice non-attachment, knowing that outer turbulence is temporary and passing.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 32,
    scenario: "When a sudden creative idea flashes into your mind, what is your initial reaction?",
    choices: [
      {
        text: "Immediately outline practical steps to turn it into an achievable project.",
        weights: { root: 2, solarPlexus: 3 }
      },
      {
        text: "Immerse myself in playing with the possibilities and enjoying the imaginative spark.",
        weights: { sacral: 3, crown: 1 }
      },
      {
        text: "Discuss it out loud with a colleague to test and refine the concept.",
        weights: { throat: 3, thirdEye: 1 }
      },
      {
        text: "Let it rest quietly in my mind so it can mature into deeper clarity.",
        weights: { thirdEye: 3, crown: 2 }
      }
    ]
  },
  {
    id: 33,
    scenario: "What brings you the deepest sense of contentment at the end of a long week?",
    choices: [
      {
        text: "Knowing that my responsibilities are met and my foundational affairs are order.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "Having shared warm memories, laughter, and heartfelt connection with loved ones.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Knowing I spoke up honestly, expressed myself, and stood by my principles.",
        weights: { throat: 3, solarPlexus: 2 }
      },
      {
        text: "Having gained fresh perspective, mental harmony, and a sense of stillness.",
        weights: { thirdEye: 2, crown: 3 }
      }
    ]
  },
  {
    id: 34,
    scenario: "How do you balance personal desires with responsibilities toward others?",
    choices: [
      {
        text: "Fulfill essential duties first before dedicating time to personal pursuits.",
        weights: { root: 3, solarPlexus: 2 }
      },
      {
        text: "Seek a compassionate balance where everyone's emotional needs are respected.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "Communicate my boundaries candidly so expectations are realistic from the start.",
        weights: { throat: 3, heart: 1 }
      },
      {
        text: "View obligations with equanimity, realizing harmony exists beyond inner friction.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 35,
    scenario: "When listening to music or viewing a work of art, what element touches you most deeply?",
    choices: [
      {
        text: "The rhythmic bassline, deep beat, and physical grounding vibration.",
        weights: { root: 3, sacral: 2 }
      },
      {
        text: "The emotional warmth, soulful melody, and evocative feeling.",
        weights: { heart: 3, sacral: 2 }
      },
      {
        text: "The technical precision, intricate lyrical craft, and compositional structure.",
        weights: { throat: 2, solarPlexus: 3 }
      },
      {
        text: "The transcendent atmosphere, atmospheric depth, and sense of mystery.",
        weights: { crown: 3, thirdEye: 2 }
      }
    ]
  },
  {
    id: 36,
    scenario: "Looking ahead over your personal evolution, what feeling feels most fundamental to cultivate?",
    choices: [
      {
        text: "Feeling rooted, stable, and deeply secure in my physical and life foundation.",
        weights: { root: 4, solarPlexus: 1 }
      },
      {
        text: "Experiencing vibrant creativity, emotional joy, and rich loving connections.",
        weights: { sacral: 3, heart: 2 }
      },
      {
        text: "Living authentically, speaking my truth, and making a meaningful contribution.",
        weights: { throat: 3, solarPlexus: 2 }
      },
      {
        text: "Cultivating wisdom, inner clarity, and alignment with overarching peace.",
        weights: { thirdEye: 2, crown: 3 }
      }
    ]
  }
];
