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
import * as cardsRepository from "../repositories/cardsRepository.js";
import * as encryptServices from "./encryptServices.js";
export function registerCard(data) {
    return __awaiter(this, void 0, void 0, function () {
        var title, name, number, expirationDate, cvc, password, isVirtual, type, ownerId, encryptedPassword, encryptedCVC, insertData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = data.title, name = data.name, number = data.number, expirationDate = data.expirationDate, cvc = data.cvc, password = data.password, isVirtual = data.isVirtual, type = data.type, ownerId = data.ownerId;
                    return [4 /*yield*/, checkIfCardIsUnique(title, ownerId)];
                case 1:
                    _a.sent();
                    encryptedPassword = encryptServices.encrypt(password);
                    encryptedCVC = encryptServices.encrypt(cvc);
                    insertData = { title: title, name: name, number: number, expirationDate: expirationDate, encryptedCVC: encryptedCVC, encryptedPassword: encryptedPassword, isVirtual: isVirtual, type: type, ownerId: ownerId };
                    return [4 /*yield*/, cardsRepository.insertCard(insertData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function checkIfCardIsUnique(title, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var cardAlreadyExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardsRepository.selectCardRestrictedByOwnersId(userId, title)];
                case 1:
                    cardAlreadyExists = _a.sent();
                    if (cardAlreadyExists) {
                        throw {
                            status: 400,
                            type: "bad request",
                            message: "Card already exists"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function getAllCards(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var allCards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardsRepository.getAllCardsByUserId(userId)];
                case 1:
                    allCards = _a.sent();
                    allCards.map(function (card) {
                        card.password = encryptServices.decrypt(card.password);
                        card.cvc = encryptServices.decrypt(card.cvc);
                    });
                    return [2 /*return*/, allCards];
            }
        });
    });
}
export function getCardById(userId, cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var card, decryptedCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardsRepository.getCardById(userId, cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw {
                            status: 404,
                            type: 'Not Found',
                            message: 'Card not found, please double check the id input'
                        };
                    }
                    decryptedCard = decryptCard(card);
                    return [2 /*return*/, decryptedCard];
            }
        });
    });
}
export function deleteCardById(userId, cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardsRepository.getCardById(userId, cardId)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw {
                            status: 404,
                            type: 'Not Found',
                            message: 'Card not found, please double check the id input'
                        };
                    }
                    if (card.ownerId !== userId) {
                        throw {
                            status: 401,
                            type: 'Unathorized',
                            message: "You have no ownership over this card"
                        };
                    }
                    return [4 /*yield*/, cardsRepository.deleteCardById(cardId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function decryptCard(card) {
    var title = card.title, name = card.name, number = card.number, expirationDate = card.expirationDate, cvc = card.cvc, password = card.password, isVirtual = card.isVirtual, type = card.type, ownerId = card.ownerId;
    var decryptedPassword = encryptServices.decrypt(password);
    var output = { title: title, name: name, number: number, expirationDate: expirationDate, cvc: cvc, decryptedPassword: decryptedPassword, isVirtual: isVirtual, type: type, ownerId: ownerId };
    return output;
}
