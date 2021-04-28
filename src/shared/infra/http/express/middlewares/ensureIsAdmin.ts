import { Request, Response, NextFunction } from 'express'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'

export async function ensureIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(id)

  if (!user.isAdmin) {
    // 403 - forbidden
    throw new AppError(`Only admins can perform this operation`, 403)
  }

  return next()
}
