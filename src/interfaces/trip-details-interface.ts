export interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export interface Link {
  id: string;
  title: string | null;
  url: string;
}

export interface Trip {
  id: string;
  destination: string;
  ends_at: string;
  starts_at: string;
  is_confirmed: boolean;
}

export interface Activity {
  id: string;
  title: string | null;
  occurs_at: string;
}
