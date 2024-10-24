export interface GetDaysEventsInput {
  day: string;
}

export type Event = {
  type: 'rep' | 'misc';
  day: string;
  start: string;
  start_utc: number;
  duration: number;
  goal: number;
  success: boolean;
  comment: string;
  behavior: string[];
  user: string;
};

export type Stats = {
  rep_count: number;
  success_count: number;
  average_duration: number;
};

export interface GetDaysEventsResponse {
  events: Event[];
  stats: Stats;
}

export interface AddRepEventInput {
  start_utc: number;
  day: string;
  start: string;
  duration: number;
  goal: number;
  success: boolean;
  comment: string;
  behavior: string[];
  user: string;
}

export interface AddRepEventResponse {
  message: string;
}
