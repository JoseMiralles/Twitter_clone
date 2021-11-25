"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var http_errors_1 = __importDefault(require("http-errors"));
var userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followees: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "users" }]
});
var User = mongoose_1.default.model("user", userSchema);
var MongoDBUserRepository = /** @class */ (function () {
    function MongoDBUserRepository() {
    }
    MongoDBUserRepository.prototype.getUser = function (userId, third) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = Object.values(third.rawHeaders).find(function (k) { return k.includes("Bearer"); });
                        console.log("JWT " + jwt);
                        return [4 /*yield*/, User.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new http_errors_1.default.NotFound("This user does not exist");
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MongoDBUserRepository.prototype.getUserFollowees = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, followees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new http_errors_1.default.NotFound("This user does not exist");
                        return [4 /*yield*/, User.find(user.followees)];
                    case 2:
                        followees = _a.sent();
                        return [2 /*return*/, followees];
                }
            });
        });
    };
    MongoDBUserRepository.prototype.followUser = function (userId, followeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = User.findById(userId);
                if (!user)
                    throw new http_errors_1.default.NotFound();
                user.followees.push(followeeId);
                user.save();
                return [2 /*return*/, true];
            });
        });
    };
    return MongoDBUserRepository;
}());
var repo = new MongoDBUserRepository();
exports.default = repo;
