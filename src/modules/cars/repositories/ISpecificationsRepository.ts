import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'
import { Specification } from '../infra/typeorm/entities/Specification'

interface ISpecificationsRepository {
  create(dto: ICreateSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository }
