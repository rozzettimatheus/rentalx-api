import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryMock } from '@modules/accounts/repositories/mock/UserRepositoryMock'
import { AppError } from '@shared/errors/AppError'
import { generate } from '@utils/fake'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryMock: UsersRepositoryMock
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock()
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock)
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: generate(),
      email: generate(),
      password: generate(),
      driver_license: generate(),
    }

    await createUserUseCase.run(user)

    const result = await authenticateUserUseCase.run({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a non-existing user', () => {
    expect(async () => {
      await authenticateUserUseCase.run({
        email: generate(),
        password: generate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: generate(),
        email: generate(),
        password: generate(),
        driver_license: generate(),
      }

      await createUserUseCase.run(user)

      await authenticateUserUseCase.run({
        email: user.email,
        password: 'incorrect',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
