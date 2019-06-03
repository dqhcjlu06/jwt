/// <reference types="node" />
/**
 * 验证密码
 * @param hash
 * @param password
 */
export declare const verifyPassword: (hash: string, password: string) => boolean;
export declare const createToken: (data: string | object | Buffer, privateKey: string | Buffer, expiresIn?: string, algorithm?: string) => string;
/**
 * 验证token
 * @param token
 * @param publicKey
 * @param algorithms
 */
export declare const verifyToken: (token: string, publicKey: string | Buffer, algorithms?: string[]) => string | object;
export declare const isBcryptHash: (str: string) => boolean;
export declare const generateHash: (password?: string) => Promise<string>;
//# sourceMappingURL=index.d.ts.map