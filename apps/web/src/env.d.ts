/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TOK: string;
    readonly VITE_NAME: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
