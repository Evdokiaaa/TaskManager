import { IUser } from "./src/models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // или просто `any`, если пока не типизирован
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      PORT: string;
      ATLAS_URI: string;
    }
  }
}
