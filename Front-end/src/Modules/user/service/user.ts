import { userRepo } from "../repository";

export default class UserService {
  async findUserById(userId: string): Promise<UserType | undefined> {
    const gettingUserById = userRepo.findUserById(userId);
    return gettingUserById;
  }

  async findAll(): Promise<UserType[] | undefined> {
    return userRepo.findAll();
  }

  async createUser(user: UserType): Promise<UserType | undefined> {
    return userRepo.createUser(user);
  }

  async updateUser(
    userId: string,
    user: UserType
  ): Promise<UserType | undefined> {
    return userRepo.updateUser(userId, user);
  }

  async deleteUser(userId: string): Promise<UserType | undefined> {
    return userRepo.deleteUser(userId);
  }
}
