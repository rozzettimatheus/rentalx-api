import csvParse from 'csv-parse'
import fs from 'fs'

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async run(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadFromCSV(file)

    categories.map(async category => {
      const { name, description } = category
      const existingCategory = this.categoriesRepository.findByName(name)

      if (!existingCategory) {
        this.categoriesRepository.create({ name, description })
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
          resolve(categories)
        })
        .on('error', err => {
          reject(err)
        })
    })
  }
}

export { ImportCategoryUseCase }
