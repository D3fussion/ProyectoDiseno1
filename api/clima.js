export default async function handler(req, res) {
    const { ciudad, coordenadas } = req.query;

    let queryParam;

    if (!ciudad) {
        return res.status(400).json({ error: "Ciudad no proporcionada" });
    }

    if (coordenadas === "true") {
        const [lat, lon] = ciudad.split(',');
        queryParam = `lat=${lat}&lon=${lon}`;
    } else {
        queryParam = `q=${ciudad}`;
    }

    const API_KEY = process.env.WEATHER_API_KEY;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${queryParam}&appid=${API_KEY}&units=metric&lang=es`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${queryParam}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const [weatherRes, forecastRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!weatherRes.ok || !forecastRes.ok) {
            console.log(weatherRes.status, forecastRes.status);
            return res.status(404).json({ error: "No se pudieron obtener los datos. Verifica la ciudad." });
        }
        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        const data = {
            weather: weatherData,
            forecast: forecastData
        };

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59'); // Cache de Vercel de 1 hora

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el clima:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener el clima" });
    }
}