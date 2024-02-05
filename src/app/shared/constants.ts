import { environment } from "../../environments/environment";
export const mobileRegex = '^[1-9][0-9]{9}$';

export const OTP_TIMER = 60 * 3; // 3 min in seconds
export const OTP_RESEND_MAX_TIME = 1000 * 60 * 10; // 10 min in milliseconds
export const TICKET_EXPIRE_TIME = 60 * 10; // 10 min seconds
export const MAX_OTP_LIMIT = 3;
export const MIN_COLS = 5;
export const MAX_COLS = 30;
export const passwordMinLength = 8;
export const userNameMinLength = 3;
export const userNameMaxLength = 20;

export const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
export const OTPRegex = '^[1-9][0-9]{3}$';
export const ZipRegex = '^[1-9][0-9]{5}$';
export const nameRegex = `^[a-zA-Z ]{${userNameMinLength},${userNameMaxLength}}$`;
export const passwordRegex = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{${passwordMinLength},}$`;
export const charRegex = /^[A-Z]$/;
export const numRegex = '^\\d+$';

export const MinAge = 10;
export const MinDate = new Date(1960, 0, 1);
