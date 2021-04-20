import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import jwtConfig from '@config/jwt'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    email: string
    name: string
  }
  token: string
}
@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async run({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.repository.findByEmail(email)

    if (!user) throw new AppError('Email or password incorrect', 401)

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError('Email or password incorrect', 401)

    const token = sign({}, jwtConfig.secret_key, {
      subject: user.id,
      expiresIn: jwtConfig.expiration,
    })

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    } as IResponse
  }
}
