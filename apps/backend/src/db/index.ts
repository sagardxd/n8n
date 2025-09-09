import { AppDataSource, logger } from "@repo/config"

export const InitializeDB = async() => {
    try {
        AppDataSource.initialize();
    } catch (error) {
        logger.error('InitializeDB', "initializing the db!", error)
    }
}