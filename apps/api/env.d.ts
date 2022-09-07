declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_URL: string;
        PORT: string;
        CLIENT_ID: string;
        CLIENT_SECRET: string;
        JWT_SECRET: string;
        NODE_ENV: string;
    }
}
