interface IJWTConfig {
  secret_key: string
  expiration: string
}

// rentx_api for md5 hash
export default {
  secret_key: '616d927315f7ed85c389cc35392c073f',
  expiration: '1d',
} as IJWTConfig
