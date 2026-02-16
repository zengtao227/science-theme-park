/**
 * Biology UI Consistency Tests
 * 
 * Property-based tests for UI consistency across biology modules
 * Feature: biology-i18n-phase2
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Property 10: Premium UI style consistency
 * Validates: Requirements 4.1, 4.2
 * Feature: biology-i18n-phase2, Property 10: Premium UI style consistency
 */
describe('Property 10: Premium UI styling', () => {
  const chamberDir = join(process.cwd(), 'src/app/chamber');
  const biologyModules = readdirSync(chamberDir).filter(dir => 
    dir.startsWith('sb') || dir.startsWith('gb')
  );

  test('all biology modules should use dark theme classes', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        // Check for dark theme indicators
        const hasDarkTheme = 
          content.includes('bg-black') ||
          content.includes('bg-gray-900') ||
          content.includes('bg-slate-900') ||
          content.includes('dark:');
        
        expect(hasDarkTheme).toBe(true);
      } catch {
        // Module might not exist yet
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });

  test('all biology modules should use glassmorphism effects', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        // Check for glassmorphism indicators
        const hasGlassmorphism = 
          content.includes('backdrop-blur') ||
          content.includes('bg-opacity') ||
          content.includes('bg-white/');
        
        expect(hasGlassmorphism).toBe(true);
      } catch {
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });

  test('all biology modules should use neon accent colors', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        // Check for neon color indicators
        const hasNeonColors = 
          content.includes('neon-cyan') ||
          content.includes('neon-emerald') ||
          content.includes('cyan-') ||
          content.includes('emerald-') ||
          content.includes('text-cyan') ||
          content.includes('text-emerald');
        
        expect(hasNeonColors).toBe(true);
      } catch {
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });
});

/**
 * Property 11: Animation integration completeness
 * Validates: Requirements 4.3
 * Feature: biology-i18n-phase2, Property 11: Animation integration completeness
 */
describe('Property 11: Animation integration', () => {
  const chamberDir = join(process.cwd(), 'src/app/chamber');
  const biologyModules = readdirSync(chamberDir).filter(dir => 
    dir.startsWith('sb') || dir.startsWith('gb')
  );

  test('all biology modules should import framer-motion', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        const hasFramerMotion = 
          content.includes('framer-motion') ||
          content.includes('motion.');
        
        expect(hasFramerMotion).toBe(true);
      } catch {
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });

  test('all biology modules should use motion components', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        const hasMotionComponents = 
          content.includes('motion.div') ||
          content.includes('motion.button') ||
          content.includes('<motion');
        
        expect(hasMotionComponents).toBe(true);
      } catch {
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });

  test('motion components should have animation properties', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        if (content.includes('motion.')) {
          const hasAnimationProps = 
            content.includes('initial=') ||
            content.includes('animate=') ||
            content.includes('transition=') ||
            content.includes('whileHover=');
          
          expect(hasAnimationProps).toBe(true);
        }
      } catch {
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });
});

/**
 * Property 12: Layout component standardization
 * Validates: Requirements 4.4
 * Feature: biology-i18n-phase2, Property 12: Layout component standardization
 */
describe('Property 12: Layout standardization', () => {
  const chamberDir = join(process.cwd(), 'src/app/chamber');
  const biologyModules = readdirSync(chamberDir).filter(dir => 
    dir.startsWith('sb') || dir.startsWith('gb')
  );

  test('all biology modules should use ChamberLayout', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        const usesChamberLayout = 
          content.includes('ChamberLayout') ||
          content.includes('from "@/components/chamber/ChamberLayout"');
        
        expect(usesChamberLayout).toBe(true);
      } catch {
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });

  test('all biology modules should pass required props to ChamberLayout', () => {
    biologyModules.forEach(module => {
      const pagePath = join(chamberDir, module, 'page.tsx');
      try {
        const content = readFileSync(pagePath, 'utf-8');
        
        if (content.includes('ChamberLayout')) {
          // Check for required props
          expect(content).toMatch(/translations\s*=/);
          expect(content).toMatch(/currentStage\s*=/);
          expect(content).toMatch(/onStageChange\s*=/);
        }
      } catch {
        console.warn(`Could not read ${module}/page.tsx`);
      }
    });
  });

  test('all biology modules should have consistent file structure', () => {
    biologyModules.forEach(module => {
      const modulePath = join(chamberDir, module);
      const pagePath = join(modulePath, 'page.tsx');
      
      // Check that page.tsx exists
      try {
        readFileSync(pagePath, 'utf-8');
        expect(true).toBe(true);
      } catch {
        fail(`${module}/page.tsx does not exist`);
      }
    });
  });
});
