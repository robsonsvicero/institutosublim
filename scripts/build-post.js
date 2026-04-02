import fs from 'fs';
import path from 'path';

const source = '.htaccess';
const dest = path.join('dist', '.htaccess');

try {
  const content = fs.readFileSync(source, 'utf-8');
  fs.writeFileSync(dest, content);
  console.log(`✅ .htaccess copiado para dist/`);
} catch (error) {
  console.error(`❌ Erro ao copiar .htaccess:`, error.message);
  process.exit(1);
}
