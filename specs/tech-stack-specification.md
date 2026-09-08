# Tech Stack Specification: Viikon päivällissuunnitelma MVP

## Dokumentin tila

- **Tila:** Ehdotus
- **Päivitetty:** 2026-09-08
- **Tavoite:** Nopea MVP-kehitys vähäisellä ylläpitokuormalla
- **Liittyvä arkkitehtuuri:** [Architecture Specification](architecture-specification.md)
- **Liittyvä UI/UX:** [UI/UX Specification](ui-ux-specification.md)
- **Liittyvä ominaisuus:** [Viikon päivällissuunnitelman muodostaminen](features/weekly-dinner-planning.md)

## 1. Valintaperusteet

Teknologiapinon tulee:

- olla kevyt yhdelle henkilökohtaiselle käyttäjälle
- mahdollistaa nopea selainpohjainen kehitys
- tukea suomenkielistä sisältöä ja selkeää responsiivista käyttöliittymää
- säilyttää reseptit ja historia ilman ensimmäisen version palvelinpuolta
- mahdollistaa liiketoimintasääntöjen yksikkötestaus
- välttää ulkoisia ajonaikaisia resepti- ja ravintopalveluja
- olla helposti siirrettävissä palvelinpuolelle, jos tuote myöhemmin laajenee

## 2. Suositeltu MVP-pino

### Käyttöliittymä ja sovellusalusta

- **React** käyttöliittymän rakentamiseen
- **TypeScript** tyyppiturvaan ja liiketoimintasääntöjen selkeyteen
- **Vite** kehitys- ja tuotantorakentamiseen
- **Selainpohjainen single-page application** ilman palvelinrenderöinnin tarvetta

Perustelu: tämä yhdistelmä on pieni, yleinen ja sopii hyvin paikalliseen, interaktiiviseen sovellukseen. MVP ei tarvitse palvelinrenderöintiä, kirjautumista tai palvelinpuolen API:a.

### Käyttöliittymän tyylit

- Tavallinen CSS tai CSS Modules
- Ei käyttöliittymäkomponenttikirjastoa ensimmäisessä vaiheessa
- Selkeä responsiivinen asettelu
- Värien, typografian ja tilojen keskitetty määrittely

Perustelu: muutama näkymä ei tarvitse raskasta design-järjestelmäriippuvuutta. Oma kevyt tyylikerros pitää ulkoasun hallittavana ja vähentää riippuvuuksia.

### Paikallinen tallennus

- **IndexedDB** käyttäjän viikkosuunnitelman ja vähintään 14 päivän käyttöhistorian tallentamiseen
- Kevyt selainkirjasto IndexedDB:n käsittelyyn voidaan valita toteutuksen alussa, jos suora selainrajapinta koetaan liian työlääksi

Perustelu: historia ja suunnitelma tarvitsevat selaimen sulkemisen kestävän tallennuksen. Pelkkä muistin tila ei riitä, eikä `localStorage` ole paras valinta kasvavalle rakenteiselle sisällölle.

### Reseptiaineisto

- Sovelluksen mukana toimitettava, versionhallittu reseptitiedosto
- Reseptit validoidaan ennen kuin ne lisätään julkaistavaan aineistoon
- Reseptit sisältävät suunnittelussa vaaditut metatiedot

Perustelu: reseptien on oltava suomenkielisiä, käyttöoikeudellisesti sallittuja ja luotettavasti luokiteltuja. Ajonaikainen ulkoinen resepti-API lisäisi käyttöehto-, kieli-, saatavuus- ja kustannusriskejä.

### Testaus

- **Vitest** liiketoimintalogiikan ja komponenttien yksikkötesteihin
- **Testing Library** käyttäjän näkökulmaa vastaaviin käyttöliittymätesteihin
- **Playwright** pääkäyttökulun selainpohjaisiin E2E-testeihin

Perustelu: suunnittelumoottorin 14 päivän sääntö, 45 minuutin raja, oletuskana, reseptin vaihto ja riittämätön reseptimäärä ovat kriittisiä ja tarvitsevat automatisoidun testauksen.

### Staattinen analyysi ja laadunvarmistus

- TypeScriptin tiukka tyyppitarkistus
- ESLint
- Prettier

Tarkat versiot lukitaan projektin alustamisen yhteydessä nykyisen vakaan version mukaan. Tässä spesifikaatiossa ei lukita versiolukuja ennen projektin alustamista.

### Julkaisu

- Staattinen hosting-palvelu, joka tukee selainpohjaisen sovelluksen julkaisemista
- Ei erillistä palvelinta tai tietokantaa MVP:ssä
- Julkaisuympäristön valinta tehdään projektin alustamisen yhteydessä kustannusten, helppouden ja käyttöehdot huomioiden

## 3. Sovelluksen sisäinen jako

Teknologiavalinnat eivät saa sekoittaa seuraavia vastuita:

- **domain:** viikonpäivät, reseptien kelpoisuusehdot, aktiivinen työaika, keitot ja 14 päivän sääntö
- **planning:** suunnitelman muodostaminen ja vanhimman sopivan reseptin suosiminen
- **content:** reseptiaineiston lataaminen ja validointi
- **storage:** IndexedDB:n luku- ja kirjoitusoperaatiot
- **ui:** asetukset, viikon suunnitelma, reseptin tarkastelu ja vaihto

Suunnittelun liiketoimintalogiikka ei saa riippua React-komponenteista tai selaimen tallennusrajapinnasta. Tämä tekee säännöistä testattavia ja mahdollistaa myöhemmän palvelinpuolelle siirtämisen.

## 4. Mitä MVP:ssä ei valita

- Ei palvelinpuolen frameworkia.
- Ei tietokantapalvelua.
- Ei käyttäjähallintaa tai kirjautumispalvelua.
- Ei ulkoista resepti-API:a ajonaikaiseksi riippuvuudeksi.
- Ei tekoälypalvelua reseptien generointiin.
- Ei ravintoarvo-API:a.
- Ei analytiikka- tai seurantapalvelua ilman erillistä tarvetta ja tietosuojapäätöstä.
- Ei UI-komponenttikirjastoa ennen kuin oma kevyt toteutus osoittautuu riittämättömäksi.

## 5. Vaihtoehdot ja perustelut

### Palvelinpuolinen full-stack-ratkaisu

Palvelinpuolinen sovellus olisi perusteltu, jos tarvitaan useita käyttäjiä, kirjautuminen, synkronointi eri laitteille tai keskitetty reseptikirjaston hallinta. Henkilökohtaisessa MVP:ssä se lisäisi kuitenkin tietokannan, hostingin, autentikoinnin, tietosuojan ja ylläpidon tarpeita.

### `localStorage`

`localStorage` voisi riittää aivan pieneen prototyyppiin, mutta reseptien, viikon suunnitelman ja käyttöhistorian rakenteinen käsittely on selkeämpää IndexedDB:llä. `localStorage` voidaan hyväksyä vain lyhyessä kokeilussa, jos tietosisältö pidetään hyvin pienenä.

### Ulkoinen resepti-API

Ulkoinen palvelu voisi nopeuttaa alkuvaiheen aineiston hankintaa, mutta tutkimusvaiheessa tunnistetut riskit ovat merkittäviä: käyttöehdot, attribuutio, reseptitekstien näyttö- ja tallennusrajoitukset, suomenkielisen aineiston määrä, käyttörajat ja palveluriippuvuus. MVP:n ensisijaiseksi aineistolähteeksi suositellaan omaa tai asianmukaisesti lisensoitua reseptikirjastoa.

## 6. MVP:n tekniset hyväksymiskriteerit

- **TS1:** Sovellus voidaan kehittää, testata ja julkaista ilman palvelinprosessia ja erillistä tietokantapalvelua.
- **TS2:** Käyttäjän viimeisin viikkosuunnitelma säilyy selaimen sulkemisen ja uudelleen avaamisen jälkeen samalla selaimella.
- **TS3:** Käyttöhistoria säilyy riittävästi, jotta viimeisen 14 päivän reseptit voidaan sulkea pois.
- **TS4:** Suunnittelumoottorin yksikkötestit voidaan suorittaa ilman selainta, käyttöliittymää tai ulkoista verkkopalvelua.
- **TS5:** Suositeltu pino tukee suomenkielistä tekstisisältöä, viikonpäivien näkymää ja responsiivista käyttöliittymää.
- **TS6:** Ajonaikainen reseptisuunnitelma ei riipu ulkoisen resepti-API:n saatavuudesta.
- **TS7:** Teknologiavalinnat eivät estä suunnittelumoottorin myöhempää siirtämistä palvelinpuolelle.
- **TS8:** Käytössä on automatisoitu tarkistus vähintään tyypitykselle, lintaukselle, liiketoimintalogiikalle ja pääkäyttökululle.

## 7. Avoimet teknologiapäätökset

- IndexedDB:n suora käyttö vai kevyt selainkirjasto.
- Staattisen hosting-palvelun valinta.
- Tarvitaanko offline-käyttöä ensimmäisessä versiossa.
- Tarvitaanko paikallisten tietojen vienti- ja tuontitoiminto.
- Käytetäänkö CSS Modules -mallia vai yhtä keskitettyä CSS-tyylikerrosta.
- Reseptiaineiston tarkka tiedostomuoto ja validointityökalu.

## 8. Siirtymä myöhempään versioon

Jos tuote tarvitsee kirjautumisen, useita laitteita tai reseptien keskitetyn hallinnan, seuraava vaihe voi lisätä palvelinpuolen tallennuksen ja autentikoinnin. Siirtymässä tulee säilyttää:

- sama viikonpäivien järjestys
- sama pääproteiinivalinta ja kanan oletus
- sama keittoasetus
- sama 45 minuutin aktiivisen työajan raja
- sama 14 päivän toistumiskielto
- sama yksittäisen päivän vaihtamisen käyttäjätoiminto

Teknologiapinon laajentaminen ei saa muuttaa käyttäjän kannalta näitä liiketoimintasääntöjä ilman uutta hyväksyntää.
