const fs = require('fs');
const path = require('path');

// 获取所有chamber目录下的模块
const chamberDir = path.join(__dirname, 'src/app/chamber');
const allModules = fs.readdirSync(chamberDir).filter(item => {
  const itemPath = path.join(chamberDir, item);
  return fs.statSync(itemPath).isDirectory();
});

console.log(`找到 ${allModules.length} 个模块\n`);

// 读取翻译文件
const enMath = require('./src/lib/i18n/en/math.ts');
const enPhysics = require('./src/lib/i18n/en/physics.ts');
const enChemistry = require('./src/lib/i18n/en/chemistry.ts');
const enBiology = require('./src/lib/i18n/en/biology.ts');

const deMath = require('./src/lib/i18n/de/math.ts');
const dePhysics = require('./src/lib/i18n/de/physics.ts');
const deChemistry = require('./src/lib/i18n/de/chemistry.ts');
const deBiology = require('./src/lib/i18n/de/biology.ts');

const cnMath = require('./src/lib/i18n/cn/math.ts');
const cnPhysics = require('./src/lib/i18n/cn/physics.ts');
const cnChemistry = require('./src/lib/i18n/cn/chemistry.ts');
const cnBiology = require('./src/lib/i18n/cn/biology.ts');

const enTranslations = { ...enMath.enMath, ...enPhysics.enPhysics, ...enChemistry.enChemistry, ...enBiology.enBiology };
const deTranslations = { ...deMath.deMath, ...dePhysics.dePhysics, ...deChemistry.deChemistry, ...deBiology.deBiology };
const cnTranslations = { ...cnMath.cnMath, ...cnPhysics.cnPhysics, ...cnChemistry.cnChemistry, ...cnBiology.cnBiology };

// 检查每个模块
const missingDE = [];
const missingCN = [];
const existingModules = [];

allModules.forEach(module => {
  const key = module.replace(/-/g, '_');
  
  const hasEN = enTranslations[key] !== undefined;
  const hasDE = deTranslations[key] !== undefined;
  const hasCN = cnTranslations[key] !== undefined;
  
  if (hasEN) {
    existingModules.push({ module, key, hasEN, hasDE, hasCN });
    
    if (!hasDE) {
      missingDE.push(key);
    }
    if (!hasCN) {
      missingCN.push(key);
    }
  }
});

console.log('=== 翻译完整性报告 ===\n');
console.log(`总模块数: ${allModules.length}`);
console.log(`有英语翻译的模块: ${existingModules.length}`);
console.log(`德语缺失: ${missingDE.length}`);
console.log(`中文缺失: ${missingCN.length}\n`);

if (missingDE.length > 0) {
  console.log('德语缺失的模块:');
  missingDE.forEach(key => console.log(`  - ${key}`));
  console.log('');
}

if (missingCN.length > 0) {
  console.log('中文缺失的模块:');
  missingCN.forEach(key => console.log(`  - ${key}`));
  console.log('');
}

// 详细检查每个模块的翻译结构
console.log('=== 详细模块检查 ===\n');
existingModules.forEach(({ module, key, hasEN, hasDE, hasCN }) => {
  const status = [];
  if (!hasDE) status.push('缺少DE');
  if (!hasCN) status.push('缺少CN');
  
  if (status.length > 0) {
    console.log(`${module} (${key}): ${status.join(', ')}`);
  }
});
