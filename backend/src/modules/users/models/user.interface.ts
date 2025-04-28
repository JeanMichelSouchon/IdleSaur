export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string; 
    isAdmin: boolean;
    created_at: Date;
  }