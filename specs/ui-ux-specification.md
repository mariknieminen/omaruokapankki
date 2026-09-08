# UI/UX Specification: Viikon päivällissuunnitelma

## Dokumentin tila

- **Tila:** Draft
- **Päivitetty:** 2026-09-08
- **Tavoite:** Selkeä, nopeasti omaksuttava MVP-käyttökokemus
- **Liittyvä ominaisuus:** [Viikon päivällissuunnitelman muodostaminen](features/weekly-dinner-planning.md)
- **Tuotevaatimukset:** [Product Requirements Document](product-requirements.md)

## 1. UX-tavoite

Käyttäjän tulee pystyä muodostamaan viikon päivällissuunnitelma muutamalla selkeällä valinnalla ja ymmärtämään tulos yhdellä silmäyksellä.

MVP:n käyttöliittymässä ei ole tarkoitus esitellä suurta reseptikirjastoa tai tarjota ravitsemus- ja ostoslistatoimintoja. Päätehtävä on:

1. valita pääproteiinilähde
2. valita, sallitaanko keitot
3. muodostaa viikon suunnitelma
4. tarkastella reseptiä
5. vaihtaa tarvittaessa yksi päivä

## 2. Käyttäjän pääpolku

### 2.1 Aloitusnäkymä

Aloitusnäkymä näyttää:

- viikon otsikon
- suunnitelman asetukset
- toiminnon viikon muodostamiseen
- mahdollisen nykyisen viikon suunnitelman

Jos suunnitelmaa ei ole vielä olemassa, käyttäjä näkee suoraan asetukset ja suunnitelman muodostamisen toiminnon.

### 2.2 Asetukset

Asetusosassa käyttäjä voi:

- valita yhden pääproteiinilähteen
- jättää proteiinilähteen valitsematta, jolloin näkyvä oletus on kana
- valita, sallitaanko keitot

Valintojen yhteydessä tulee näkyä niiden tämänhetkinen tila. Oletuskanan tulee olla käyttäjälle näkyvä eikä piilossa teknisen oletuksen takana.

### 2.3 Viikkosuunnitelma

Suunnitelma esitetään viikonpäivittäin tässä järjestyksessä:

1. maanantai
2. tiistai
3. keskiviikko
4. torstai
5. perjantai
6. lauantai
7. sunnuntai

Jokaisesta päivästä näkyvät vähintään:

- viikonpäivä
- reseptin nimi
- pääproteiinilähde
- aktiivinen työaika
- tieto keitosta, jos se on käyttäjälle merkityksellinen
- toiminto reseptin avaamiseen
- toiminto reseptin vaihtamiseen

### 2.4 Reseptin tarkastelu

Reseptin tarkastelussa näytetään:

- reseptin nimi
- pääproteiinilähde
- aktiivinen työaika
- ainesosat määrineen
- valmistusohje vaiheittain

Kuvia ja ravintoarvoja ei näytetä MVP:ssä.

### 2.5 Yksittäisen päivän vaihto

Vaihto aloitetaan kyseisen päivän yhteydessä. Käyttäjälle näytetään vain kyseiseen päivään sopivia vaihtoehtoja.

Vaihtoehdon yhteydessä näytetään vähintään:

- reseptin nimi
- pääproteiinilähde
- aktiivinen työaika
- tieto keitosta
- toiminto vaihtoehdon hyväksymiseen

Vaihdon tulee olla kohdistettu yksiselitteisesti yhteen viikonpäivään. Muut kuusi päivää eivät saa näyttää muuttuvan vaihdon seurauksena.

## 3. Näytön rakenne

### 3.1 MVP:n näkymät

MVP tarvitsee vain seuraavat näkymät tai näkymätilat:

- **Suunnitelman asetukset**
- **Viikon suunnitelma**
- **Reseptin tiedot**
- **Päivän reseptin vaihtaminen**
- **Riittämättömien vaihtoehtojen ilmoitus**

Erillistä käyttäjätili-, profiili-, ostoslista- tai hallintanäkymää ei tarvita.

### 3.2 Sivun prioriteettijärjestys

Sisällön tulee olla tässä tärkeysjärjestyksessä:

1. viikon suunnitelma ja sen viikonpäivät
2. valitut asetukset
3. reseptin nimi ja aktiivinen työaika
4. reseptin tarkastelu
5. reseptin vaihtaminen
6. toissijaiset ilmoitukset

## 4. Vuorovaikutusperiaatteet

- Yksi käyttäjän toiminto tekee yhden asian.
- Suunnitelman muodostamisen päätoiminto on näkyvä asetusten jälkeen.
- Käyttäjän tulee nähdä ennen muodostamista, mikä proteiinilähde ja keittoasetus ovat käytössä.
- Reseptin vaihto sijaitsee sen päivän yhteydessä, jota vaihto koskee.
- Vaihdon hyväksyminen on erillinen toiminto kuin vaihdon peruminen.
- Uutta suunnitelmaa ei luoda osittain.
- Virhetilanteessa käyttäjän valinnat säilyvät näkyvissä.
- Käyttäjän ei tarvitse ymmärtää 14 päivän historian sisäistä toteutusta.

## 5. Sisällön ja tekstin vaatimukset

- Kaikki käyttäjälle näkyvä sisältö on suomenkielistä.
- Painikkeissa käytetään toimintaa kuvaavia sanoja, kuten `Muodosta suunnitelma`, `Avaa resepti`, `Vaihda resepti`, `Hyväksy vaihto` ja `Peruuta`.
- Ajan esityksessä käytetään muotoa `X min`.
- Pääproteiinilähteen tulee olla näkyvissä muodossa, jonka käyttäjä tunnistaa ilman reseptin avaamista.
- Keittoasetus esitetään yksiselitteisesti sallittuna tai estettynä.
- Riittämättömyysviestin tulee ilmoittaa, ettei seitsemää ehtoja täyttävää reseptiä voitu muodostaa, eikä antaa käyttäjän olettaa suunnitelman olevan valmis.

## 6. Tilat

### Tyhjä tila

Näytetään, kun viikkosuunnitelmaa ei ole vielä muodostettu. Käyttäjä näkee asetukset ja toiminnon suunnitelman muodostamiseen.

### Lataustila

Näytetään vain, jos suunnitelman muodostaminen tai reseptin vaihtaminen ei valmistu välittömästi. Lataustilan tulee estää saman toiminnon toistuva lähettäminen.

### Valmis tila

Näytetään täsmälleen seitsemän viikonpäivää ja yksi resepti jokaista päivää kohden.

### Riittämätön reseptikirjasto

Näytetään, kun käyttäjän asetusten, aktiivisen työajan ja 14 päivän historian jälkeen käytettävissä on alle seitsemän reseptiä. Käyttöliittymä ei saa näyttää vajavaista viikkosuunnitelmaa valmiina suunnitelmana.

### Vaihdon tila

Näytetään valitun viikonpäivän vaihtoehdot. Alkuperäinen viikkosuunnitelma säilyy, kunnes käyttäjä hyväksyy uuden reseptin.

### Säilytetty tila

Kun käyttäjä palaa sovellukseen, viimeisin tallennettu viikkosuunnitelma tulee näkyä, jos selaimen paikalliset tiedot ovat edelleen saatavilla.

## 7. Responsiivisuus ja saavutettavuus

- Suunnitelman tulee olla käytettävissä sekä puhelimella että työpöytäkokoisella näytöllä.
- Viikonpäivien tulee pysyä yksiselitteisinä myös kapealla näytöllä.
- Interaktiivisten toimintojen tulee olla käytettävissä näppäimistöllä.
- Valintojen tilan tulee välittyä muutenkin kuin värillä.
- Tekstin ja taustan kontrastin tulee olla luettavalla tasolla.
- Reseptin valmistusohjeen tekstin tulee säilyä luettavana ilman vaakasuuntaista vieritystä.
- Painikkeiden nimien tulee kuvata toimintoa ilman, että käyttäjän täytyy päätellä sitä ikonista.
- Virhe- ja tilaviestit tulee esittää tekstinä.

## 8. MVP:n ulkopuoliset UI/UX-toiminnot

- kuvalliset reseptikortit
- ostoslista
- ravintoarvot
- annosmäärien muokkaus
- budjetti- ja hintanäkymä
- käyttäjäprofiili
- reseptien suosikit
- monen viikon kalenterinäkymä
- reseptien jakaminen
- edistyneet suodattimet

## 9. UI/UX-hyväksymiskriteerit

- **UX1:** Käyttäjä näkee yhdellä näkymällä proteiinivalinnan, keittoasetuksen ja viikon muodostamisen toiminnon.
- **UX2:** Viikkosuunnitelmassa näkyvät täsmälleen viikonpäivät maanantaista sunnuntaihin tässä järjestyksessä.
- **UX3:** Jokaisen viikonpäivän yhteydessä näkyvät reseptin nimi, pääproteiinilähde ja aktiivinen työaika.
- **UX4:** Käyttäjä voi avata minkä tahansa viikonpäivän reseptin ja nähdä nimen, ainesosat määrineen ja valmistusohjeen.
- **UX5:** Käyttäjä voi käynnistää reseptin vaihdon yksittäisen viikonpäivän yhteydestä.
- **UX6:** Reseptin vaihdon näkymässä kaikki vaihtoehdot noudattavat valittua proteiinia, keittoasetusta, 45 minuutin aktiivisen työajan rajaa ja 14 päivän sääntöä.
- **UX7:** Käyttäjän hyväksyessä vaihdon vain kohdepäivän resepti muuttuu näkyvässä suunnitelmassa.
- **UX8:** Riittämättömässä reseptitilanteessa näkyy tekstimuotoinen ilmoitus eikä vajaata suunnitelmaa merkitä valmiiksi.
- **UX9:** Käyttäjä voi käyttää kaikki MVP:n toiminnot näppäimistöllä.
- **UX10:** Käyttöliittymä toimii ilman kuvia ja ravintoarvosisältöä.

## 10. Avoimet UI/UX-päätökset

- Näytetäänkö reseptin vaihdossa yksi suositus vai useita vaihtoehtoja?
- Avataanko resepti sivulle, paneeliin vai muuhun erilliseen tilaan?
- Näytetäänkö viikon suunnitelma pystysuuntaisena listana kaikilla näytöillä vai muuttuuko asettelu leveällä näytöllä?
- Tarvitaanko käyttäjälle toiminto paikallisten tietojen tyhjentämiseen?
