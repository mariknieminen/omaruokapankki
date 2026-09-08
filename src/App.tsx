import { useEffect, useState } from 'react';
import { createWeeklyPlan, recordRecipeUsage, replacePlanDay, type Recipe, type WeeklyPlan } from './domain/planning.js';
import { proteinOptions, recipes } from './data/recipes.js';
import { loadAppState, saveAppState, type AppState } from './storage/appStorage.js';

const weekdays = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'];

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function recipeUsedAt(recipeId: string, state: AppState): string | undefined {
  return state.usedRecipes.find((item) => item.recipeId === recipeId)?.usedAt;
}

export default function App() {
  const [protein, setProtein] = useState('kana');
  const [allowSoups, setAllowSoups] = useState(false);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [usedRecipes, setUsedRecipes] = useState<AppState['usedRecipes']>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [replacingDay, setReplacingDay] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    void loadAppState().then((saved) => {
      if (saved) {
        setProtein(saved.protein || 'kana');
        setAllowSoups(saved.allowSoups);
        setPlan(saved.plan);
        setUsedRecipes(saved.usedRecipes);
      }
      setIsLoading(false);
    });
  }, []);

  async function persist(nextPlan: WeeklyPlan | null, nextUsedRecipes: AppState['usedRecipes']): Promise<void> {
    setIsSaving(true);
    await saveAppState({ plan: nextPlan, usedRecipes: nextUsedRecipes, protein, allowSoups });
    setIsSaving(false);
  }

  async function generatePlan(): Promise<void> {
    setError('');
    try {
      const nextPlan = createWeeklyPlan({ recipes, protein, allowSoups, usedRecipes, today: todayString() });
      const nextUsedRecipes = nextPlan.days.reduce(
        (history, day) => recordRecipeUsage(day.recipe.id, history, todayString()),
        usedRecipes,
      );
      setPlan(nextPlan);
      setUsedRecipes(nextUsedRecipes);
      await persist(nextPlan, nextUsedRecipes);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : 'Suunnitelmaa ei voitu muodostaa.');
    }
  }

  async function replaceDay(weekday: string, replacementId: string): Promise<void> {
    setError('');
    if (!plan) return;
    try {
      const nextPlan = replacePlanDay(plan, weekday, { recipes, protein, allowSoups, usedRecipes, today: todayString() }, replacementId);
      const replacement = nextPlan.days.find((day) => day.weekday === weekday)?.recipe;
      if (!replacement) return;
      const nextUsedRecipes = recordRecipeUsage(replacement.id, usedRecipes, todayString());
      setPlan(nextPlan);
      setUsedRecipes(nextUsedRecipes);
      setReplacingDay(null);
      await persist(nextPlan, nextUsedRecipes);
    } catch (replacementError) {
      setError(replacementError instanceof Error ? replacementError.message : 'Reseptiä ei voitu vaihtaa.');
    }
  }

  function updateProtein(value: string): void {
    setProtein(value);
    setPlan(null);
    setError('');
  }

  function updateSoups(value: boolean): void {
    setAllowSoups(value);
    setPlan(null);
    setError('');
  }

  if (isLoading) {
    return <main className="shell loading-state">Ladataan suunnitelmaa...</main>;
  }

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">OMARUOKAPANKKI</p>
          <h1>Viikon päivälliset, valmiiksi ajateltuna.</h1>
          <p className="hero-copy">Seitsemän reseptiä maanantaista sunnuntaihin. Valitse pääproteiini, päätä keitoista ja anna viikon järjestyä.</p>
        </div>
        <div className="hero-mark" aria-hidden="true">07</div>
      </header>

      <section className="controls" aria-labelledby="settings-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / ASETUKSET</p>
            <h2 id="settings-heading">Millaista viikkoa rakennetaan?</h2>
          </div>
          <span className="status-dot">{isSaving ? 'Tallennetaan' : 'Paikallinen suunnitelma'}</span>
        </div>
        <div className="control-grid">
          <label className="field">
            <span>Pääproteiini</span>
            <select value={protein} onChange={(event) => updateProtein(event.target.value)}>
              {proteinOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <small>Yksi pääproteiinilähde koko viikolle.</small>
          </label>
          <label className="toggle-field">
            <span className="toggle-copy"><strong>Keitot mukaan</strong><small>Salli keittoreseptit tämän viikon suunnitelmassa.</small></span>
            <input type="checkbox" checked={allowSoups} onChange={(event) => updateSoups(event.target.checked)} />
            <span className="toggle-track" aria-hidden="true"><span /></span>
          </label>
          <button className="primary-button" type="button" onClick={() => void generatePlan()}>
            {plan ? 'Muodosta uusi viikko' : 'Muodosta viikon suunnitelma'}
            <span aria-hidden="true">-&gt;</span>
          </button>
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
      </section>

      <section className="week-section" aria-labelledby="week-heading">
        <div className="section-heading week-heading">
          <div>
            <p className="eyebrow">02 / VIIKKO</p>
            <h2 id="week-heading">{plan ? 'Maanantai - sunnuntai' : 'Viikko odottaa reseptejä'}</h2>
          </div>
          {plan && <span className="week-count">{plan.days.length} päivää</span>}
        </div>
        {plan ? (
          <div className="week-list">
            {plan.days.map((day, index) => (
              <article className="day-row" key={day.weekday}>
                <div className="day-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="day-name">{day.weekday}</div>
                <div className="meal-info">
                  <h3>{day.recipe.name}</h3>
                  <p>{day.recipe.protein} <span>/</span> {day.recipe.activeMinutes} min aktiivista työtä {day.recipe.isSoup && <><span>/</span> keitto</>}</p>
                </div>
                <div className="day-actions">
                  <button className="quiet-button" type="button" onClick={() => setSelectedRecipe(day.recipe)}>Avaa resepti</button>
                  <button className="icon-button" type="button" aria-label={`Vaihda ${day.weekday} resepti`} onClick={() => setReplacingDay(day.weekday)}>-&gt;</button>
                </div>
                {replacingDay === day.weekday && (
                  <div className="replace-panel">
                    <p>Valitse uusi resepti päivälle <strong>{day.weekday}</strong>.</p>
                    <div className="replace-options">
                      {recipes.filter((candidate) => candidate.id !== day.recipe.id && candidate.protein === protein && candidate.activeMinutes <= 45 && (allowSoups || !candidate.isSoup) && !plan.days.some((item) => item.recipe.id === candidate.id) && !usedRecipes.some((item) => item.recipeId === candidate.id && (Date.parse(todayString()) - Date.parse(item.usedAt)) / 86400000 < 14)).slice(0, 3).map((candidate) => (
                        <button key={candidate.id} type="button" onClick={() => void replaceDay(day.weekday, candidate.id)}>
                          <span>{candidate.name}</span><small>{candidate.activeMinutes} min</small>
                        </button>
                      ))}
                    </div>
                    <button className="cancel-button" type="button" onClick={() => setReplacingDay(null)}>Peruuta</button>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-plan"><span className="empty-mark">+</span><p>Valitse asetukset ja muodosta ensimmäinen viikon suunnitelma.</p></div>
        )}
      </section>

      {selectedRecipe && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedRecipe(null)}>
          <aside className="recipe-modal" role="dialog" aria-modal="true" aria-labelledby="recipe-heading" onClick={(event) => event.stopPropagation()}>
            <button className="close-button" type="button" aria-label="Sulje resepti" onClick={() => setSelectedRecipe(null)}>x</button>
            <p className="eyebrow">RESEPTI</p>
            <h2 id="recipe-heading">{selectedRecipe.name}</h2>
            <p className="recipe-meta">{selectedRecipe.protein} <span>/</span> {selectedRecipe.activeMinutes} min aktiivista työtä</p>
            <div className="recipe-columns">
              <div><h3>Ainekset</h3><ul>{selectedRecipe.ingredients?.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul></div>
              <div><h3>Valmistus</h3><ol>{selectedRecipe.instructions?.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol></div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

export { recipeUsedAt, weekdays };
