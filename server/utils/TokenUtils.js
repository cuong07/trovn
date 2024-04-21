import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      role: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "30d" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      role: user.role,
    },
    process.env.SECRET_REFRESHTOKEN_KEY,
    { expiresIn: "365d" }
  );
};
