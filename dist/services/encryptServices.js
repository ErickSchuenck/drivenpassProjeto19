import Cryptr from "cryptr";
import bcrypt from "bcrypt";
var saltRounds = 10;
var cryptr = new Cryptr(process.env.SECRET);
export function encrypt(password) {
    return cryptr.encrypt(password);
}
export function decrypt(password) {
    return cryptr.decrypt(password);
}
export function compare(encryptedPassword, password) {
    var verification = bcrypt.compareSync(password, encryptedPassword);
    if (!verification) {
        throw {
            status: 401,
            type: "Unauthorized",
            message: "Incorrect password, please double check the input"
        };
    }
}
export function hash(password) {
    return bcrypt.hashSync(password, saltRounds);
}
