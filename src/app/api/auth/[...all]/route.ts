import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/feature/auth/lib/auth";

export const { POST, GET } = toNextJsHandler(auth);
