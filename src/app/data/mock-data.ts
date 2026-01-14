import { Game } from "../models/game-model";

export const MOCK_GAMES: Game[] = [
  {
    id: 'chess',
    title: 'Chess',
    description: 'Classic chess game. Click "View rules" to learn more.',
    thumbnailUrl: 'assets/chess-thumbnail.png',
    type: 'downloadable',
    downloadUrl: 'https://github.com/gelllert98/Chess.git',
    uploadDate: new Date('2024-02-01')
  },
  {
    id: 'tron',
    title: 'Tron',
    description: 'Two-player local light bike duel. Don’t hit walls or trails.',
    thumbnailUrl: 'assets/tron-thumbnail.png',
    type: 'browser',
    playUrl: '/games/battleships',
    uploadDate: new Date('2024-01-01')
  },
  {
    id: 'spaceshooter',
    title: 'Space Shooter',
    description: 'Original Space Shooter game, reimagined in a downloadable .exe file',
    thumbnailUrl: 'assets/spaceshooter-thumbnail.png',
    type: 'downloadable',
    downloadUrl: 'https://github.com/gelllert98/SpaceShooter.git',
    uploadDate: new Date('2024-01-01')
  }
];