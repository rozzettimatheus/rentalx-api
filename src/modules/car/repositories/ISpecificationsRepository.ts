import { Specification } from '../model/Specification'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create(dto: ICreateSpecificationDTO): void
  findByName(name: string): Specification
}

export { ICreateSpecificationDTO, ISpecificationsRepository }
