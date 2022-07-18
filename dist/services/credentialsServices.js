var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { selectCredentialByTitleRestrictedByOwnersId } from "../repositories/credentialsRepository.js";
import * as encryptServices from "./encryptServices.js";
import * as credentialsRepository from "../repositories/credentialsRepository.js";
export function createCredential(data) {
    return __awaiter(this, void 0, void 0, function () {
        var url, title, userName, password, ownerId, userId, encriptedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = data.url, title = data.title, userName = data.userName, password = data.password, ownerId = data.ownerId, userId = data.userId;
                    return [4 /*yield*/, checkIfCredentialIsUnique(title, userId)];
                case 1:
                    _a.sent();
                    encriptedPassword = encryptServices.encrypt(password);
                    return [4 /*yield*/, credentialsRepository.insertCredential(url, title, userName, encriptedPassword, ownerId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function checkIfCredentialIsUnique(title, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var credentialAlreadyExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, selectCredentialByTitleRestrictedByOwnersId(userId, title)];
                case 1:
                    credentialAlreadyExists = _a.sent();
                    if (credentialAlreadyExists) {
                        throw {
                            status: 400,
                            type: "bad request",
                            message: "credential already exists"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function getAllCredentials(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var allCredentials, decryptedCredentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, credentialsRepository.getAllCredentialsByUserId(userId)];
                case 1:
                    allCredentials = _a.sent();
                    decryptedCredentials = allCredentials.map(function (item) { return item.password = encryptServices.decrypt(item.password); });
                    return [2 /*return*/, decryptedCredentials];
            }
        });
    });
}
export function getCredentialById(userId, credentialId) {
    return __awaiter(this, void 0, void 0, function () {
        var credential, id, ownerId, password, title, url, userName, decryptedPassword, decryptedCredential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, credentialsRepository.getCredentialById(userId, credentialId)];
                case 1:
                    credential = _a.sent();
                    if (!credential) {
                        throw {
                            status: 404,
                            type: 'Not Found',
                            message: 'Credential not found'
                        };
                    }
                    id = credential.id, ownerId = credential.ownerId, password = credential.password, title = credential.title, url = credential.url, userName = credential.userName;
                    decryptedPassword = encryptServices.decrypt(password);
                    decryptedCredential = { id: id, ownerId: ownerId, decryptedPassword: decryptedPassword, title: title, url: url, userName: userName };
                    return [2 /*return*/, decryptedCredential];
            }
        });
    });
}
export function deleteCredentialById(userId, credentialId) {
    return __awaiter(this, void 0, void 0, function () {
        var credential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, credentialsRepository.getCredentialById(userId, credentialId)];
                case 1:
                    credential = _a.sent();
                    if (!credential) {
                        throw {
                            status: 404,
                            type: 'Not Found',
                            message: "Credential not found"
                        };
                    }
                    if (credential.ownerId !== userId) {
                        throw {
                            status: 401,
                            type: 'Unathorized',
                            message: "You have no ownership over this credential"
                        };
                    }
                    return [4 /*yield*/, credentialsRepository.deleteCredentialById(credentialId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
