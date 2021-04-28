import { Connection, createConnection, getConnectionOptions } from 'typeorm'

interface IOptions {
  host: string
}

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions
//   newOptions.host = 'rentx_postgres'
//   createConnection({
//     ...options,
//   })
// })

// usar no seeds - retornar conexao
export default async (host = 'rentx_postgres'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  )
}
