export interface UserProfile {
  username: string;
  joined: String;
  avatar: string;
  background: string;
  gamesPlayed: number;
  scores: {
    gameId: string;
    score: number;
  }[];
}

export const MOCK_USERS: UserProfile[] = [
  {
    username: 'Aggrxssor',
    joined: '2024-11-12',
    avatar: 'avatar5.png',
    background: 'default.jpg',
    gamesPlayed: 42,
    scores: [
      { gameId: 'spaceshooter', score: 420 },
      { gameId: 'spaceshooter', score: 741 },
      { gameId: 'spaceshooter', score: 4240 },
      { gameId: 'spaceshooter', score: 6710 },
      { gameId: 'spaceshooter', score: 955 },
      { gameId: 'spaceshooter', score: 18774 },
      { gameId: 'spaceshooter', score: 7741 },
      { gameId: 'spaceshooter', score: 45240 },
      { gameId: 'spaceshooter', score: 16710 },
      { gameId: 'spaceshooter', score: 4955 },
      { gameId: 'spaceshooter', score: 118774 },
      { gameId: 'spaceshooter', score: 95 },
      { gameId: 'spaceshooter', score: 8774 },
      { gameId: 'spaceshooter', score: 741 },
      { gameId: 'spaceshooter', score: 5240 },
      { gameId: 'spaceshooter', score: 1710 },
      { gameId: 'spaceshooter', score: 455 },
      { gameId: 'spaceshooter', score: 98774 }
    ]
  },
  {
    username: 'PlayerOne',
    joined: '2025-01-03',
    avatar: 'avatar1.png',
    background: 'default.jpg',
    gamesPlayed: 11,
    scores: [
      { gameId: 'spaceshooter', score: 420 },
      { gameId: 'spaceshooter', score: 741 },
      { gameId: 'spaceshooter', score: 4240 },
      { gameId: 'spaceshooter', score: 6710 },
      { gameId: 'spaceshooter', score: 955 },
      { gameId: 'spaceshooter', score: 18774 },
      { gameId: 'spaceshooter', score: 7741 },
      { gameId: 'spaceshooter', score: 45240 },
      { gameId: 'spaceshooter', score: 16710 },
      { gameId: 'spaceshooter', score: 4955 },
      { gameId: 'spaceshooter', score: 918774 }
    ]
  },
  {
    username: 'Euthanasia_Enthusiast',
    joined: '2025-06-15',
    avatar: 'avatar1.png',
    background: 'default.jpg',
    gamesPlayed: 7,
    scores: [
    { gameId: 'spaceshooter', score: 69420 }
    ]
  }
];
