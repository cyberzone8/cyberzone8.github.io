const crypto = require("crypto");

function hashPassword(password) {
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    console.log(`Hash de la clave "${password}":`, hash);
}

// Cambia "clave_arrendador" por tu clave
hashPassword("clave_arrendador");
hashPassword("clave_arrendatario");
