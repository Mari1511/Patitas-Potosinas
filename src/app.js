// Servidor de Patitas Potosinas: sirve el sitio web y la API de "Control de visitas".
import express from 'express';
import { createClient } from 'redis';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');
const CLAVE_VISITAS = 'visitas';

/**
 * Crea la aplicación Express.
 * Recibe el cliente de Redis como parámetro para poder probarla sin un Redis real.
 */
export function createApp(redisClient) {
  const app = express();

  // Estado de la aplicación
  app.get('/health', (req, res) => {
    res.json({
      status: 'activo',
      redis: redisClient?.isReady ? 'conectado' : 'desconectado',
    });
  });

  // Incrementa y devuelve el contador de visitas guardado en Redis
  app.get('/api/visitas', async (req, res) => {
    if (!redisClient?.isReady) {
      return res.status(503).json({
        error: 'Redis no disponible',
        mensaje: 'No se pudo conectar con el servicio de visitas. Intenta más tarde.',
      });
    }
    try {
      const visitas = await redisClient.incr(CLAVE_VISITAS);
      res.json({ titulo: 'Control de visitas', visitas });
    } catch (err) {
      console.error('[visitas] Error al consultar Redis:', err.message);
      res.status(503).json({
        error: 'Redis no disponible',
        mensaje: 'No se pudo actualizar el contador de visitas. Intenta más tarde.',
      });
    }
  });

  // Sitio web de Patitas Potosinas (HTML, CSS y JS)
  app.use(express.static(PUBLIC_DIR));

  return app;
}

/**
 * Crea el cliente de Redis usando REDIS_URL.
 * Si Redis no está disponible, la app sigue funcionando y reintenta conectarse.
 */
export function createRedisClient(url) {
  const client = createClient({
    url,
    disableOfflineQueue: true, // si Redis está caído, falla de inmediato en vez de quedarse esperando
    socket: {
      connectTimeout: 3000,
      reconnectStrategy: (intentos) => Math.min(intentos * 500, 5000),
    },
  });

  let avisado = false;
  client.on('error', (err) => {
    if (!avisado) {
      console.error(`[redis] No disponible (${err.code || err.message}). Reintentando...`);
      avisado = true;
    }
  });
  client.on('ready', () => {
    console.log('[redis] Conectado');
    avisado = false;
  });

  client.connect().catch(() => {}); // los errores ya se reportan en el evento 'error'
  return client;
}

// Arranca el servidor solo si este archivo se ejecuta directamente (node src/app.js)
const esPrincipal = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (esPrincipal) {
  const PORT = Number(process.env.PORT) || 3000;
  const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

  const redisClient = createRedisClient(REDIS_URL);
  const app = createApp(redisClient);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Patitas Potosinas escuchando en http://0.0.0.0:${PORT}`);
  });
}
