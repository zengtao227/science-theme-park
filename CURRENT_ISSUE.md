# 当前问题：i18n.ts SSR构建失败

## 快速概览

**问题**: Next.js构建时，em1-01和sb3-01页面在SSR预渲染阶段失败  
**原因**: `translations[currentLanguage]`在SSR期间返回`undefined`  
**状态**: i18n.ts文件结构已完全修复，但运行时访问有问题

---

## 构建错误

```bash
npm run build

# 错误1
Error: /chamber/em1-01
TypeError: Cannot read properties of undefined (reading 'stages')

# 错误2  
Error: /chamber/sb3-01
TypeError: Cannot read properties of undefined (reading 'prompts')
```

---

## 问题代码

### src/lib/i18n.ts
```typescript
export const translations: Record<string, any> = {
    EN: { /* 完整内容 */ },
    CN: { /* 完整内容 */ },
    DE: { /* 完整内容 */ }
};

export function getTranslations(lang: string) {
    const validLang = lang as keyof typeof translations;
    return translations[validLang] || translations.EN;  // ❌ 返回undefined
}
```

### src/app/chamber/em1-01/page.tsx
```typescript
export default function S102Page() {
    const { currentLanguage } = useAppStore();
    const locale = getTranslations(currentLanguage);
    const t = locale.em1_01;  // ❌ locale是undefined，访问.em1_01失败
    // ...
}
```

### src/app/chamber/sb3-01/page.tsx
```typescript
export default function SB301Page() {
    const { currentLanguage } = useAppStore();
    const locale = getTranslations(currentLanguage);
    const t = locale.sb3_01;  // ❌ locale是undefined
    
    const buildStagePool = useCallback((difficulty, stage) => {
        // ...
        t.prompts.food_chain  // ❌ t是undefined，访问.prompts失败
        // ...
    }, [t]);
}
```

---

## 已验证的事实

✅ **i18n.ts文件结构正确**
- 括号平衡: EN/CN/DE都是0
- 缩进格式: 符合标准
- 内容完整: 所有翻译都存在
- TypeScript编译: 通过

✅ **translations对象定义正确**
```typescript
translations.EN        // 存在
translations.EN.em1_01 // 存在
translations.EN.sb3_01 // 存在
translations.DE        // 存在
translations.DE.em1_01 // 存在
translations.DE.sb3_01 // 存在
```

❌ **SSR期间访问失败**
- `getTranslations(currentLanguage)`返回`undefined`
- 即使有`|| translations.EN`作为fallback也不起作用

---

## 需要解答的问题

1. **为什么`translations[validLang]`在SSR时返回undefined？**
   - validLang的值是什么？
   - translations对象在SSR时是否正确加载？

2. **为什么fallback `|| translations.EN`不起作用？**
   - 是否整个translations对象都是undefined？
   - 还是只是特定语言的对象是undefined？

3. **为什么其他页面能正常工作？**
   - gb1-01, gb3-01等页面使用相同的模式但成功了
   - 它们有什么不同？

4. **SSR期间currentLanguage的值是什么？**
   - 是"EN"/"CN"/"DE"？
   - 还是undefined/null/空字符串？

---

## 建议的调试方法

### 方法1: 添加日志
```typescript
export function getTranslations(lang: string) {
    console.log('[DEBUG] Input lang:', lang, typeof lang);
    console.log('[DEBUG] translations object:', typeof translations);
    console.log('[DEBUG] translations.EN:', typeof translations.EN);
    
    const validLang = lang as keyof typeof translations;
    console.log('[DEBUG] validLang:', validLang);
    console.log('[DEBUG] translations[validLang]:', typeof translations[validLang]);
    
    const result = translations[validLang] || translations.EN;
    console.log('[DEBUG] Final result:', typeof result);
    
    return result;
}
```

### 方法2: 强制使用EN
```typescript
// 临时测试：绕过currentLanguage
const locale = translations.EN;
const t = locale.em1_01;
```

### 方法3: 对比成功的页面
查看`src/app/chamber/gb1-01/page.tsx`的实现，找出差异。

---

## 相关文件

- **完整状态报告**: `I18N_COMPLETE_STATUS.md`
- **主要文件**: `src/lib/i18n.ts` (11,313行)
- **失败页面**: 
  - `src/app/chamber/em1-01/page.tsx`
  - `src/app/chamber/sb3-01/page.tsx`
- **Store**: `src/lib/store.ts` (currentLanguage默认值: 'EN')

---

## 环境

- Next.js: 16.1.5 (Turbopack)
- TypeScript: 通过
- 构建命令: `npm run build`
- 失败阶段: Generating static pages (SSR)
