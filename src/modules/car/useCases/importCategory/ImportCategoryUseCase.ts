import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}

  async run(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadFromCSV(file)

    categories.map(async category => {
      const { name, description } = category
      const existingCategory = await this.categoriesRepository.findByName(name)

      if (!existingCategory) {
        await this.categoriesRepository.create({ name, description })
      }
    })
  }

  loadFromCSV(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const parserFile = csvParse()

      const categories: IImportCategory[] = []

      stream.pipe(parserFile)

      parserFile
        .on('data', async line => {
          const [name, description] = line
          categories.push({ name, description })
        })
        .on('end', () => {
          // remove tmp file
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', err => {
          reject(err)
        })
    })
  }
}
