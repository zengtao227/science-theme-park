/**
 * Translation Testing Utilities
 * 
 * Utilities for property-based testing of translation files
 */

import * as fc from 'fast-check';

/**
 * Arbitrary for generating translation keys
 */
export const translationKeyArbitrary = fc.stringMatching(/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/);

/**
 * Arbitrary for generating translation values
 */
export const translationValueArbitrary = fc.oneof(
  fc.string(),
  fc.record({
    basic: fc.string(),
    core: fc.string(),
    advanced: fc.string(),
    elite: fc.string(),
  })
);

/**
 * Check if all keys in object A exist in object B
 */
export function hasAllKeys(objA: any, objB: any, path: string = ''): { valid: boolean; missingKeys: string[] } {
  const missingKeys: string[] = [];
  
  function checkKeys(a: any, b: any, currentPath: string) {
    if (typeof a !== 'object' || a === null) return;
    
    for (const key in a) {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;
      
      if (!(key in b)) {
        missingKeys.push(fullPath);
        continue;
      }
      
      if (typeof a[key] === 'object' && a[key] !== null && !Array.isArray(a[key])) {
        if (typeof b[key] === 'object' && b[key] !== null && !Array.isArray(b[key])) {
          checkKeys(a[key], b[key], fullPath);
        } else {
          missingKeys.push(fullPath);
        }
      }
    }
  }
  
  checkKeys(objA, objB, path);
  
  return {
    valid: missingKeys.length === 0,
    missingKeys
  };
}

/**
 * Extract parameter placeholders from a string
 */
export function extractParameters(str: string): string[] {
  const matches = str.match(/\{(\w+)\}/g);
  if (!matches) return [];
  return matches.map(m => m.slice(1, -1));
}

/**
 * Normalize LaTeX text commands for comparison
 * Replaces \text{...} with a placeholder to ignore language-specific content
 */
function normalizeLatexText(str: string): string {
  return str.replace(/\\text\{[^}]*\}/g, '\\text{PLACEHOLDER}');
}

/**
 * Check if two translation strings have the same parameters
 */
export function haveSameParameters(str1: string, str2: string): boolean {
  // Normalize LaTeX text commands before comparing
  const normalized1 = normalizeLatexText(str1);
  const normalized2 = normalizeLatexText(str2);
  
  const params1 = extractParameters(normalized1).sort();
  const params2 = extractParameters(normalized2).sort();
  
  if (params1.length !== params2.length) return false;
  
  return params1.every((param, index) => param === params2[index]);
}

/**
 * Get all leaf values from a nested object
 */
export function getLeafValues(obj: any, path: string = ''): Array<{ path: string; value: any }> {
  const leaves: Array<{ path: string; value: any }> = [];
  
  function traverse(current: any, currentPath: string) {
    if (typeof current !== 'object' || current === null || Array.isArray(current)) {
      leaves.push({ path: currentPath, value: current });
      return;
    }
    
    for (const key in current) {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;
      traverse(current[key], fullPath);
    }
  }
  
  traverse(obj, path);
  return leaves;
}

/**
 * Fast-check configuration for translation tests
 */
export const translationTestConfig = {
  numRuns: 100,
  verbose: true,
};
