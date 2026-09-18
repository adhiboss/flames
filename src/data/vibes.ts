import type { FlamesResultType } from '../utils/flamesLogic';

export interface VibeData {
  quote: string;
  label: string;
}

export function getVibeForResult(result: FlamesResultType | null): VibeData {
  if (!result) {
    return { quote: "Maybe fate knows something you don't.", label: "A LITTLE MYSTERY ♥" };
  }
  
  switch(result) {
    case 'L': return { quote: "Someone might be catching feelings. 👀", label: "LOVE VIBE ♥" };
    case 'F': return { quote: "Certified bestie energy detected.", label: "BESTIE VIBE ♥" };
    case 'A': return { quote: "Someone has a soft spot. 👀", label: "SOFT SPOT ♥" };
    case 'M': return { quote: "Whoa... fate skipped a few chapters. 💍", label: "FATE HAS PLANS ♥" };
    case 'E': return { quote: "Maybe keep a little distance today.", label: "PROCEED WITH CAUTION ♥" };
    case 'S': return { quote: "Same chaos. Different problems.", label: "SIBLING ENERGY ♥" };
    default: return { quote: "Maybe fate knows something you don't.", label: "A LITTLE MYSTERY ♥" };
  }
}
