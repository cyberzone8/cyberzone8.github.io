export default function handler(req, res) {
    const { role } = req.query;
    const tenantKey = process.env.TENANT_KEY; // Define en Vercel
    const landlordKey = process.env.LANDLORD_KEY; // Define en Vercel

    if (role === "tenant") {
        res.status(200).json({ key: tenantKey });
    } else if (role === "landlord") {
        res.status(200).json({ key: landlordKey });
    } else {
        res.status(400).json({ error: "Rol no válido." });
    }
}
