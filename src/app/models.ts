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
    fullName: string;
    firstName: string;
    lastName: string;
    picture: string;
    gid: string;
}

export interface Comment {
    userId: string;
    fullName: string;
    picture: string;
    content: string;
    date: string;
}
