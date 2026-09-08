import { describe, expect, it } from 'vitest';
import { createWeeklyPlan, replacePlanDay } from './planning.js';

const recipes = [
  { id: 'chicken-1', name: 'Kermainen kanapasta', protein: 'kana', activeMinutes: 30, isSoup: false },
  { id: 'chicken-2', name: 'Kana-fajitakset', protein: 'kana', activeMinutes: 25, isSoup: false },
  { id: 'chicken-3', name: 'Kanawokki', protein: 'kana', activeMinutes: 20, isSoup: false },
  { id: 'chicken-4', name: 'Sitruunakana', protein: 'kana', activeMinutes: 35, isSoup: false },
  { id: 'chicken-5', name: 'Kanariisivuoka', protein: 'kana', activeMinutes: 40, isSoup: false },
  { id: 'chicken-6', name: 'Kana-kasvispelti', protein: 'kana', activeMinutes: 30, isSoup: false },
  { id: 'chicken-7', name: 'Kananuudelit', protein: 'kana', activeMinutes: 25, isSoup: false },
  { id: 'chicken-8', name: 'Kanakeitto', protein: 'kana', activeMinutes: 30, isSoup: true },
];

describe('createWeeklyPlan', () => {
  it('creates seven weekday entries with chicken as the default protein', () => {
    const plan = createWeeklyPlan({ recipes, allowSoups: false, usedRecipes: [] });

    expect(plan.days).toHaveLength(7);
    expect(plan.days.map((day) => day.weekday)).toEqual([
      'maanantai',
      'tiistai',
      'keskiviikko',
      'torstai',
      'perjantai',
      'lauantai',
      'sunnuntai',
    ]);
    expect(plan.days.every((day) => day.recipe.protein === 'kana')).toBe(true);
    expect(plan.days.every((day) => day.recipe.isSoup === false)).toBe(true);
  });

  it('uses the selected protein and accepts exactly 45 active minutes', () => {
    const fishRecipes = Array.from({ length: 7 }, (_, index) => ({
      id: `fish-${index + 1}`,
      name: `Kalaresepti ${index + 1}`,
      protein: 'kala',
      activeMinutes: index === 0 ? 45 : 30,
      isSoup: false,
    }));

    const plan = createWeeklyPlan({
      recipes: fishRecipes,
      protein: 'kala',
      allowSoups: false,
      usedRecipes: [],
    });

    expect(plan.days).toHaveLength(7);
    expect(plan.days.every((day) => day.recipe.protein === 'kala')).toBe(true);
    expect(plan.days.some((day) => day.recipe.activeMinutes === 45)).toBe(true);
  });

  it('rejects recipes with more than 45 active minutes', () => {
    const slowRecipes = Array.from({ length: 7 }, (_, index) => ({
      id: `slow-${index + 1}`,
      name: `Hidas resepti ${index + 1}`,
      protein: 'kana',
      activeMinutes: index === 0 ? 46 : 30,
      isSoup: false,
    }));

    expect(() => createWeeklyPlan({ recipes: slowRecipes, allowSoups: false, usedRecipes: [] })).toThrow(
      'Seitsemää ehtoja täyttävää reseptiä ei ole saatavilla.',
    );
  });

  it('excludes recipes used within 14 days but allows a recipe used 14 days ago', () => {
    const recipes = Array.from({ length: 8 }, (_, index) => ({
      id: `history-${index + 1}`,
      name: `Historian resepti ${index + 1}`,
      protein: 'kana',
      activeMinutes: 30,
      isSoup: false,
    }));

    const plan = createWeeklyPlan({
      recipes,
      allowSoups: false,
      usedRecipes: [
        { recipeId: 'history-1', usedAt: '2026-09-07' },
        { recipeId: 'history-2', usedAt: '2026-08-25' },
      ],
      today: '2026-09-08',
    });

    expect(plan.days.map((day) => day.recipe.id)).not.toContain('history-1');
    expect(plan.days.map((day) => day.recipe.id)).toContain('history-2');
  });

  it('prefers the recipe with the oldest previous use', () => {
    const plan = createWeeklyPlan({
      recipes: Array.from({ length: 8 }, (_, index) => ({
        id: `sorted-${index + 1}`,
        name: `Järjestetty resepti ${index + 1}`,
        protein: 'kana',
        activeMinutes: 30,
        isSoup: false,
      })),
      allowSoups: false,
      usedRecipes: [
        { recipeId: 'sorted-1', usedAt: '2026-08-01' },
        { recipeId: 'sorted-2', usedAt: '2026-08-15' },
      ],
      today: '2026-09-08',
    });

    expect(plan.days[0].recipe.id).toBe('sorted-1');
  });

  it('replaces only the selected weekday', () => {
    const plan = createWeeklyPlan({ recipes, allowSoups: false, usedRecipes: [] });
    const replaced = replacePlanDay(plan, 'keskiviikko', {
      recipes: [
        ...recipes,
        { id: 'replacement', name: 'Uusi kanaresepti', protein: 'kana', activeMinutes: 20, isSoup: false },
        { id: 'replacement-2', name: 'Toinen uusi kanaresepti', protein: 'kana', activeMinutes: 20, isSoup: false },
      ],
      allowSoups: false,
      usedRecipes: [],
      today: '2026-09-08',
    }, 'replacement-2');

    expect(replaced.days.find((day) => day.weekday === 'keskiviikko')?.recipe.id).toBe('replacement-2');
    expect(replaced.days.filter((day) => day.weekday !== 'keskiviikko').map((day) => day.recipe.id)).toEqual(
      plan.days.filter((day) => day.weekday !== 'keskiviikko').map((day) => day.recipe.id),
    );
  });
});
