# i18n.ts 完整状态报告

**最后更新**: 2026-02-15  
**状态**: 文件结构已修复，但SSR构建失败

---

## 执行摘要

i18n.ts文件的所有结构性问题已修复：
- ✅ 括号平衡正确 (EN/CN/DE)
- ✅ 缩进格式正确
- ✅ 内容完整 (DE.sb3_01.scenarios已添加)
- ✅ TypeScript编译通过

但Next.js构建仍然失败，原因是SSR期间translations对象访问问题。

---

## 第一部分：已修复的文件结构问题

### 1. 括号平衡 ✅
使用诊断脚本验证：
- EN section: balance = 0 ✅
- CN section: balance = 0 ✅
- DE section: balance = 0 ✅

### 2. 缩进修复 ✅
正确的缩进结构：
```typescript
export const translations: Record<string, any> = {  // 0空格
    EN: {                                            // 4空格
        protocol: {                                  // 8空格
            system_name: "..."                       // 12空格
```

### 3. 文件结尾修复 ✅
**修复前**:
```typescript
                }
        }
}      // ❌ 多余的闭合括号
};

export interface Translations {
            EN: typeof translations.EN;    // ❌ 12空格
            DE: typeof translations.DE;
            CN: typeof translations.CN;
        }                                   // ❌ 8空格

        // Block removed - will be re-inserted in correct location  // ❌ 无意义注释
```

**修复后**:
```typescript
                }
        }
    }      // ✅ DE section结束
};         // ✅ translations对象结束

export interface Translations {
    EN: typeof translations.EN;    // ✅ 4空格
    DE: typeof translations.DE;
    CN: typeof translations.CN;
}                                   // ✅ 0空格
```

### 4. 内容完整性 ✅
添加了缺失的DE.sb3_01.scenarios：
```typescript
scenarios: {
    rhine_river: "Rhein-Ökosystem: Der Rhein unterstützt...",
    energy_pyramid: "Energiefluss in Basler Feuchtgebieten...",
    carbon_cycle: "Kohlenstoffkreislauf im Rheindelta...",
    nitrogen_cycle: "Stickstofffixierung im Basler Boden...",
    water_cycle: "Rhein-Wasserkreislauf: Verdunstung..."
}
```

---

## 第二部分：未解决的SSR构建错误

### 构建错误详情

**错误1: /chamber/em1-01**
```
TypeError: Cannot read properties of undefined (reading 'stages')
    at <unknown> (.next/server/chunks/ssr/_3545558d._.js:1:5485)
```

**错误2: /chamber/sb3-01**
```
TypeError: Cannot read properties of undefined (reading 'prompts')
    at <unknown> (.next/server/chunks/ssr/_3e725759._.js:1:7688)
```

### 问题分析

#### 根本原因
在服务器端渲染(SSR)期间，`translations[currentLanguage]`返回`undefined`。

#### 问题链路
1. 页面组件调用`useAppStore()`获取`currentLanguage`
2. 使用`getTranslations(currentLanguage)`获取translations
3. SSR期间，返回值是`undefined`
4. 访问`undefined.em1_01`或`undefined.sb3_01`导致错误

#### 相关代码

**src/lib/i18n.ts**:
```typescript
export function getTranslations(lang: string) {
    const validLang = lang as keyof typeof translations;
    return translations[validLang] || translations.EN;
}
```

**src/app/chamber/em1-01/page.tsx**:
```typescript
const { currentLanguage, completeStage } = useAppStore();
const locale = getTranslations(currentLanguage);
const t = locale.em1_01;  // ❌ locale是undefined
```

**src/app/chamber/sb3-01/page.tsx**:
```typescript
const { currentLanguage, completeStage } = useAppStore();
const locale = getTranslations(currentLanguage);
const t = locale.sb3_01 as SB301T;  // ❌ locale是undefined

const buildStagePool = useCallback((difficulty, stage) => {
    // ...
    t.prompts.food_chain  // ❌ t是undefined
    // ...
}, [t]);
```

### 可能的原因

1. **zustand store在SSR时未初始化**
   - `useAppStore()`在SSR期间可能返回非预期值
   - `currentLanguage`可能不是"EN"/"CN"/"DE"

2. **translations对象在SSR时加载问题**
   - 虽然TypeScript编译通过，但运行时可能有问题
   - Next.js的代码分割可能影响了对象访问

3. **时序问题**
   - `buildStagePool`在`t`初始化之前被调用
   - useCallback的依赖数组在SSR时有问题

### 已尝试的解决方案（均失败）

1. ✗ 添加可选链: `translations[currentLanguage]?.module`
2. ✗ 添加fallback: `|| translations.EN.module`
3. ✗ 创建getTranslations函数
4. ✗ 修改页面代码使用getTranslations

---

## 第三部分：需要调查的问题

### 关键问题

1. **SSR期间currentLanguage的实际值是什么？**
   - 需要添加日志输出确认

2. **translations对象在SSR时是否正确加载？**
   - `translations.EN`是否存在？
   - `translations.EN.em1_01`是否存在？

3. **为什么fallback不起作用？**
   - `|| translations.EN`应该能防止undefined
   - 是否整个translations对象都是undefined？

4. **其他页面为什么能正常工作？**
   - gb1-01, gb3-01等页面使用相同模式但成功了
   - 需要对比差异

### 建议的调试步骤

1. **添加详细日志**:
```typescript
export function getTranslations(lang: string) {
    console.log('[SSR DEBUG] lang:', lang);
    console.log('[SSR DEBUG] translations:', typeof translations);
    console.log('[SSR DEBUG] translations.EN:', typeof translations.EN);
    const validLang = lang as keyof typeof translations;
    const result = translations[validLang] || translations.EN;
    console.log('[SSR DEBUG] result:', typeof result);
    return result;
}
```

2. **对比成功的页面**:
   - 查看gb1-01/page.tsx的实现
   - 找出与失败页面的差异

3. **尝试强制使用EN**:
```typescript
const locale = translations.EN;  // 绕过currentLanguage
const t = locale.em1_01;
```

4. **检查Next.js配置**:
   - 是否需要特殊的SSR配置？
   - next.config.js是否需要调整？

---

## 第四部分：文件信息

### 文件统计
- **总行数**: 11,313
- **EN section**: 第6-3698行
- **CN section**: 第3699-7474行
- **DE section**: 第7475-11283行
- **translations闭合**: 第11284行

### 相关文件
1. `src/lib/i18n.ts` - translations对象定义
2. `src/lib/store.ts` - zustand store (currentLanguage默认值: 'EN')
3. `src/app/chamber/em1-01/page.tsx` - 失败页面1
4. `src/app/chamber/sb3-01/page.tsx` - 失败页面2

### 环境信息
- Next.js: 16.1.5 (Turbopack)
- TypeScript: 编译通过 ✅
- 构建命令: `npm run build`
- 错误阶段: Generating static pages (SSR预渲染)

---

## 第五部分：诊断工具

### 已创建的脚本
1. `scripts/diagnose_brackets.py` - 括号平衡诊断
2. `scripts/fix_de_final.py` - DE section缩进修复
3. `scripts/fix_de_indentation.py` - 通用缩进修复
4. `scripts/fix_de_proper.py` - DE section结构修复

### 使用方法
```bash
# 诊断括号平衡
python3 scripts/diagnose_brackets.py

# 修复缩进
python3 scripts/fix_de_final.py
```

---

## 总结

**已完成** ✅:
- i18n.ts文件结构完全正确
- 所有语言section内容完整
- TypeScript类型检查通过

**待解决** ❌:
- SSR期间translations对象访问失败
- em1-01和sb3-01页面构建错误

**下一步**:
需要其他AI帮助分析为什么SSR期间translations访问会失败，以及如何修复这个运行时问题。
