# Feature: Viikon päivällissuunnitelman muodostaminen

## Overview

- **Status:** Draft
- **Created:** 2026-09-08
- **Last Updated:** 2026-09-08
- **Affected Subsystems:** Ei vielä määritelty; projekti on uusi.
- **Source documents:** [Product Requirements Document](../product-requirements.md)

### Problem Statement

Käyttäjä tarvitsee henkilökohtaiseen käyttöön työkalun, joka muodostaa maanantaista sunnuntaihin kestävän seitsemän päivän päivällissuunnitelman. Suunnitelman tulee huomioida käyttäjän valitsema pääproteiinilähde, keittojen salliminen, enintään 45 minuutin aktiivinen työaika ja reseptien 14 päivän toistumiskielto.

Aiemman tutkimusvaiheen perusteella yksinkertaisin hallittava lähestymistapa on ennalta tarkistettu suomenkielinen reseptikirjasto. Reseptien luokittelu, aktiivinen työaika, keittostatus ja pääproteiinilähde on pystyttävä varmistamaan ennen reseptin tarjoamista käyttäjälle. Ulkoisten resepti- tai ravintopalvelujen käyttöön liittyvät sisältöoikeudet, kieli ja tiedon laatu ovat keskeisiä riskejä.

### Proposed Change

Tuotteeseen määritellään viikon suunnittelutoiminto, joka:

1. vastaanottaa käyttäjän yhden pääproteiinilähteen valinnan tai käyttää oletuksena kanaa
2. vastaanottaa tiedon siitä, sallitaanko keitot
3. suodattaa reseptit käyttäjän valintojen, pääproteiinin ja enintään 45 minuutin aktiivisen työajan perusteella
4. poistaa reseptit, joita käyttäjä on käyttänyt viimeisten 14 päivän aikana
5. muodostaa seitsemän reseptin suunnitelman viikonpäiville maanantaista sunnuntaihin
6. merkitsee suunnitelmassa käytetyt reseptit käytetyiksi suunnitelman luonnin yhteydessä
7. suosii mahdollisuuksien mukaan reseptiä, jonka edellisestä käytöstä on kulunut eniten aikaa
8. mahdollistaa yksittäisen päivän reseptin vaihtamisen samoja sääntöjä noudattaen
9. näyttää valitun reseptin ainesosat ja valmistusohjeen
10. ilmoittaa käyttäjälle, jos seitsemää sääntöjen mukaista reseptiä ei voida muodostaa.

### Scope

#### Included

- Viikon suunnitelma maanantaista sunnuntaihin.
- Yksi resepti jokaiselle viikonpäivälle.
- Yhden pääproteiinilähteen valinta.
- Kanan käyttö oletuksena, jos valintaa ei tehdä.
- Keittojen salliminen tai estäminen käyttäjän valinnan mukaan.
- Enintään 45 minuutin aktiivisen työajan rajoitus.
- Käyttäjäkohtainen 14 päivän reseptihistoria.
- Reseptin merkitseminen käytetyksi suunnitelman luonnin tai yksittäisen vaihdon yhteydessä.
- Vanhemman reseptin suosiminen muiden ehtojen täyttyessä.
- Yksittäisen päivän reseptin vaihtaminen.
- Suomenkielisen reseptin ainesosien ja valmistusohjeen tarkastelu.
- Selkeä ilmoitus riittämättömistä reseptivaihtoehdoista.

#### Explicitly excluded

- Kuvat.
- Ravintoarvot.
- Allergia- ja erityisruokavaliosuodattimet.
- Ostoslista.
- Annosmäärien hallinta.
- Budjetin tai hinnan seuranta.
- Käyttäjän viikon aloituspäivän valinta.
- Julkinen jakaminen tai monen käyttäjän hallinta.
- Automaattinen ravitsemusneuvonta.
- Teknologiavalinnat, API-määrittelyt ja lopullinen käyttöliittymäsuunnitelma.

## Requirements

### Functional Requirements

- **FR-1:** Suunnittelun tulee muodostaa täsmälleen seitsemän päivällistä, yksi kullekin viikonpäivälle maanantaista sunnuntaihin.
- **FR-2:** Käyttäjän tulee voida valita täsmälleen yksi pääproteiinilähde suunnitelmaa varten.
- **FR-3:** Jos käyttäjä ei valitse pääproteiinilähdettä, järjestelmän tulee käyttää kanaa.
- **FR-4:** Jokaisella valittavalla reseptillä tulee olla yksi pääasiallinen proteiininlähde.
- **FR-5:** Pääproteiinilähteen tulee olla yleisesti saatavilla Suomen ruokakaupoissa.
- **FR-6:** Käyttäjän tulee voida sallia tai estää keitot.
- **FR-7:** Suunnitelmaan saa valita vain reseptejä, joiden aktiivinen työaika on enintään 45 minuuttia.
- **FR-8:** Sama resepti ei saa esiintyä käyttäjän suunnitelmissa 14 päivän aikana.
- **FR-9:** Resepti tulee kirjata käytetyksi heti suunnitelman luonnin yhteydessä.
- **FR-10:** Suunnittelun tulee voida suosia reseptiä, jonka edellisestä käytöstä on kulunut pisin aika, jos se täyttää kaikki muut ehdot.
- **FR-11:** Käyttäjän tulee voida vaihtaa yksittäisen viikonpäivän reseptiä vaihtamatta muita viikonpäiviä.
- **FR-12:** Vaihdettu resepti tulee kirjata käytetyksi heti hyväksymisen yhteydessä.
- **FR-13:** Vaihdettu resepti tulee valita samoilla proteiini-, keitto-, työaika- ja 14 päivän historian ehdoilla kuin alkuperäinen resepti.
- **FR-14:** Käyttäjän tulee voida tarkastella valitun reseptin suomenkielisiä ainesosia, määriä ja valmistusohjetta.
- **FR-15:** Jos seitsemää sääntöjen mukaista reseptiä ei ole saatavilla, järjestelmän tulee ilmoittaa tästä muodostamatta sääntöjä rikkovaa suunnitelmaa.

### Non-Functional Requirements

- **Performance:** Suunnitelman muodostamisen ja yksittäisen reseptin vaihtamisen tavoiteaikaa ei ole vielä päätetty. Toiminnon tulee kuitenkin palauttaa joko suunnitelma tai riittämättömyysilmoitus ilman käyttäjän odottamaa taustaprosessia, ellei toteutuksen aikana perustellusti päätetä muuta.
- **Security:** Koska tuote on henkilökohtaiseen käyttöön, käyttäjän 14 päivän historia ei saa olla muiden käyttäjien nähtävissä. Tietosuoja- ja kirjautumisratkaisu ovat vielä avoimia.
- **Scalability:** Ensimmäisen vaiheen ei tarvitse tukea useita käyttäjiä tai suurta liikennemäärää. Reseptikirjaston ja yhden käyttäjän 14 päivän historian on kuitenkin riitettävä suunnitelman muodostamiseen.
- **Accessibility:** Viikonpäivät, valinnat, reseptien vaihtaminen, reseptin sisältö ja virhetilanteet tulee pystyä ymmärtämään ja käyttämään selkeästi. Tarkat saavutettavuuskriteerit päätetään toteutussuunnittelussa.
- **Content quality:** Kaikki tarjottavat reseptit ovat suomenkielisiä, niiden aktiivinen työaika on tiedossa, niillä on yksi luokiteltu pääproteiini ja pääproteiinin yleinen saatavuus Suomen ruokakaupoissa on tarkistettu.

## API Contract

API-rajapintoja ei määritellä tässä vaiheessa. Projektille ei ole valittu teknologiaa, palvelurakennetta tai rajapintamallia.

Toteutussuunnittelussa on kuitenkin säilytettävä seuraavat käyttäjän toiminnan sopimukset:

- Suunnitelman muodostaminen vastaanottaa yhden pääproteiinilähteen tai puuttuvan valinnan sekä keittoasetuksen.
- Onnistunut muodostaminen palauttaa seitsemän viikonpäivään yhdistettyä reseptiä.
- Epäonnistunut muodostaminen kertoo, ettei ehtoja täyttävää seitsemän reseptin suunnitelmaa voitu muodostaa.
- Yksittäisen päivän vaihto kohdistuu vain valittuun viikonpäivään.
- Hyväksytty suunnitelma tai reseptin vaihto kirjaa reseptin käytetyksi.

## Data Model

Tietomallia ei määritellä tässä vaiheessa. Alla on vain toiminnallinen tietosisältö, joka on välttämätön vaatimusten toteuttamiseksi.

### Required information

- Reseptin yksilöllinen tunniste.
- Reseptin nimi.
- Suomenkielinen ainesosalista määrineen.
- Suomenkielinen valmistusohje.
- Aktiivinen työaika minuutteina.
- Tieto siitä, onko resepti keitto.
- Reseptin yksi pääproteiinilähde.
- Tieto pääproteiinilähteen yleisestä saatavuudesta Suomen ruokakaupoissa.
- Käyttäjän suunnitelmissa käytettyjen reseptien päivämäärät vähintään 14 päivän sääntöä varten.
- Viikonpäiväkohtainen reseptivalinta.

### Relationships and history rules

- Yksi viikkosuunnitelma sisältää seitsemän viikonpäiväkohtaista reseptivalintaa.
- Yksi resepti voi esiintyä käyttäjän historiassa useita kertoja, mutta ei ennen kuin edellisestä käytöstä on kulunut vähintään 14 päivää tämän ominaisuuden määritelmän mukaisesti.
- Suunnitelman luonnissa ja hyväksytyssä reseptin vaihdossa syntyy uusi käyttöhistoriatapahtuma.

## Component Structure

Toteutustiedostoja ei määritellä ennen teknologia- ja arkkitehtuuripäätöksiä.

### Files to Create

| File Path | Purpose | Dependencies |
|-----------|---------|--------------|
| Päätetään toteutussuunnittelussa | Viikon suunnittelutoiminto | Päätetään myöhemmin |

### Files to Modify

| File Path | Changes | Reason |
|-----------|---------|--------|
| Ei vielä määritelty | Ei vielä määritelty | Projekti on uusi |

### Folder Structure

Toteutuksen kansiorakennetta ei määritellä tässä spesifikaatiossa.

## Dependencies

### External Libraries

Ei määritelty. Teknologiavalintaa ei ole tehty.

### API Keys / Environment Variables

Ei määritelty. Ulkoisten resepti- tai ravintopalvelujen käyttöä ei ole päätetty.

### Content and data dependencies

- Suomenkielinen reseptikirjasto.
- Reseptien käyttöoikeudet tai muu laillinen oikeus näyttää reseptitekstit tuotteessa.
- Yhdenmukainen pääproteiinilähteen luokittelu.
- Luotettava aktiivisen työajan tieto.
- Käyttäjän vähintään 14 päivän suunnitelma- ja vaihtohistoria.

Tutkimusvaiheen löydösten perusteella ulkoiset reseptipalvelut voivat helpottaa kokeilua, mutta niiden sisältöoikeudet, välimuisti- ja näyttörajoitukset, kieli sekä käyttörajat on tarkistettava ennen valintaa. USDA FoodData Central soveltuu ravintotietoon, jota tämä ominaisuus ei tarvitse, ja Open Food Facts soveltuu ensisijaisesti tuotetietoon eikä ratkaise reseptikirjastoa.

## Testing Strategy

### Test Coverage Goals

- **Target Coverage:** Vähintään 80 % sovelluksen tämän ominaisuuden liiketoimintalogiikasta, kun toteutus on olemassa.
- **Critical Paths:** 100 % kattavuus suunnitelman muodostamisen ehdoille, 14 päivän toistumiskiellolle, oletuskanalle, reseptin vaihdolle ja riittämättömien vaihtoehtojen käsittelylle.
- **Excluded:** Kuvien, ravintoarvojen, ostoslistojen ja muiden tämän spesifikaation ulkopuolisten toimintojen testausta ei tehdä.

### Unit Tests (REQUIRED)

| Function/Component | Test Case | Given | When | Then | Mocks |
|---|---|---|---|---|---|
| Suunnitelman muodostamisen sääntö | Muodostaa seitsemän päivän listan | Kirjastossa on vähintään seitsemän ehtoja täyttävää reseptiä | Suunnitelma muodostetaan | Tuloksena on täsmälleen seitsemän reseptiä, jotka on yhdistetty maanantaista sunnuntaihin | Reseptikirjasto ja käyttäjän historia |
| Suunnitelman muodostamisen sääntö | Käyttää oletusproteiinia | Käyttäjä ei anna proteiinivalintaa | Suunnitelma muodostetaan | Jokaisen valitun reseptin pääproteiinilähde on kana | Reseptikirjasto |
| Suunnitelman muodostamisen sääntö | Käyttää valittua proteiinia | Käyttäjä valitsee yhden proteiinilähteen | Suunnitelma muodostetaan | Jokaisen valitun reseptin pääproteiinilähde vastaa käyttäjän valintaa | Reseptikirjasto |
| Keittosuodatus | Keitot sallitaan | Keittoasetus on sallittu ja kirjastossa on sopivia keittoja | Suunnitelma muodostetaan | Keittoreseptit voivat esiintyä tuloksessa | Reseptikirjasto |
| Keittosuodatus | Keitot estetään | Keittoasetus on estetty ja kirjastossa on keittoja sekä muita sopivia reseptejä | Suunnitelma muodostetaan | Yksikään tuloksen seitsemästä reseptistä ei ole keitto | Reseptikirjasto |
| Työaikasuodatus | Raja-arvo hyväksytään | Reseptin aktiivinen työaika on 45 minuuttia | Suunnitelma muodostetaan | Resepti voi tulla valituksi | Reseptikirjasto |
| Työaikasuodatus | Raja-arvon ylitys hylätään | Reseptin aktiivinen työaika on 46 minuuttia | Suunnitelma muodostetaan | Reseptiä ei valita | Reseptikirjasto |
| 14 päivän historia | Tuore resepti estetään | Resepti on käytetty alle 14 päivää sitten | Suunnitelma muodostetaan tai reseptiä vaihdetaan | Reseptiä ei palauteta ehdokkaaksi | Käyttäjän käyttöhistoria |
| 14 päivän historia | Vanhin sallittu resepti suositaan | Useita sopivia reseptejä on saatavilla ja yksi on ollut pisimpään käyttämättä | Suunnitelma muodostetaan | Vanhimman käytön resepti on valintajärjestyksessä etusijalla | Käyttäjän käyttöhistoria |
| Käyttöhistoria | Luonti kirjaa käytön | Suunnitelma muodostetaan onnistuneesti | Suunnitelma hyväksytään tai luodaan | Kaikkien seitsemän valitun reseptin käyttö kirjataan saman luonnin yhteydessä | Käyttöhistorian tallennus |
| Yksittäisen päivän vaihto | Vaihtaa vain kohdepäivän | Viikon suunnitelma on olemassa ja kohdepäivälle on vähintään yksi kelvollinen vaihtoehto | Käyttäjä hyväksyy vaihtoreseptin | Kohdepäivän resepti vaihtuu, muiden kuuden päivän reseptit eivät vaihdu | Suunnitelma ja reseptikirjasto |
| Yksittäisen päivän vaihto | Vaihto kirjaa käytön | Vaihdettava resepti täyttää kaikki ehdot | Käyttäjä hyväksyy vaihdon | Vaihdettu resepti kirjataan käytetyksi välittömästi | Käyttöhistorian tallennus |
| Riittämättömät vaihtoehdot | Alle seitsemän reseptiä | Ehtoja täyttäviä ja 14 päivän historian ulkopuolisia reseptejä on kuusi | Käyttäjä muodostaa suunnitelman | Suunnitelmaa ei muodosteta seitsemän reseptin vajavaisena ja käyttäjälle palautetaan puutetieto | Reseptikirjasto ja käyttäjän historia |
| Reseptisisältö | Näyttää reseptin tiedot | Valitulla reseptillä on suomenkielinen sisältö | Käyttäjä avaa reseptin | Nimi, ainesosat määrineen ja valmistusohje ovat saatavilla suomeksi | Reseptikirjasto |

### Integration Tests (REQUIRED)

| Scenario | Input | Expected Result | Side Effects |
|---|---|---|---|
| Suunnitelman muodostaminen oletusasetuksilla | Proteiinivalinta puuttuu, keitot sallitaan | Seitsemän kanapohjaista reseptiä maanantaista sunnuntaihin | Seitsemän reseptiä kirjataan käytetyiksi luonnin yhteydessä |
| Suunnitelman muodostaminen valitulla proteiinilla | Valittu proteiinilähde ja keitot estetty | Seitsemän valitun proteiinin reseptiä, joista yksikään ei ole keitto | Valitut reseptit kirjataan käytetyiksi |
| Toistumiskiellon yhteistoiminta | Kirjastossa on tuoreita ja sallittuja vanhempia reseptejä | Tuoreet reseptit puuttuvat tuloksesta ja vanhempi kelvollinen resepti voidaan valita | Vain tulokseen valitut reseptit kirjataan |
| Yksittäisen päivän vaihto | Olemassa oleva viikon suunnitelma ja uusi kelvollinen resepti | Vain valittu viikonpäivä muuttuu | Uusi resepti kirjataan käytetyksi; muiden päivien historia pysyy muuttumattomana |
| Riittämätön kirjasto | Ehtoja täyttäviä reseptejä on alle seitsemän | Suunnitelmaa ei tallenneta vajavaisena | Uusia käyttöhistoriatapahtumia ei synny epäonnistuneesta luonnista |
| Reseptin tarkastelu | Viikonpäivälle valittu resepti | Reseptin suomenkielinen sisältö avautuu | Suunnitelman reseptivalinta ei muutu |

### E2E Tests (REQUIRED)

| User Journey | Steps | Expected Outcome |
|---|---|---|
| Viikon suunnitelman luonti | 1. Käyttäjä avaa suunnittelun. 2. Valitsee proteiiniksi kalan. 3. Estää keitot. 4. Muodostaa suunnitelman. | Näytölle tulee seitsemän viikonpäivää maanantaista sunnuntaihin, jokaisella yksi kalaresepti, aktiivinen työaika enintään 45 minuuttia ja ei yhtään keittoa. |
| Oletusproteiinin käyttö | 1. Käyttäjä jättää proteiinivalinnan tekemättä. 2. Muodostaa suunnitelman. | Kaikkien seitsemän reseptin pääproteiinilähde on kana. |
| Reseptin tarkastelu ja vaihto | 1. Käyttäjä avaa yhden viikonpäivän reseptin. 2. Tarkastelee ainesosia ja valmistusohjetta. 3. Vaihtaa reseptin. | Vain valitun viikonpäivän resepti vaihtuu; uusi resepti täyttää samat ehdot ja näkyy reseptin sisältöineen. |
| Riittämätön vaihtoehtomäärä | 1. Käyttäjän valitseman proteiinin ja keittoasetuksen ehdot täyttäviä käyttämättömiä reseptejä on kuusi. 2. Käyttäjä yrittää muodostaa suunnitelman. | Tuotetta ei muodosteta vajaana, eikä käyttäjän historiaan lisätä reseptejä epäonnistuneesta luonnista. |
| 14 päivän toistumiskielto | 1. Käyttäjällä on viimeisen 14 päivän aikana käytetty resepti. 2. Käyttäjä muodostaa uuden suunnitelman samoilla asetuksilla. | Aiemmin käytetty resepti ei esiinny uudessa suunnitelmassa. |

### Test Data & Fixtures

- **Reseptikirjasto:** Suomenkielinen testi-inventaario, jossa on kana-, kala-, naudanliha-, kasviproteiini- ja keittoreseptejä.
- **Työaikarajat:** Reseptit, joiden aktiivinen työaika on 44, 45 ja 46 minuuttia.
- **Historia:** Reseptit, joita on käytetty 13, 14 ja 15 päivää sitten.
- **Määrärajat:** Testiaineistot, joissa kelvollisia reseptejä on 0, 6, 7 ja vähintään 8.
- **Viikonpäivät:** Maanantai, tiistai, keskiviikko, torstai, perjantai, lauantai ja sunnuntai.
- **Käyttöhistoria:** Tyhjä historia, historia yhdelle reseptille ja historia useille resepteille.

### Performance Tests

Suorituskyvyn tarkkaa tavoitearvoa ei ole päätetty. Ennen toteutusta on päätettävä hyväksyttävä enimmäisaika:

- viikon suunnitelman muodostamiselle
- yhden päivän reseptin vaihtamiselle
- reseptin tietojen avaamiselle.

### Security Tests

- Varmistetaan, että henkilökohtaisen käyttäjän käyttöhistoria ei näy toiselle käyttäjälle, jos käyttäjähallinta otetaan käyttöön.
- Varmistetaan, että reseptin sisältö käsitellään turvallisesti eikä käyttäjän syöte voi muuttaa näytettävää sisältöä odottamattomasti.
- Varmistetaan, ettei epäonnistunut suunnitelman luonti lisää virheellisiä käyttöhistoriatapahtumia.

## Acceptance Criteria

### AC1: Seitsemän päivän suunnitelma

**Given** reseptikirjastossa on vähintään seitsemän käyttäjän asetukset täyttävää reseptiä
**When** käyttäjä muodostaa viikon suunnitelman
**Then** järjestelmä palauttaa täsmälleen seitsemän reseptiä, jotka on liitetty järjestyksessä maanantaille, tiistaille, keskiviikolle, torstaille, perjantaille, lauantaille ja sunnuntaille.

### AC2: Valittu pääproteiinilähde

**Given** käyttäjä valitsee pääproteiinilähteeksi kalan
**When** käyttäjä muodostaa suunnitelman
**Then** jokaisen seitsemän valitun reseptin pääasiallinen proteiinilähde on kala.

### AC3: Kanan oletus

**Given** käyttäjä ei valitse pääproteiinilähdettä
**When** käyttäjä muodostaa suunnitelman
**Then** jokaisen valitun reseptin pääasiallinen proteiinilähde on kana.

### AC4: Keittojen salliminen

**Given** käyttäjä sallii keitot ja reseptikirjastossa on vähintään seitsemän muuta ehtoa täyttävää reseptiä, joista osa on keittoja
**When** käyttäjä muodostaa suunnitelman
**Then** suunnitelmassa voi olla keittoreseptejä eikä järjestelmä hylkää keittoja niiden keittostatuksen perusteella.

### AC5: Keittojen estäminen

**Given** käyttäjä estää keitot ja reseptikirjastossa on vähintään seitsemän muuta ehtoa täyttävää reseptiä
**When** käyttäjä muodostaa suunnitelman
**Then** suunnitelman seitsemästä reseptistä yksikään ei ole keitto.

### AC6: Aktiivisen työajan yläraja

**Given** reseptin aktiivinen työaika on 45 minuuttia
**When** järjestelmä arvioi reseptiä suunnitelmaan
**Then** resepti voidaan valita.

### AC7: Aktiivisen työajan ylitys

**Given** reseptin aktiivinen työaika on 46 minuuttia
**When** järjestelmä arvioi reseptiä suunnitelmaan
**Then** reseptiä ei valita.

### AC8: Yksi pääproteiinilähde

**Given** resepti on ehdolla suunnitelmaan
**When** järjestelmä tarkistaa reseptin luokituksen
**Then** reseptillä on täsmälleen yksi pääasiallinen proteiinilähde, joka vastaa käyttäjän valintaa tai kanan oletusta.

### AC9: Neljäntoista päivän toistumiskielto

**Given** resepti on merkitty käyttäjän käytetyksi 13 päivää sitten
**When** järjestelmä muodostaa uuden suunnitelman tai ehdottaa korvaavaa reseptiä
**Then** reseptiä ei saa valita uuteen suunnitelmaan eikä vaihtoreseptiksi.

### AC10: Reseptin vapautuminen historian jälkeen

**Given** resepti on merkitty käyttäjän käytetyksi 15 päivää sitten ja se täyttää kaikki muut ehdot
**When** järjestelmä muodostaa uuden suunnitelman
**Then** resepti voi olla valittavissa.

### AC11: Käytön kirjaaminen luonnin yhteydessä

**Given** viikon suunnitelma on muodostettu onnistuneesti seitsemästä reseptistä
**When** suunnitelma luodaan käyttäjälle
**Then** jokaisen seitsemän reseptin käyttö kirjataan välittömästi käyttäjän 14 päivän historiaan.

### AC12: Vanhemman reseptin suosiminen

**Given** kaksi reseptiä täyttää kaikki käyttäjän ehdot, toinen on ollut käyttämättä 30 päivää ja toinen 15 päivää
**When** järjestelmä asettaa reseptit valintajärjestykseen
**Then** 30 päivää käyttämättä ollut resepti sijoittuu ennen 15 päivää käyttämättä ollutta reseptiä.

### AC13: Yksittäisen päivän vaihtaminen

**Given** maanantaista sunnuntaihin sisältävä suunnitelma on olemassa ja keskiviikolle on saatavilla kelvollinen vaihtoresepti
**When** käyttäjä hyväksyy keskiviikon reseptin vaihdon
**Then** keskiviikon resepti vaihtuu uuteen reseptiin ja maanantain, tiistain, torstain, perjantain, lauantain ja sunnuntain reseptit pysyvät samoina.

### AC14: Vaihdon ehtojen säilyminen

**Given** käyttäjä vaihtaa yhden päivän reseptiä
**When** järjestelmä näyttää vaihtoehdokkaat
**Then** jokainen ehdokas vastaa valittua pääproteiinia, noudattaa keittoasetusta, sisältää enintään 45 minuutin aktiivisen työajan ja ei ole käyttäjän viimeisen 14 päivän historiassa.

### AC15: Vaihdon kirjaaminen historiaan

**Given** käyttäjä hyväksyy vaihtoreseptin, joka ei ole viimeisen 14 päivän historiassa
**When** vaihto vahvistetaan
**Then** vaihtoresepti kirjataan käyttäjän käyttöhistoriaan välittömästi.

### AC16: Reseptin sisältö

**Given** käyttäjä valitsee yhden viikonpäivän reseptin tarkasteltavaksi
**When** reseptin tiedot avataan
**Then** käyttäjälle näytetään reseptin suomenkielinen nimi, ainesosat määrineen ja valmistusohje.

### AC17: Riittämättömät reseptit

**Given** käyttäjän ehdot täyttäviä ja viimeisen 14 päivän ulkopuolella olevia reseptejä on kuusi
**When** käyttäjä pyytää viikon suunnitelmaa
**Then** järjestelmä ei luo seitsemän päivän suunnitelmaa eikä kirjaa uusia reseptejä käyttöhistoriaan.

### AC18: Suomenkielinen sisältö ja saatava pääproteiini

**Given** resepti on julkaistavissa suunnittelun reseptikirjastossa
**When** reseptin sisältö tarkistetaan
**Then** resepti on suomenkielinen ja sen pääasiallista proteiinilähdettä on yleisesti saatavilla Suomen ruokakaupoista.

### Testing Criteria

- [ ] Kaikille toteutuksen julkisille toiminnoille on kirjoitettu yksikkötestit.
- [ ] Yksikkötestit kattavat onnistumisen, raja-arvot, tyhjät tulokset ja virhetilanteet.
- [ ] Integraatiotestit kattavat suunnitelman muodostamisen, historian kirjaamisen, reseptin vaihdon ja riittämättömän reseptikirjaston.
- [ ] E2E-testit kattavat pääkäyttökulun ja puutetilanteen.
- [ ] Testit varmistavat, että epäonnistunut suunnitelman luonti ei muuta käyttöhistoriaa.
- [ ] Testikattavuus saavuttaa vähintään 80 % liiketoimintalogiikasta.
- [ ] Kriittiset säännöt saavuttavat 100 % kattavuuden.

### Quality Criteria

- [ ] Koodikatselmus on tehty.
- [ ] Lint- ja staattisen analyysin virheitä ei ole.
- [ ] Käyttäjälle näkyvä dokumentaatio on päivitetty tarvittavilta osin.
- [ ] Sovittu suorituskyvyn tavoite on täytetty.
- [ ] Käyttäjän historiatietojen eristys ja reseptisisällön turvallinen käsittely on validoitu.

### Deployment Criteria

- [ ] Toteutuksen riippuvuudet on dokumentoitu.
- [ ] Tarvittavat ympäristömuuttujat on dokumentoitu.
- [ ] Mahdolliset tietomuutokset on testattu.
- [ ] Peruutus- tai palautussuunnitelma on määritelty ennen käyttöönottoa.

## Risk Assessment

- **What could break:** Reseptien riittävyys voi loppua valitun proteiinin, keittoasetuksen ja 14 päivän historian yhdistelmän vuoksi. Pääproteiiniluokittelu voi olla epäyhtenäinen. Ulkoisen reseptiaineiston käyttöoikeudet voivat estää sisällön näyttämisen tai tallentamisen.
- **Rollback plan:** Ominaisuus voidaan poistaa käytöstä ilman, että käyttäjän olemassa olevaa reseptihistoriaa käytetään uusiin suunnitelmiin. Tarkka palautusmenettely riippuu valittavasta toteutuksesta ja määritellään ennen käyttöönottoa.
- **Dependencies:** Riittävä suomenkielinen reseptikirjasto, käyttöoikeudet reseptisisältöön, reseptien pääproteiinien luokittelu ja johdonmukainen 14 päivän historiatieto.
- **Open decisions:** Puutetilanteen käyttäjäviesti, vaihtoehdokkaiden määrä, useiden vaihtojen salliminen ja historian säilytysajan ylittävä toiminta ovat vielä päättämättä.

## Spec Readiness Checklist

Tarkistus perustuu projektin spesifikaation valmiuskriteereihin.

- [x] Jokainen hyväksymiskriteeri on Given/When/Then-muodossa.
- [x] Jokainen hyväksymiskriteeri sisältää täsmällisen odotetun arvon tai tuloksen.
- [x] Muutettavat tai luotavat tiedostot on listattu; tässä vaiheessa toteutustiedostot on merkitty avoimiksi, koska projekti on uusi.
- [x] Riskinarvio tunnistaa keskeiset rikkoutumisriskit.
- [x] Palautus- tai peruutussuunnitelman periaate on kirjattu; toteutuskohtainen menettely on avoin.
- [x] Riippuvuudet ja sisältöriippuvuudet on kirjattu.
- [x] Yksikkötestistrategia sisältää onnistumis-, raja-arvo-, tyhjä- ja virhetilanteet.
- [x] Integraatiotestistrategia kattaa ominaisuuden keskeiset rajat ja sivuvaikutukset.
- [x] E2E-strategia sisältää pääkäyttökulun ja puutetilanteen.
- [x] Jokaiselle toiminnalliselle vaatimukselle on vähintään yksi hyväksymiskriteeri tai testitapaus.
- [x] Käyttökulun tärkeimmät vaiheet on katettu E2E-testauksessa.
- [x] Virhe- ja reunatapaukset on kuvattu.
- [x] Testikattavuustavoite on määritelty: vähintään 80 % liiketoimintalogiikasta ja kriittisille säännöille 100 %.
- [x] Testidata ja fixture-tarpeet on määritelty.
- [x] PRD:n ja tutkimusvaiheen löydösten lähteet on kirjattu.
- [ ] API-, data- ja komponenttirakenteen toteutusyksityiskohdat on hyväksytty; näitä ei ole vielä päätetty, eikä niitä ratkaista tässä vaiheessa.
- [ ] Avoimet päätökset on ratkaistu ennen toteutuksen aloittamista.

**Valmiusarvio:** Spesifikaatio on valmis tarkistettavaksi ja avoimien liiketoimintapäätösten käsittelyyn. Se ei ole vielä valmis toteutuksen aloittamiseen, koska kaksi viimeistä kohtaa ovat avoinna.

## Related Documentation

- **Product requirements:** [../product-requirements.md](../product-requirements.md)
- **Research pass findings:** Tämän ominaisuuden tutkimusvaiheen keskeiset löydökset on koottu PRD:n osioihin 11 ja 13.
- **Tier 1:** Ei vielä saatavilla; projekti on uusi eikä arkkitehtuuridokumenttia ole laadittu.
- **Tier 2:** Ei vielä saatavilla; vaikuttavaa alijärjestelmää ei ole määritelty.
- **Tier 3:** Ei vielä saatavilla; toteutusmoduuleja ei ole määritelty.
- **Template reference:** [../../specs/TEMPLATE.md](../TEMPLATE.md)
