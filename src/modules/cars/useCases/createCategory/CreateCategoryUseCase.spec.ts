import { CategoriesRepositoryMock } from '@modules/cars/repositories/mock/CategoriesRepositoryMock'
import { AppError } from '@shared/errors/AppError'
import { generate } from '@utils/fake'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryMock: CategoriesRepositoryMock

describe('Create a category', () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock)
  })

  it('should be able to create a new category', async () => {
    const name = generate()
    const description = generate()

    await createCategoryUseCase.run({
      name,
      description,
    })

    const created = await categoriesRepositoryMock.findByName(name)

    expect(created).toHaveProperty('id')
  })

  it('should not be able to create a new category with an existing name', () => {
    expect(async () => {
      const category = {
        name: generate(),
        description: generate(),
      }

      await createCategoryUseCase.run(category)

      // expects error - duplicated category
      await createCategoryUseCase.run(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
