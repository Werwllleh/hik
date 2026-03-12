import fs from 'fs';
import path from 'node:path';
import readline from 'readline';
import {kebabToCamel} from './utils.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createBlock = (blockName) => {

  const indexBlocksScss = path.join(__dirname, '../src', 'app', 'scss', 'blocks.scss');

  const dir = path.join(__dirname, '../src', 'blocks', blockName);

  // Проверяем, существует ли директория
  if (fs.existsSync(dir)) {
    console.error(`Блок "${blockName}" уже существует!`);
    return false;
  }

  // Создание директории
  fs.mkdirSync(dir, {recursive: true});

  // Содержимое для pug файла
  const pugContent = `mixin ${kebabToCamel(blockName)}()\n\n  //${blockName}\n  .${blockName}&attributes(attributes)\n    h2 Блок ${blockName}`;

  // Содержимое для scss файла
  const scssContent = `@use '../../app/scss/variables.scss' as *;\n@use '../../app/scss/mixins.scss' as *;\n\n// ${blockName}\n.${blockName} {}`;

  // Запись файлов
  fs.writeFileSync(path.join(dir, `${blockName}.pug`), pugContent);
  fs.writeFileSync(path.join(dir, `${blockName}.scss`), scssContent);
  fs.writeFileSync(path.join(dir, `${blockName}.js`), '');

  // Добавляем импорт в index.pug
  fs.appendFileSync(path.join(__dirname, '../src', 'blocks', 'index.pug'), `\ninclude ${blockName}/${blockName}`);
  fs.appendFileSync(path.join(indexBlocksScss), `\n@use "../../blocks/${blockName}/${blockName}";`);

  console.log(`Блок "${blockName}" успешно создан!`);
};

// Запрос имени страницы у пользователя
rl.question('Введите название блока: ', (blockName) => {
  if (!blockName) {
    console.error('Пожалуйста, укажите имя блока.');
    rl.close();
    return;
  }

  createBlock(blockName);
  rl.close();
});
