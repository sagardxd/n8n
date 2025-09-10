import { AppDataSource, Credential, logger, User } from '@repo/config';
import type{ Credential as CredentialType } from '@repo/types';

export const createCredential = async (input: CredentialType, userId: string) => {
    try {
        const credentialRepository = AppDataSource.getRepository(Credential);

        const credential = new Credential();
        credential.platform = input.platform;
        credential.data = input.data
        credential.user = { id: userId } as User

        const result = await credentialRepository.save(credential);

        return result;
    } catch (error) {
        logger.error('createCredential', 'fail creating credential in db', error)
    }
}

export const deleteCredential = async (credentialId: string, userId: string) => {
    try {
        const credentialRepository = AppDataSource.getRepository(Credential);
        const result = await credentialRepository.delete({id: credentialId, user: {
            id: userId
        }})
        console.log('delete', result)
        return result; 
    } catch (error) {
        logger.error('createCredential', 'fail creating credential in db', error)
    }
}