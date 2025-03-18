export interface Candidate {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  email: string | null;
  company: string | null;
  location: string | null;
}
