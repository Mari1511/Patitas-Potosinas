// Verifica que los archivos principales existan y que todos los JS tengan sintaxis válida.
// Se ejecuta con: npm test
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const PUBLIC = 'src/public';
const PRINCIPALES = [
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/data.js',
  'js/router.js',
  'js/utils.js',
];

let errores = 0;

console.log('1) Verificando archivos principales...');
for (const archivo of PRINCIPALES) {
  const ruta = join(PUBLIC, archivo);
  if (existsSync(ruta)) {
    console.log(`   OK     ${ruta}`);
  } else {
    console.log(`   FALTA  ${ruta}`);
    errores++;
  }
}

function buscarJs(dir) {
  return readdirSync(dir).flatMap((nombre) => {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) return buscarJs(ruta);
    return nombre.endsWith('.js') ? [ruta] : [];
  });
}

console.log('\n2) Verificando sintaxis JavaScript...');
for (const archivo of buscarJs(join(PUBLIC, 'js'))) {
  try {
    execFileSync(process.execPath, ['--check', archivo], { stdio: 'pipe' });
    console.log(`   OK     ${archivo}`);
  } catch (e) {
    console.log(`   ERROR  ${archivo}\n${e.stderr.toString()}`);
    errores++;
  }
}

if (errores > 0) {
  console.log(`\n❌ Se encontraron ${errores} problema(s).`);
  process.exit(1);
}
console.log('\n✅ Todo correcto.');
