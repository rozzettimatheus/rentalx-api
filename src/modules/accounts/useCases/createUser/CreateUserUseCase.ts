import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
  driver_license: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository
  ) {}

  async execute({
    driver_license,
    email,
    name,
    password,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.repository.findByEmail(email)

    if (userAlreadyExists) throw new AppError('User already exists')

    const passwordHash = await hash(password, 8)

    await this.repository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    })
  }
}
