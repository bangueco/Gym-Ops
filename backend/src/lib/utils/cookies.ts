import config from "./config";

type CookieOptions = {
  httpOnly: boolean;
  maxAge: number;
  secure: boolean;
  sameSite: "strict" | "none" | "lax";
  path: string
};

type CookieConfig = {
  [key: string]: {
    name: string;
    options: CookieOptions;
  };
};

export const cookieConfig: CookieConfig = {
  refreshToken: {
    name: "refreshToken",
    options: {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: config.environment !== "production",
      sameSite: config.environment === "production" ? "strict" : "none",
      path: "/"
    },
  },
};