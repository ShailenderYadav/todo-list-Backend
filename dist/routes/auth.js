"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/signup', auth_1.signup);
router.post('/login', auth_1.login);
router.post('/logout', auth_1.logout);
router.post('/refresh-token', auth_2.authenticateRefreshToken, auth_1.refreshToken);
exports.default = router;
