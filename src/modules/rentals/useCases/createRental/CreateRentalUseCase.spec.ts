import { RentalsRepositoryMock } from '@modules/rentals/repositories/mock/RentalsRepositoryMock'
import { DayJSDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJSDateProvider'
import { AppError } from '@shared/errors/AppError'
import { generate } from '@utils/fake'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepository: RentalsRepositoryMock
let createRentalUseCase: CreateRentalUseCase
let dayJSDateProvider: DayJSDateProvider

let add24Hours: Date

describe('Create rentals', () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryMock()
    dayJSDateProvider = new DayJSDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayJSDateProvider
    )

    add24Hours = dayJSDateProvider.getDayAhead(1)
  })

  it('should be able to create a rental', async () => {
    const rental = await createRentalUseCase.run({
      car_id: generate(),
      user_id: generate(),
      expected_return_date: add24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a rental with an using car', () => {
    expect(async () => {
      const car_id = generate()

      await createRentalUseCase.run({
        car_id,
        user_id: generate(),
        expected_return_date: add24Hours,
      })

      await createRentalUseCase.run({
        car_id,
        user_id: generate(),
        expected_return_date: add24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a rental if user is already with an open rental', () => {
    expect(async () => {
      const user_id = generate()

      await createRentalUseCase.run({
        user_id,
        car_id: generate(),
        expected_return_date: add24Hours,
      })

      await createRentalUseCase.run({
        user_id,
        car_id: generate(),
        expected_return_date: add24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a rental with return time less than 24 hours', () => {
    expect(async () => {
      await createRentalUseCase.run({
        user_id: generate(),
        car_id: generate(),
        expected_return_date: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
