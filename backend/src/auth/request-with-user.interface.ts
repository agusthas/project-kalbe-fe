import { User } from '@prisma/client';
import { Request } from 'express';

type RequestUser = Omit<User, 'password'> | null;

interface RequestWithUser extends Request {
  user: RequestUser;
}

export default RequestWithUser;
