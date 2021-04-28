import { ICreateCarImageDTO } from '../dtos/ICreateCarImageDTO'
import { CarImage } from '../infra/typeorm/entities/CarImage'

export interface ICarImagesRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>
}
