export type GameLocation = 'vs' | '@';

export interface Game {
  date: string;
  opponent: string;
  score: string; // Timpview score first (e.g., "23-50")
  result: 'W' | 'L';
  location: GameLocation;
  logo?: string;
  type?: string;
  notes?: string;
  momentImage?: string;
}

// 2025 season – Timpview scores listed first
export const SEASON_2025: Game[] = [
  { date: 'AUG 15', opponent: 'West', score: '23-50', result: 'L', location: '@', type: 'Preseason', logo: '/school-logos/west.svg' },
  { date: 'AUG 22', opponent: 'American Fork', score: '25-48', result: 'L', location: '@', type: 'Preseason', notes: '6A', logo: '/school-logos/american-fork.svg' },
  { date: 'AUG 29', opponent: 'Lone Peak', score: '10-42', result: 'L', location: 'vs', type: 'Preseason', notes: '6A', logo: '/school-logos/lone-peak.svg' },
  { date: 'SEP 05', opponent: 'Payson*', score: '59-13', result: 'W', location: 'vs', logo: '/school-logos/payson.svg' },
  { date: 'SEP 12', opponent: 'Wasatch*', score: '33-14', result: 'W', location: 'vs', logo: '/school-logos/wasatch.svg' },
  { date: 'SEP 19', opponent: 'Maple Mountain*', score: '44-20', result: 'W', location: '@', logo: '/school-logos/maple-mountain.svg' },
  { date: 'SEP 26', opponent: 'Orem*', score: '9-22', result: 'L', location: '@', logo: '/school-logos/orem.svg' },
  { date: 'OCT 03', opponent: 'Springville*', score: '0-28', result: 'L', location: 'vs', logo: '/school-logos/springville.svg' },
  { date: 'OCT 09', opponent: 'Pleasant Grove*', score: '19-7', result: 'W', location: '@', logo: '/school-logos/pleasant-grove.svg' },
  { date: 'OCT 15', opponent: 'Spanish Fork*', score: '34-7', result: 'W', location: 'vs', logo: '/school-logos/spanish-fork.svg' },
  { date: 'OCT 24', opponent: 'Wasatch**', score: '40-15', result: 'W', location: 'vs', type: 'Playoffs', logo: '/school-logos/wasatch.svg' },
  { date: 'OCT 31', opponent: 'Orem**', score: '22-40', result: 'L', location: '@', type: 'Playoffs', logo: '/school-logos/orem.svg' },
];
