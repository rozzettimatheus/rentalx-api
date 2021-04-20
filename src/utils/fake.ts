import { randomBytes } from 'crypto'

export const generate = (): string => randomBytes(20).toString('hex')
