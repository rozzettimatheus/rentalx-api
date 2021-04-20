import { randomBytes } from 'crypto'
import multer from 'multer'
import { resolve } from 'path'

interface IMulterConfig {
  storage: multer.StorageEngine
}

interface IMulterParams {
  destination: string
}

export default {
  upload({ destination }: IMulterParams): IMulterConfig {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', destination),
        filename: (request, file, callback) => {
          const fileHash = randomBytes(16).toString('hex')
          const filename = `${fileHash}-${file.originalname}`

          return callback(null, filename)
        },
      }),
    }
  },
}
