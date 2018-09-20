export interface Competition {
    id: number;
    name: string;
    area?: string;
    pictureUrl?: string;
}

export interface UefaStanding {
    stage: string;
    type: string;
    group: string;
    table: Standing;
}

export interface Standing {
    position: number;
    team: Team;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

export interface Team {
    id: number;
    name: string;
    crestUrl: string;
}

export interface Match {
    id: number;
    competition: string;
    date: string;
    status: string;
    homeTeam: string;
    awayTeam: string;
    score: Score;
}

export interface Score {
    winner: string;
    result: {
        homeTeam: number;
        awayTeam: number;
    };
}


export interface User {
    id: string;
    googleId?: string;
    givenName?: string;
    familyName?: string;
    pictureUrl?: string;
}
