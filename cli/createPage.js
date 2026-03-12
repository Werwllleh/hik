import fs from 'fs';
import path from 'path';
import readline from 'readline';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createPage = (pageName) => {
  const indexPagesScss = path.join(__dirname, '../src', 'app', 'scss', 'pages.scss');

  const dir = path.join(__dirname, '../src', 'pages', pageName);

  // Проверяем, существует ли директория
  if (fs.existsSync(dir)) {
    console.error(`Страница "${pageName}" уже существует!`);
    return false;
  }

  // Создание директории
  fs.mkdirSync(dir, { recursive: true });

  // Содержимое для pug файла
  const pugContent = `extends ../../app/pug/layouts/base.pug\n\nappend vars\n  - title = "${pageName.charAt(0).toUpperCase() + pageName.slice(1)}"\n  - description = "Описание ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}"\n\nappend content\n\n  .page-${pageName}\n    .container\n      h1 Страница ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;

  // Содержимое для scss файла
  const scssContent = `@use '../../app/scss/variables.scss' as *;\n@use '../../app/scss/mixins.scss' as *;\n\n// ${pageName}\n.${pageName} {}`;

  // Запись файлов
  fs.writeFileSync(path.join(dir, `${pageName}.pug`), pugContent);
  fs.writeFileSync(path.join(dir, `${pageName}.scss`), scssContent);
  fs.writeFileSync(path.join(dir, `${pageName}.js`), '');

  fs.appendFileSync(path.join(indexPagesScss), `\n@use "../../pages/${pageName}/${pageName}";`);

  console.log(`Страница "${pageName}" успешно создана!`);
};

// Запрос имени страницы у пользователя
rl.question('Введите название страницы: ', (pageName) => {
  if (!pageName) {
    console.error('Пожалуйста, укажите имя страницы.');
    rl.close();
    return;
  }

  createPage(pageName);
  rl.close();
});
