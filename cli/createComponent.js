import fs from 'fs';
import path from 'path';
import readline from 'readline';
import {kebabToCamel} from './utils.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createComponent = (componentName) => {
  const indexComponentsScss = path.join(__dirname, '../src', 'app', 'scss', 'components.scss');
  const dir = path.join(__dirname, '../src', 'components', componentName);

  // Проверяем, существует ли директория
  if (fs.existsSync(dir)) {
    console.error(`Компонент "${componentName}" уже существует!`);
    return false;
  }

  // Создание директории
  fs.mkdirSync(dir, { recursive: true });

  // Содержимое для pug файла
  const pugContent = `mixin ${kebabToCamel(componentName)}()\n\n  //${componentName}\n  .${componentName}&attributes(attributes)\n    p Компонент ${componentName}`;

  // Содержимое для scss файла
  const scssContent = `@use '../../app/scss/variables.scss' as *;\n@use '../../app/scss/mixins.scss' as *;\n\n// ${componentName}\n.${componentName} {}`;

  // Запись файлов
  fs.writeFileSync(path.join(dir, `${componentName}.pug`), pugContent);
  fs.writeFileSync(path.join(dir, `${componentName}.scss`), scssContent);
  fs.writeFileSync(path.join(dir, `${componentName}.js`), '');

  // Добавляем импорт в index.pug
  fs.appendFileSync(path.join(__dirname, '../src', 'components', 'index.pug'), `\ninclude ${componentName}/${componentName}`);
  fs.appendFileSync(path.join(indexComponentsScss), `\n@use "../../components/${componentName}/${componentName}";`);

  console.log(`Компонент "${componentName}" успешно создан!`);
};

// Запрос имени страницы у пользователя
rl.question('Введите название компонента: ', (componentName) => {
  if (!componentName) {
    console.error('Пожалуйста, укажите имя компонента.');
    rl.close();
    return;
  }

  createComponent(componentName);
  rl.close();
});
