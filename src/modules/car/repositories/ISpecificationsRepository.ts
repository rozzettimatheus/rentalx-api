import { Specification } from '../entities/Specification'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create(dto: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
}

export { ICreateSpecificationDTO, ISpecificationsRepository }
