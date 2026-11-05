// Pruebas de Patitas Potosinas. Se ejecutan con: npm test
// No necesitan Redis real: se usa un Redis "falso" en memoria.
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createApp } from '../src/app.js';

// ---------- Utilidad: levanta la app en un puerto libre ----------
async function iniciar(redisClient) {
  const server = createApp(redisClient).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  return { server, url };
}

function redisFalso() {
  let contador = 0;
  return { isReady: true, incr: async () => ++contador };
}

// ---------- API ----------
describe('API', () => {
  let server, url;
  before(async () => ({ server, url } = await iniciar(redisFalso())));
  after(() => server.close());

  test('GET /health responde con estado activo', async () => {
    const res = await fetch(`${url}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'activo');
  });

  test('GET /api/visitas incrementa el contador en cada solicitud', async () => {
    const r1 = await (await fetch(`${url}/api/visitas`)).json();
    const r2 = await (await fetch(`${url}/api/visitas`)).json();
    assert.equal(r1.titulo, 'Control de visitas');
    assert.equal(r2.visitas, r1.visitas + 1);
  });

  test('GET / sirve la página con el título "Control de visitas"', async () => {
    const res = await fetch(`${url}/`);
    assert.equal(res.status, 200);
    assert.match(await res.text(), /Control de visitas/);
  });
});

describe('Redis no disponible', () => {
  test('responde 503 con error controlado si Redis no está conectado', async () => {
    const { server, url } = await iniciar({ isReady: false });
    try {
      const res = await fetch(`${url}/api/visitas`);
      assert.equal(res.status, 503);
      assert.equal((await res.json()).error, 'Redis no disponible');
    } finally {
      server.close();
    }
  });

  test('responde 503 si Redis falla durante la consulta', async () => {
    const roto = { isReady: true, incr: async () => { throw new Error('conexión perdida'); } };
    const { server, url } = await iniciar(roto);
    try {
      const res = await fetch(`${url}/api/visitas`);
      assert.equal(res.status, 503);
    } finally {
      server.close();
    }
  });
});

// ---------- Estructura del proyecto ----------
describe('Archivos del proyecto', () => {
  const principales = [
    'src/app.js',
    'src/public/index.html',
    'src/public/css/styles.css',
    'src/public/js/app.js',
    'src/public/js/data.js',
    'src/public/js/router.js',
    'src/public/js/utils.js',
    'Dockerfile',
    '.dockerignore',
    'compose.yaml',
    'package-lock.json',
  ];
  for (const archivo of principales) {
    test(`existe ${archivo}`, () => assert.ok(existsSync(archivo), `Falta ${archivo}`));
  }

  function buscarJs(dir) {
    return readdirSync(dir).flatMap((nombre) => {
      const ruta = join(dir, nombre);
      if (statSync(ruta).isDirectory()) return buscarJs(ruta);
      return nombre.endsWith('.js') ? [ruta] : [];
    });
  }

  for (const archivo of buscarJs('src/public/js')) {
    test(`sintaxis válida: ${archivo}`, () => {
      execFileSync(process.execPath, ['--check', archivo], { stdio: 'pipe' });
    });
  }
});
