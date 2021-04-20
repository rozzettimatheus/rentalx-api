import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { deleteFile } from '@utils/file'

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async run({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.repository.findById(user_id)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    // user already exists because middleware is active
    user.avatar = avatar_file

    await this.repository.create(user)
  }
}
