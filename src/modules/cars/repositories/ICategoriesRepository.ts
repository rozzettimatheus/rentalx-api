import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { Category } from '../infra/typeorm/entities/Category'

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create(dto: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository }
