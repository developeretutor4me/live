export interface Token {
    id: string;
    email?: string;
    role: 'admin' | 'teacher' | 'student' | 'parent';
  }
  