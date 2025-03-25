import { PlayerScoreDTO } from "./player-score.dto";

export interface User {
    id: number;
    isAdmin: boolean;
    username: string;
    email: string;
    neutral_soul_points: number;
    dark_soul_points: number;
    bright_soul_points: number;
    created_at: string;
    player_score: PlayerScoreDTO;
}