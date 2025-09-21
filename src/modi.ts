import dotenv from 'dotenv';

dotenv.config()
export abstract class Modi{
    static dbConnectionOpen:string = process.env.DATABASE_ON_REQUEST  || 'false'
}