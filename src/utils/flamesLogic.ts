export type FlamesResultType = 'F' | 'L' | 'A' | 'M' | 'E' | 'S';

export interface FlamesCalculation {
  result: FlamesResultType;
  remainingCount: number;
  cancelledLetters: string[];
  fullMeaning: string;
  eliminationSequence: FlamesResultType[];
}

const FLAMES_MEANINGS: Record<FlamesResultType, string> = {
  F: 'Friends',
  L: 'Love',
  A: 'Affection',
  M: 'Marriage',
  E: 'Enemies',
  S: 'Siblings'
};

export function calculateFlames(name1: string, name2: string): FlamesCalculation {
  // 1. Sanitize both names: lowercase + keep only a-z characters
  const n1 = name1.toLowerCase().replace(/[^a-z]/g, '');
  const n2 = name2.toLowerCase().replace(/[^a-z]/g, '');

  // 2. Build frequency maps
  const map1: Record<string, number> = {};
  const map2: Record<string, number> = {};

  for (const char of n1) {
    map1[char] = (map1[char] || 0) + 1;
  }
  for (const char of n2) {
    map2[char] = (map2[char] || 0) + 1;
  }

  // 3. Cancel common letters and count remaining
  const cancelledLetters: string[] = [];
  let remainingCount = 0;

  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(97 + i);
    const count1 = map1[char] || 0;
    const count2 = map2[char] || 0;
    
    // Add common characters to cancelledLetters
    const minCount = Math.min(count1, count2);
    for (let j = 0; j < minCount; j++) {
      cancelledLetters.push(char);
    }

    // Remaining is the sum of leftover frequencies
    remainingCount += Math.abs(count1 - count2);
  }

  // 4. Edge cases
  if (remainingCount === 0) {
    // Empty or identical names after sanitization (e.g. "Adhi" and "Adhi")
    // Fallback rule: Treat as "Friends" (F) since there are no remaining characters
    // to step through the FLAMES acronym. This ensures deterministic behavior.
    return {
      result: 'F',
      remainingCount: 0,
      cancelledLetters,
      fullMeaning: FLAMES_MEANINGS['F'],
      eliminationSequence: ['S', 'E', 'M', 'A', 'L'] // mock elimination sequence for zero count
    };
  }

  // 5. Circular elimination
  const flamesArray: FlamesResultType[] = ['F', 'L', 'A', 'M', 'E', 'S'];
  let currentIndex = 0;
  const eliminationSequence: FlamesResultType[] = [];

  while (flamesArray.length > 1) {
    // The count is 1-based, index is 0-based
    currentIndex = (currentIndex + remainingCount - 1) % flamesArray.length;
    eliminationSequence.push(flamesArray[currentIndex]);
    flamesArray.splice(currentIndex, 1); // eliminate
  }

  const result = flamesArray[0];

  return {
    result,
    remainingCount,
    cancelledLetters,
    fullMeaning: FLAMES_MEANINGS[result],
    eliminationSequence
  };
}
