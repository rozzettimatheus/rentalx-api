import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import createConnection from '../'

// inserir manualmente um usuario admin no banco
async function create() {
  const connection = await createConnection('localhost')

  const id = uuidv4()
  const password = await hash('admin', 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [id, 'admin', 'admin@rentx.com', password, true, 'now()', 'XXX-XXX']
  )

  // sempre fechar a conexao
  await connection.close()
}

create().then(() => console.log('User admin created'))
