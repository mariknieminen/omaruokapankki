import type { Recipe } from '../domain/planning.js';

const recipe = (
  id: string,
  name: string,
  protein: string,
  activeMinutes: number,
  isSoup: boolean,
  ingredients: string[],
  instructions: string[],
): Recipe => ({ id, name, protein, activeMinutes, isSoup, ingredients, instructions });

export const recipes: Recipe[] = [
  recipe('kana-pasta', 'Kermainen kanapasta', 'kana', 30, false, ['400 g kanan fileesuikaleita', '300 g pastaa', '2 dl ruokakermaa', '1 sipuli'], ['Keitä pasta pakkauksen ohjeen mukaan.', 'Ruskista kana ja sipuli pannulla.', 'Lisää kerma ja yhdistä kastike pastaan.']),
  recipe('kana-fajitas', 'Kana-fajitakset', 'kana', 25, false, ['400 g kanan fileesuikaleita', '8 tortillaa', '1 paprika', '1 sipuli'], ['Paista kana pannulla kypsäksi.', 'Lisää suikaloidut kasvikset ja mausteet.', 'Tarjoa tortilloissa.']),
  recipe('kana-wokki', 'Nopea kanawokki', 'kana', 20, false, ['400 g kanan fileesuikaleita', '400 g wokvihanneksia', '250 g nuudeleita'], ['Keitä nuudelit.', 'Paista kana ja kasvikset kuumalla pannulla.', 'Sekoita nuudelit joukkoon.']),
  recipe('sitruunakana', 'Sitruunakana ja riisi', 'kana', 35, false, ['400 g kanan fileitä', '3 dl riisiä', '1 sitruuna', '2 dl ruokakermaa'], ['Keitä riisi.', 'Paista kana pannulla.', 'Lisää sitruuna ja kerma, ja hauduta kypsäksi.']),
  recipe('kanariisivuoka', 'Helppo kanariisivuoka', 'kana', 40, false, ['400 g kanan fileesuikaleita', '3 dl riisiä', '5 dl kanalientä', '1 paprika'], ['Sekoita ainekset vuoassa.', 'Kypsennä 200 asteessa noin 35 minuuttia.']),
  recipe('kana-kasvispelti', 'Kana-kasvispelti', 'kana', 30, false, ['400 g kanan fileitä', '600 g juureksia', '2 rkl öljyä'], ['Pilko ainekset pellille.', 'Mausta ja paahda 225 asteessa noin 30 minuuttia.']),
  recipe('kananuudelit', 'Kananuudelit teriyakikastikkeella', 'kana', 25, false, ['400 g kanaa', '250 g nuudeleita', '1 dl teriyakikastiketta'], ['Keitä nuudelit.', 'Paista kana kypsäksi.', 'Lisää kastike ja nuudelit pannulle.']),
  recipe('kana-pesto', 'Kana-pestopasta', 'kana', 30, false, ['400 g kanaa', '300 g pastaa', '1 dl pestoa', '100 g kirsikkatomaatteja'], ['Keitä pasta.', 'Paista kana.', 'Sekoita pesto, pasta ja kana yhteen.']),
  recipe('kana-couscous', 'Kana-couscous ja kasvikset', 'kana', 25, false, ['400 g kanaa', '3 dl couscousta', '1 kesäkurpitsa', '1 paprika'], ['Valmista couscous.', 'Paista kana ja kasvikset.', 'Sekoita ainekset yhteen.']),
  recipe('kana-tomaattipannu', 'Kana-tomaattipannu', 'kana', 35, false, ['400 g kanaa', '400 g tomaattimurskaa', '1 sipuli', '2 dl riisiä'], ['Keitä riisi.', 'Ruskista kana ja sipuli.', 'Lisää tomaattimurska ja hauduta.']),
  recipe('kana-kookos', 'Kookoskana ja riisi', 'kana', 30, false, ['400 g kanaa', '400 ml kookosmaitoa', '1 paprika', '3 dl riisiä'], ['Keitä riisi.', 'Paista kana ja paprika.', 'Lisää kookosmaito ja hauduta 10 minuuttia.']),
  recipe('kana-perunat', 'Kana ja rapeat uuniperunat', 'kana', 35, false, ['400 g kanan fileitä', '700 g perunoita', '2 rkl öljyä'], ['Lohko perunat ja mausta.', 'Paahda perunoita 225 asteessa 20 minuuttia.', 'Lisää kana ja kypsennä valmiiksi.']),
  recipe('kana-nuudelikeitto', 'Kananuudelikeitto', 'kana', 30, true, ['400 g kanaa', '1 l kanalientä', '200 g nuudeleita', '200 g kasviksia'], ['Kiehauta liemi.', 'Lisää kana ja kasvikset.', 'Lisää nuudelit ja kypsennä.']),
  recipe('lohipasta', 'Kermainen lohipasta', 'kala', 30, false, ['400 g lohta', '300 g pastaa', '2 dl ruokakermaa', '1 sitruuna'], ['Keitä pasta.', 'Kypsennä lohi pannulla.', 'Lisää kerma ja sitruuna, ja sekoita pastaan.']),
  recipe('kalatacot', 'Helpot kalatacot', 'kala', 25, false, ['400 g vaaleaa kalaa', '8 tortillaa', '1 pieni kaali', '1 dl jogurttia'], ['Paista kala mausteilla.', 'Suikaloi kaali.', 'Täytä tortillat kalalla, kaalilla ja kastikkeella.']),
  recipe('kala-perunapelti', 'Kala-perunapelti', 'kala', 40, false, ['400 g kalaa', '700 g perunoita', '1 sitruuna'], ['Paahda perunat pellillä.', 'Lisää kala ja sitruuna.', 'Kypsennä valmiiksi 200 asteessa.']),
  recipe('kalakeitto', 'Kermainen kalakeitto', 'kala', 35, true, ['400 g kalaa', '600 g perunoita', '1 l kalalientä', '2 dl kermaa'], ['Keitä perunat liemessä.', 'Lisää kala.', 'Viimeistele kermalla ja kypsennä.']),
  recipe('jauhelihapasta', 'Jauhelihapasta', 'jauheliha', 30, false, ['400 g naudan jauhelihaa', '300 g pastaa', '400 g tomaattimurskaa', '1 sipuli'], ['Keitä pasta.', 'Ruskista jauheliha ja sipuli.', 'Lisää tomaattimurska ja yhdistä pastaan.']),
  recipe('jauheliha-perunat', 'Jauheliha-perunapannu', 'jauheliha', 35, false, ['400 g naudan jauhelihaa', '600 g perunoita', '1 sipuli', '1 paprika'], ['Keitä perunat puolikypsiksi.', 'Ruskista jauheliha ja kasvikset.', 'Yhdistä ainekset pannulla.']),
  recipe('jauhelihakeitto', 'Helppo jauhelihakeitto', 'jauheliha', 35, true, ['400 g naudan jauhelihaa', '600 g perunoita', '1 l lihalientä', '200 g kasviksia'], ['Ruskista jauheliha.', 'Keitä perunat ja kasvikset liemessä.', 'Lisää jauheliha ja hauduta.']),
  recipe('tofu-wokki', 'Tofu-kasviswokki', 'tofu', 25, false, ['400 g tofua', '400 g wokvihanneksia', '250 g nuudeleita'], ['Keitä nuudelit.', 'Paista tofu rapeaksi.', 'Lisää kasvikset ja nuudelit pannulle.']),
  recipe('linssikastike', 'Nopea linssikastike', 'linssi', 30, false, ['2 dl punaisia linssejä', '400 g tomaattimurskaa', '1 sipuli', '3 dl riisiä'], ['Keitä riisi.', 'Kuullota sipuli.', 'Lisää linssit ja tomaattimurska, ja hauduta.']),
];

export const proteinOptions = [...new Set(recipes.map((item) => item.protein))];
