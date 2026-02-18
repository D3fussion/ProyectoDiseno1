export default async function handler(req, res) {
    const { lat, lon, categorias } = req.query;

    if (!lat || !lon || !categorias) {
        return res.status(400).json({ error: "Coordenadas y/o categorias no proporcionados" });
    }

    const API_KEY = process.env.PLACES_API_KEY;

    const filter = `circle:${lon},${lat},5000`;
    const bias = `proximity:${lon},${lat}`;

    const placesUrl = `https://api.geoapify.com/v2/places?categories=${categorias}&filter=${filter}&bias=${bias}&limit=20&apiKey=${API_KEY}`;

    try {
        const placesRes = await fetch(placesUrl);

        if (!placesRes.ok) {
            return res.status(404).json({ error: "No se pudieron obtener los datos. Verifica las coordenadas." });
        }

        const placesData = await placesRes.json();

        const data = placesData;

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59'); // Cache de Vercel de 1 hora

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los lugares:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener los lugares" });
    }
}