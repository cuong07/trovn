import { uploads } from "../config/cloundinary.js";
export const uploader = async (path) => await uploads(path, "trovn");
