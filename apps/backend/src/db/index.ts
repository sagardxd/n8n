import { AppDataSource, logger } from "@repo/config";

export const InitializeDB = async () => {
    try {
        await AppDataSource.initialize();
        logger.info('InitializeDB Database initialized successfully!');
    } catch (error) {
        logger.error('InitializeDB', 'Error initializing the database!', error);
    }
};
