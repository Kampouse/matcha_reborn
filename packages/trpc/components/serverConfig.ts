export const serverConfig: ServerOptions = {
    dev: true,
    port: 3000,
    prefix: "/trpc",
};

export interface ServerOptions {
    dev?: boolean;
    port?: number;
    prefix?: string;
}

