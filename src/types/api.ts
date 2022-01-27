import { StatusCodes } from "http-status-codes";
export interface UserTokenData {
  token: string;
  portalUserId?: string;
}

export type StatusTypes = "success" | "error";

export interface AppCategory {
  id: number;
  categoryName: string;
  optionName: string;
}

export type { StatusCodes };