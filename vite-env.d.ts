//Variables
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}
//.env
interface ImportMeta {
    readonly env: ImportMetaEnv;
}