import { container } from 'tsyringe'

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '../../modules/car/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/car/repositories/implementations/CategoriesRepository'
import { SpecificationsRepository } from '../../modules/car/repositories/implementations/SpecificationsRepository'
import { ISpecificationsRepository } from '../../modules/car/repositories/ISpecificationsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
