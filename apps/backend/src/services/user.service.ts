import { AppDataSource, logger, User } from "@repo/config"

export const createUser = async(email: string, password: string) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const user = new User();
        user.email = email;
        user.password = password;
        
        await userRepository.save(user)
        return user;

    } catch (error) {
        logger.error('createUser', 'fail creating user in db', error)
    }
}