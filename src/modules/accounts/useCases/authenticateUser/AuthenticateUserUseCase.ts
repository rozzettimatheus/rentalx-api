import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

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

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.repository.findByEmail(email)

    if (!user) throw new AppError('Email or password incorrect', 401)

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError('Email or password incorrect', 401)

    // rentx_api for md5 hash
    const token = sign({}, '616d927315f7ed85c389cc35392c073f', {
      subject: user.id,
      expiresIn: '1d',
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
