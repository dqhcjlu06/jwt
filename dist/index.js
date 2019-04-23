"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const RECOMMENDED_ROUNDS = 12;
/**
 * 验证密码
 * @param hash
 * @param password
 */
exports.verifyPassword = (hash, password) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.createToken = (data, privateKey, expiresIn = '1 days', algorithm = 'RS256') => {
    return jsonwebtoken_1.default.sign(data, privateKey, { expiresIn, algorithm });
};
/**
 * 验证token
 * @param token
 * @param publicKey
 * @param algorithms
 */
exports.verifyToken = (token, publicKey, algorithms = ['RS256']) => {
    return jsonwebtoken_1.verify(token, publicKey, { algorithms });
};
exports.isBcryptHash = (str) => {
    const protocol = str.split('$');
    return protocol.length === 4 &&
        protocol[0] === '' &&
        ['2a', '2b', '2y'].indexOf(protocol[1]) > -1 &&
        /^\d+$/.test(protocol[2]) &&
        protocol[3].length === 53;
};
exports.generateHash = (password = '') => __awaiter(this, void 0, void 0, function* () {
    if (exports.isBcryptHash(password)) {
        throw new Error('bcrypt tried to hash another bcrypt hash');
    }
    return bcrypt_1.default.hashSync(password, RECOMMENDED_ROUNDS);
});
//# sourceMappingURL=index.js.map