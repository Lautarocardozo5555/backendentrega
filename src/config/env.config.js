import dotenv from "dotenv";

dotenv.config();

const requiredVars = ["PORT", "NODE_ENV"];

requiredVars.forEach((v) => {
    if (!process.env[v]) {
    throw new Error(`Falta la variable de entorno requerida: ${v}`);
}
});

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
};
