export type Protein = string;

export interface Recipe {
  id: string;
  name: string;
  protein: Protein;
  activeMinutes: number;
  isSoup: boolean;
  ingredients?: string[];
  instructions?: string[];
}

export interface UsedRecipe {
  recipeId: string;
  usedAt: string;
}

export interface PlanningOptions {
  recipes: Recipe[];
  protein?: Protein;
  allowSoups: boolean;
  usedRecipes: UsedRecipe[];
  today?: string;
}

export interface WeeklyPlanDay {
  weekday: string;
  recipe: Recipe;
}

export interface WeeklyPlan {
  days: WeeklyPlanDay[];
}

const weekdays = [
  'maanantai',
  'tiistai',
  'keskiviikko',
  'torstai',
  'perjantai',
  'lauantai',
  'sunnuntai',
] as const;

export function createWeeklyPlan(options: PlanningOptions): WeeklyPlan {
  const candidates = getEligibleRecipes(options);

  if (candidates.length < weekdays.length) {
    throw new Error('Seitsemää ehtoja täyttävää reseptiä ei ole saatavilla.');
  }

  return {
    days: weekdays.map((weekday, index) => ({ weekday, recipe: candidates[index] })),
  };
}

export function getEligibleRecipes(options: PlanningOptions, excludedRecipeIds: string[] = []): Recipe[] {
  const protein = options.protein ?? 'kana';
  const today = options.today ?? new Date().toISOString().slice(0, 10);
  const todayTime = Date.parse(`${today}T00:00:00Z`);
  const recentRecipeIds = new Set(
    options.usedRecipes
      .filter((usedRecipe) => {
        const ageInDays = (todayTime - Date.parse(`${usedRecipe.usedAt}T00:00:00Z`)) / 86_400_000;
        return ageInDays >= 0 && ageInDays < 14;
      })
      .map((usedRecipe) => usedRecipe.recipeId),
  );
  const excludedIds = new Set(excludedRecipeIds);

  return options.recipes
    .filter((recipe) => {
      return (
        recipe.protein === protein &&
        recipe.activeMinutes <= 45 &&
        (options.allowSoups || !recipe.isSoup) &&
        !recentRecipeIds.has(recipe.id) &&
        !excludedIds.has(recipe.id)
      );
    })
    .sort((left, right) => {
      const leftUsedAt = options.usedRecipes.find((usedRecipe) => usedRecipe.recipeId === left.id)?.usedAt;
      const rightUsedAt = options.usedRecipes.find((usedRecipe) => usedRecipe.recipeId === right.id)?.usedAt;
      if (!leftUsedAt && !rightUsedAt) return 0;
      if (!leftUsedAt) return 1;
      if (!rightUsedAt) return -1;
      return leftUsedAt.localeCompare(rightUsedAt);
    });
}

export function replacePlanDay(
  plan: WeeklyPlan,
  weekday: string,
  options: PlanningOptions,
  replacementId?: string,
): WeeklyPlan {
  const currentDay = plan.days.find((day) => day.weekday === weekday);
  if (!currentDay) {
    throw new Error(`Viikonpäivää ei löydy: ${weekday}`);
  }

  const excludedRecipeIds = plan.days.map((day) => day.recipe.id);
  const candidates = getEligibleRecipes(options, excludedRecipeIds);
  const replacement = replacementId
    ? candidates.find((candidate) => candidate.id === replacementId)
    : candidates[0];
  if (!replacement) {
    throw new Error('Korvaavaa reseptiä ei ole saatavilla.');
  }

  return {
    days: plan.days.map((day) => (day.weekday === weekday ? { ...day, recipe: replacement } : day)),
  };
}

export function recordRecipeUsage(recipeId: string, usedRecipes: UsedRecipe[], usedAt: string): UsedRecipe[] {
  return [...usedRecipes, { recipeId, usedAt }];
}
