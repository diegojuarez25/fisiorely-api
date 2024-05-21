"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsDocs = require("swagger-jsdoc");
const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Fisiorely API",
            description: "API Documentation",
            contact: {
                name: "Eric Domenzain",
                url: "https://github.com/ericdomen"
            },
            servers: [{
                    url: "http://localhost:3000",
                    description: "Developer Server"
                }]
        }
    },
    basePath: "/",
    // API a documentar
    apis: ["./src/routes/*.ts"]
};
const swaggerDocs = swaggerJsDocs(options);
exports.default = swaggerDocs;
