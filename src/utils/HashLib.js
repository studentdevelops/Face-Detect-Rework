import bcrypt from "bcrypt"
import { v4 as uuid4 } from 'uuid';

export async function hashPassword(password, saltRounds = 10) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash.toString();
    } catch (error) {
        console.log({ error, "msg": "Error in creating Hash" })
    }

}

export async function comparePassword(password, storedHash) {
    const result = await bcrypt.compare(password, storedHash);
    return result;
}

export const generateUUID = () => {
    return uuid4();
}