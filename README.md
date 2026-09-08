# Omaruokapankki

Omaruokapankki muodostaa viikon päivällissuunnitelman maanantaista sunnuntaihin. Käyttäjä valitsee pääasiallisen proteiininlähteen ja päättää, sallitaanko keitot. Sovellus valitsee reseptit, joiden aktiivinen valmistusaika on enintään 45 minuuttia, ja välttää käyttäjän viimeisen 14 päivän aikana käyttämiä reseptejä.

## Ominaisuudet

- Seitsemän päivän päivällissuunnitelma
- Kanan oletusproteiinina
- Pääproteiinilähteen valinta
- Keittojen salliminen tai estäminen
- Enintään 45 minuutin aktiivinen työaika
- 14 päivän reseptihistoria
- Vanhimpien käyttämättömien reseptien suosiminen
- Yksittäisen päivän reseptin vaihtaminen
- Reseptien ainesosat ja valmistusohjeet suomeksi
- Suunnitelman paikallinen tallennus selaimeen
- Responsiivinen käyttöliittymä työpöydälle ja mobiilille

## Käynnistäminen

Asenna riippuvuudet:

```bash
npm install
```

Käynnistä kehityspalvelin:

```bash
npm run dev
```

Avaa terminaalin ilmoittama paikallinen osoite selaimessa.

## Tarkistukset

Aja testit:

```bash
npm test
```

Aja TypeScriptin tyyppitarkistus:

```bash
npm run typecheck
```

Luo tuotantobuild:

```bash
npm run build
```

## Projektin rakenne

- `src/domain/` sisältää suunnittelun liiketoimintasäännöt ja niiden testit.
- `src/data/` sisältää sovelluksen reseptikirjaston.
- `src/storage/` sisältää selaimeen tallentamisen.
- `src/App.tsx` sisältää sovelluksen pääkäyttöliittymän.
- `src/styles.css` sisältää käyttöliittymän tyylit.
- `specs/` sisältää tuotteen vaatimus-, arkkitehtuuri-, UI/UX- ja ominaisuusspeksejä.

## MVP:n rajaus

Sovellus on tarkoitettu henkilökohtaiseen käyttöön. MVP ei sisällä käyttäjätilejä, kuvia, ravintoarvoja, ostoslistaa, allergiasuodattimia tai usean laitteen synkronointia.
