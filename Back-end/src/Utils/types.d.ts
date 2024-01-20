export type loginSchema = {
    email: string;
    senha?: string;
    token?: string;
};

declare global{
    namespace Express{
        interface Request{
            iduser:Context;
        }
    }
}