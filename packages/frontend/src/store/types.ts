export interface GetDaysEventsInput {
  day: string;
}

export type Event = {
  type: 'rep' | 'misc';
  start: string;
  end: string;
  duration: number;
  goal: number;
  success: boolean;
  comment: string;
  behavior: string[];
};

export interface GetDaysEventsResponse {
  events: Event[];
}

export interface AddRepEventInput {
  start_utc: number;
  day: string;
  start: string;
  end: string;
  duration: number;
  goal: number;
  success: boolean;
  comment: string;
  behavior: string[];
}

export interface AddRepEventResponse {
  message: string;
}
