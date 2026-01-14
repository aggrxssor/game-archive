export interface GameRules {
    id: string;
    title: string;
    sections: {
        heading: string;
        content: string;
    }[];
}

export const MOCK_RULES: GameRules[] = [
    {
        id: 'tron',
        title: 'TRON – Rules & How To Play',
        sections: [
            {
                heading: 'Objective',
                content:
                'The objective of TRON is to force your opponent to crash by making them collide with a wall, your light trail, or their own trail. Each player controls a futuristic bike that leaves a solid trail behind as it moves, gradually filling the arena with obstacles.'
            },
            {
                heading: 'Game Setup',
                content:
                'Two players start on opposite sides of a rectangular arena. Each player controls a lightbike that moves continuously forward and leaves behind a glowing trail that cannot be crossed. Once the match begins, the bikes cannot stop or slow down.'
            },
            {
                heading: 'Controls',
                content:
                'Player One uses the W, A, S, and D keys to turn their bike up, left, down, and right. Player Two uses the arrow keys for the same directional controls. Bikes can only turn at right angles and cannot reverse direction.'
            },
            {
                heading: 'Gameplay',
                content:
                'As the bikes move, they leave behind a solid light trail that becomes a deadly wall. Players must maneuver carefully to avoid hitting any trail or the arena boundaries while attempting to trap their opponent. Strategic turns and prediction of the opponent’s movement are key to survival.'
            },
            {
                heading: 'Collisions',
                content:
                'A player immediately loses the round if their bike collides with the arena wall, their own trail, or the opponent’s trail. In the rare case that both players collide at the same time, the round is considered a draw.'
            },
            {
                heading: 'Winning the Game',
                content:
                'The winner is the player who survives longer in the arena. In multi-round matches, the first player to win a predetermined number of rounds is declared the overall winner.'
            }
        ]
    },


    {
        id: 'chess',
        title: 'Chess – Rules & How To Play',
        sections: [
        {
            heading: 'Objective',
            content:
            'The objective of chess is to checkmate your opponent’s king. Checkmate occurs when the king is placed under direct threat of capture and there is no legal move available to remove that threat. Capturing the king is never required; the game ends as soon as checkmate is achieved.'
        },
        {
            heading: 'Game Setup',
            content:
            'Chess is played on an 8×8 board with alternating light and dark squares. Each player begins with sixteen pieces: one king, one queen, two rooks, two bishops, two knights, and eight pawns. All pieces have unique movement rules and strategic roles.'
        },
        {
            heading: 'Turns and Movement',
            content:
            'White always moves first. Players alternate turns, moving one piece per turn according to its legal movement rules. Captures occur when a piece moves onto a square occupied by an opposing piece, removing it from the board.'
        },
        {
            heading: 'Special Rules',
            content:
            'Chess includes special moves such as castling, en passant, and pawn promotion. These rules introduce deeper strategic options and must be executed according to strict conditions defined by standard chess rules.'
        },
        {
            heading: 'Winning and Draws',
            content:
            'A player wins by delivering checkmate. Games may also end in a draw under several conditions, including stalemate, threefold repetition, the fifty-move rule, or insufficient mating material.'
        }
        ]
    },

    {
        id: 'spaceshooter',
        title: 'Space Shooter – Rules & How To Play',
        sections: [
        {
            heading: 'Objective',
            content:
            'The objective of Space Shooter is to survive as long as possible while destroying incoming enemy ships and avoiding obstacles. Players earn points by eliminating enemies, collecting power-ups, and maintaining uninterrupted survival streaks.'
        },
        {
            heading: 'Controls and Movement',
            content:
            'Players control a spacecraft that can move freely within the playable area. Movement is typically limited to horizontal and vertical directions. Weapons fire automatically or via player input, depending on the game mode.'
        },
        {
            heading: 'Gameplay',
            content:
            'Enemies spawn in waves and follow predefined or semi-random movement patterns. As the game progresses, enemy density, speed, and attack complexity increase. Players must continuously reposition and prioritize targets to avoid being overwhelmed.'
        },
        {
            heading: 'Power-Ups and Scoring',
            content:
            'Destroyed enemies may drop power-ups that enhance weapons, improve survivability, or grant temporary abilities. Scores increase through enemy kills, combo chains, and survival time. Skilled play is rewarded with higher multipliers.'
        },
        {
            heading: 'Game Over and Winning',
            content:
            'The game ends when the player’s ship is destroyed. There is no traditional “win” condition; instead, success is measured by achieving the highest possible score. Scores may be submitted to the leaderboard for ranking against other players.'
        }
        ]
    }
];

