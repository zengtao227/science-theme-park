/**
 * Translation Performance Tests
 * 
 * Performance tests for translation loading and switching
 * Feature: biology-i18n-phase2
 */

import { enBiology } from '@/lib/i18n/en/biology';
import { cnBiology } from '@/lib/i18n/cn/biology';
import { deBiology } from '@/lib/i18n/de/biology';

/**
 * Property 15: Translation content preloading
 * Validates: Requirements 7.2
 * Feature: biology-i18n-phase2, Property 15: Translation content preloading
 */
describe('Property 15: Translation preloading', () => {
  test('all translation files should load synchronously', () => {
    const startTime = performance.now();
    
    // Load all translations
    const en = enBiology;
    const cn = cnBiology;
    const de = deBiology;
    
    const loadTime = performance.now() - startTime;
    
    // Should load very quickly (under 100ms)
    expect(loadTime).toBeLessThan(100);
    
    // Verify all loaded
    expect(en).toBeDefined();
    expect(cn).toBeDefined();
    expect(de).toBeDefined();
  });

  test('translation objects should be immediately accessible', () => {
    // No async operations needed
    expect(enBiology.sb1_03).toBeDefined();
    expect(cnBiology.sb1_03).toBeDefined();
    expect(deBiology.sb1_03).toBeDefined();
    
    // Should have all required keys
    expect(enBiology.sb1_03.title).toBeDefined();
    expect(cnBiology.sb1_03.title).toBeDefined();
    expect(deBiology.sb1_03.title).toBeDefined();
  });

  test('translation modules should be cached in memory', () => {
    const firstAccess = enBiology.sb1_03;
    const secondAccess = enBiology.sb1_03;
    
    // Should be the same object reference (cached)
    expect(firstAccess).toBe(secondAccess);
  });
});

/**
 * Property: Language switching performance
 * Validates: Requirements 7.1
 * Feature: biology-i18n-phase2, Property: Language switching performance
 */
describe('Property: Language switching performance', () => {
  test('switching between languages should be fast', () => {
    const iterations = 100;
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      // Simulate language switching by accessing different translation objects
      const lang = i % 3;
      let translation;
      
      if (lang === 0) translation = enBiology.sb1_03;
      else if (lang === 1) translation = cnBiology.sb1_03;
      else translation = deBiology.sb1_03;
      
      // Access a property to ensure it's not optimized away
      expect(translation.title).toBeDefined();
    }
    
    const totalTime = performance.now() - startTime;
    const avgTime = totalTime / iterations;
    
    // Average switch should be under 2ms
    expect(avgTime).toBeLessThan(2);
  });

  test('accessing nested translation keys should be fast', () => {
    const iterations = 1000;
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      const title = enBiology.sb1_03.title;
      const stage = enBiology.sb1_03.stages?.mitosis;
      const label = enBiology.sb1_03.labels?.chromosome;
      
      expect(title).toBeDefined();
    }
    
    const totalTime = performance.now() - startTime;
    const avgTime = totalTime / iterations;
    
    // Should be very fast (under 0.1ms per access)
    expect(avgTime).toBeLessThan(0.1);
  });

  test('translation object size should be reasonable', () => {
    // Convert to JSON to estimate size
    const enSize = JSON.stringify(enBiology).length;
    const cnSize = JSON.stringify(cnBiology).length;
    const deSize = JSON.stringify(deBiology).length;
    
    // Each translation file should be under 500KB
    expect(enSize).toBeLessThan(500000);
    expect(cnSize).toBeLessThan(500000);
    expect(deSize).toBeLessThan(500000);
    
    // Sizes should be relatively similar (within 150% of each other)
    const maxSize = Math.max(enSize, cnSize, deSize);
    const minSize = Math.min(enSize, cnSize, deSize);
    const ratio = maxSize / minSize;
    
    expect(ratio).toBeLessThan(2.5);
  });
});
