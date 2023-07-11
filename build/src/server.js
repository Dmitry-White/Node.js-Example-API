"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("./config/express"));
const PORT = process.env.PORT || 5000;
const startServer = () => {
    express_1.default.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map