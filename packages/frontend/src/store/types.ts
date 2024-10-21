export interface GetDaysEventsInput {
  day: string;
}

export type Event = {
  type: 'rep' | 'misc';
  start: string;
  end: string;
  duration: string;
  goal: string;
  success: boolean;
  comment: string;
  behavior: string[];
};

export interface GetDaysEventsResponse {
  events: Event[];
}
