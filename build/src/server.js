"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loaders_1 = __importDefault(require("./loaders"));
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    const app = (0, express_1.default)();
    await (0, loaders_1.default)({ app });
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map