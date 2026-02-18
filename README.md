# Weather & Place Explorer

## 1. Descripción General
**Meowl Forecast** es una aplicación web diseñada como herramienta para consultar el clima actual y el pronóstico detallado de cualquier ciudad del mundo.

Ademas, la aplicación te recomienda lugares para visitar dependiendo del clima. Por ejemplo, ¿Está lloviendo? Te sugiere museos o cafeterías; ¿Hace sol? Te muestra parques y atracciones al aire libre. Además, guarda tus búsquedas recientes y te permite marcar tus ciudades favoritas para un acceso rápido.

## 2. Descripción Técnica
Esta es una pagina web basada en una sola pagina html, construida con tecnologías web modernas, enfocada en el rendimiento y la experiencia de usuario.

- **Frontend:** Desarrollado con **Vanilla JavaScript** para una manipulación eficiente del DOM y una lógica ligera, ya que no cuenta con dependencias de frameworks pesados. El diseño es responsivo y estilizado con **Tailwind CSS**.
- **Backend (Serverless):** Utiliza **Vercel Serverless Functions** (`/api/clima`, `/api/lugares`) para actuar como middleware seguro. Esto protege las API Keys y maneja la comunicación con los servicios externos, evitando problemas de CORS y exponiendo endpoints limpios al frontend.
- **Persistencia:** Usa `localStorage` para guardar las ciudades favoritas y el historial de búsquedas del usuario directamente en el navegador.

## 3. APIs Utilizadas
La aplicación usa múltiples servicios externos para ofrecer sus funcionalidades:

*   **OpenWeatherMap:** Provee los datos del clima en tiempo real y el pronóstico de 5 días (usado en `api/clima.js`).
*   **Geoapify:** Genera las recomendaciones de lugares (restaurantes, turismo, etc.) basándose en las coordenadas y las condiciones climáticas (usado en `api/lugares.js`).
*   **LocationIQ:** Ofrece sugerencias de autocompletado mientras escribes el nombre de una ciudad.
*   **GeoJS:** Detecta tu ubicación aproximada mediante IP para mostrar el clima local automáticamente al iniciar.
*   **Leaflet & OpenStreetMap:** Renderiza el mapa interactivo para visualizar la ubicación de la ciudad buscada.

## 4. Cómo Iniciar (Local)
Para probar este proyecto en tu entorno local, necesitarás tener instalado **Node.js** y **Vercel CLI**.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/D3fussion/ProyectoDiseno1.git
    cd ProyectoDiseno1
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz y agrega tus claves:
    ```env
    WEATHER_API_KEY=tu_api_key_openweathermap
    PLACES_API_KEY=tu_api_key_geoapify
    ```

4.  **Iniciar con Vercel:**
    Como la aplicación utiliza Serverless Functions, debe iniciarse con el comando de Vercel para emular el entorno de producción correctamente:
    ```bash
    npm run vercel
    ```
    *O directamente:* `vercel dev`

5.  **Abrir en el navegador:**
    Visita `http://localhost:3000` para ver la aplicación funcionando.

## 5. Capturas de Pantalla
Aquí puedes ver algunas capturas de la aplicación en funcionamiento:
