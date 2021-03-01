export interface IJokesRequest {}
export interface IJokesResponse {
  status?: number;
  data?: Array<IJoke>;
}

export interface IJoke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}
