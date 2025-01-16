export interface CreateHabitPayload {
  name: string;
  days: number[];
  everyday: boolean;
}

export interface UpdateHabitPayload {
  id: number;
  name: string;
  days: number[];
  everyday: boolean;
}
