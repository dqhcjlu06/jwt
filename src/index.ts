import bcrypt from 'bcrypt'
import jwt, { verify } from 'jsonwebtoken'

const RECOMMENDED_ROUNDS = 12

/**
 * 验证密码
 * @param hash 
 * @param password 
 */
export const verifyPassword = (hash: string, password: string) => {
  return bcrypt.compareSync(password, hash)
}

export const createToken = (data: string | object | Buffer, privateKey: string, expiresIn: string = '1 days', algorithm: string = 'RS256') => {
  return jwt.sign(
    data,
    privateKey,
    { expiresIn, algorithm }
  )
}

/**
 * 验证token
 * @param token 
 * @param publicKey 
 * @param algorithms 
 */
export const verifyToken = (token: string, publicKey: string, algorithms: string[] = ['algorithms']) => {
  return verify(
    token,
    publicKey,
    { algorithms }
  )
}

export const isBcryptHash = (str: string): boolean => {
  const protocol = str.split('$')
  return protocol.length === 4 &&
    protocol[0] === '' &&
    ['2a', '2b', '2y'].indexOf(protocol[1]) > -1 &&
    /^\d+$/.test(protocol[2]) &&
    protocol[3].length === 53
}

export const generateHash = async (password: string = '') => {
  if (isBcryptHash(password)) {
    throw new Error('bcrypt tried to hash another bcrypt hash')
  }
  return bcrypt.hashSync(password, RECOMMENDED_ROUNDS)
}