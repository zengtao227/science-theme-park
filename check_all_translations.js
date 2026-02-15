const fs = require('fs');
const path = require('path');

// 读取所有chamber页面
const chamberDir = './src/app/chamber';
const pages = fs.readdirSync(chamberDir).filter(f => {
  const stat = fs.statSync(path.join(chamberDir, f));
  return stat.isDirectory();
});

console.log('检查所有模块的翻译完整性...\n');

// 提取模块代码和翻译key
const moduleTranslations = {};

pages.forEach(page => {
  const pagePath = path.join(chamberDir, page, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    const content = fs.readFileSync(pagePath, 'utf8');
    
    // 查找翻译key的模式
    const match = content.match(/translations\[currentLanguage\]\?\.(\w+)/);
    if (match) {
      const translationKey = match[1];
      moduleTranslations[page] = translationKey;
    }
  }
});

console.log('找到的模块翻译映射：');
console.log(JSON.stringify(moduleTranslations, null, 2));

// 检查每种语言的翻译文件
const languages = ['en', 'de', 'cn'];
const categories = ['common', 'math', 'physics', 'chemistry', 'biology'];

const missingTranslations = {
  de: [],
  cn: []
};

Object.entries(moduleTranslations).forEach(([module, key]) => {
  languages.forEach(lang => {
    if (lang === 'en') return; // EN是fallback，跳过
    
    let found = false;
    categories.forEach(category => {
      const filePath = `./src/lib/i18n/${lang}/${category}.ts`;
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        // 检查是否有这个key的定义
        const regex = new RegExp(`\\b${key}\\s*:\\s*\\{`, 'g');
        if (regex.test(content)) {
          found = true;
        }
      }
    });
    
    if (!found) {
      missingTranslations[lang].push({ module, key });
    }
  });
});

console.log('\n缺失的翻译：');
console.log('德语(DE)缺失：', missingTranslations.de.length);
missingTranslations.de.forEach(m => console.log(`  - ${m.module}: ${m.key}`));

console.log('\n中文(CN)缺失：', missingTranslations.cn.length);
missingTranslations.cn.forEach(m => console.log(`  - ${m.module}: ${m.key}`));
