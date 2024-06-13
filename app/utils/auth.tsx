import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXT_JWT_SECRET_KEY;

// middleware to verify jwt token upon request on protected routes
// check if the token is valid
export function verifyToken(token: string) {
  if (!token) {
    throw new Error('No token found');
  }
  return jwt.verify(token, SECRET_KEY!);
}