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

export const checkUser = async(email: string, password: string) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const result = await userRepository.find({
            where: {
                email : email,
                password: password
            },
            take: 1
        })
        const user = result[0] ?? null
        console.log(user)

        if (user) {
            return user;
        }
        return null
    } catch (error) {
        logger.error('checkUser', 'fail searching user in db', error)
    }
}

export const checkUserExist = async(email: string) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const result = await userRepository.find({
            where: {
                email : email
            },
            take: 1
        })
        const user = result[0] ?? null
        console.log(user)

        if (user) {
            return user;
        }
        return null
    } catch (error) {
        logger.error('checkUserExist', 'fail searching user in db', error)
    }
}