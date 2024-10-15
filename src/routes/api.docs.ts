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
            }
        }
    },
    basePath: "/",
    // API a documentar
    apis: ["./src/routes/*.ts"]
};

const swaggerDocs = swaggerJsDocs(options);
export default swaggerDocs;
