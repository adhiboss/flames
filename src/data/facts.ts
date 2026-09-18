const facts = [
  "FLAMES became a school-day classic in the 2000s.",
  "Before social media, there was FLAMES.",
  "Some people discovered their 'crush' through FLAMES.",
  "FLAMES is one of those games that never really left.",
  "Two names. One ridiculous question. One unforgettable game.",
  "Some childhood games never really grow old."
];

export function getRandomFact(): string {
  return facts[Math.floor(Math.random() * facts.length)];
}
