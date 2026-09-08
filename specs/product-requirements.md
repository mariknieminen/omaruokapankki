# Product Requirements Document: Viikon päivällissuunnitelma

## 1. Dokumentin tila

- **Tila:** Luonnos
- **Päivitetty:** 2026-09-08
- **Käyttötarkoitus:** Henkilökohtainen käyttö
- **Dokumentin rajaus:** Tuotteen tarpeet ja käyttäjän näkyvä toiminta

Tämä dokumentti kuvaa, mitä tuotteen tulee tehdä ja millä ehdoilla. Se ei määrittele teknologiaa, tietomallia, rajapintoja tai käyttöliittymän lopullista toteutusta.

## 2. Tuotteen tavoite

Tuote auttaa käyttäjää muodostamaan helposti toteutettavan viikon päivällissuunnitelman. Suunnitelma sisältää seitsemän päivää maanantaista sunnuntaihin, ja jokaiselle päivälle valitaan suomenkielinen resepti.

Tuotteen keskeinen hyöty on vähentää päivällisten suunnitteluun kuluvaa aikaa ja tarjota käyttäjälle vaihtelua ilman, että sama resepti toistuu liian nopeasti.

## 3. Kohdekäyttäjä

Tuote on tarkoitettu yhdelle henkilökohtaiselle käyttäjälle, joka haluaa suunnitella viikon päivälliset nopeasti ja saada jokaiselle päivälle reseptin.

Käyttäjä:

- haluaa valmistaa ruoan enintään 45 minuutin aktiivisella työajalla
- haluaa valita päivällisten pääasiallisen proteiininlähteen
- haluaa itse päättää, saavatko keitot sisältyä suunnitelmaan
- haluaa välttää saman reseptin toistumista 14 päivän aikana
- tarvitsee aluksi vain viikon reseptilistan, ei kuvia tai ravintoarvoja

## 4. Tuotteen peruskäsite

### 4.1 Viikkosuunnitelma

Viikkosuunnitelma sisältää täsmälleen seitsemän päivällistä:

- maanantai
- tiistai
- keskiviikko
- torstai
- perjantai
- lauantai
- sunnuntai

Jokaiselle viikonpäivälle kuuluu yksi resepti.

### 4.2 Resepti

Resepti on suomenkielinen päivällisohje, joka sisältää vähintään:

- reseptin nimen
- ainesosat ja määrät
- valmistusohjeen
- aktiivisen työajan
- tiedon siitä, onko kyseessä keitto
- yhden pääasiallisen proteiininlähteen

Reseptin pääasiallisen proteiininlähteen tulee olla sellainen, että sitä on saatavilla Suomen ruokakaupoista.

## 5. Toiminnalliset vaatimukset

### PR-1: Viikon suunnitelman muodostaminen

Tuotteen tulee muodostaa käyttäjälle seitsemän päivän päivällissuunnitelma maanantaista sunnuntaihin.

### PR-2: Resepti jokaiselle päivälle

Jokaisella viikonpäivällä tulee olla yksi resepti.

### PR-3: Pääasiallisen proteiininlähteen valinta

Käyttäjän tulee voida valita yksi pääasiallinen proteiininlähde suunnitelmaa varten.

Sallitun pääproteiinilähteen tulee olla saatavilla Suomen ruokakaupoista. Kaikki proteiininlähteet ovat käyttäjän valittavissa, kunhan ne täyttävät tämän saatavuusehdon.

Jos käyttäjä ei valitse proteiininlähdettä, käytetään oletuksena kanaa.

### PR-4: Yksi pääproteiinilähde reseptiä kohden

Jokaisella suunnitelmaan valitulla reseptillä tulee olla yksi pääasiallinen proteiininlähde.

Muut reseptin ainesosat eivät muuta tätä luokitusta, jos ne eivät ole reseptin pääasiallisia proteiininlähteitä.

### PR-5: Keittojen salliminen tai estäminen

Käyttäjän tulee voida valita, sallitaanko keitot viikon suunnitelmassa.

### PR-6: Aktiivisen työajan rajoitus

Suunnitelmaan voidaan valita vain reseptejä, joiden aktiivinen työaika on enintään 45 minuuttia.

Reseptin kokonaisvalmistusaikaa ei tässä vaiheessa rajoiteta.

### PR-7: Reseptien toistumisen estäminen

Sama resepti ei saa esiintyä käyttäjän suunnitelmissa 14 päivän aikana.

Resepti merkitään käytetyksi heti suunnitelman luonnin yhteydessä riippumatta siitä, valmistetaanko ruoka myöhemmin.

### PR-8: Vanhempien reseptien suosiminen

Kun sopivia reseptejä valitaan, voidaan suosia reseptiä, jonka edellisestä käytöstä on kulunut eniten aikaa.

Tämä suosiminen ei saa ohittaa käyttäjän valintoja tai 14 päivän toistumiskieltoa.

### PR-9: Yksittäisen päivän reseptin vaihtaminen

Käyttäjän tulee voida vaihtaa yksittäisen viikonpäivän resepti ilman, että koko viikon suunnitelma täytyy vaihtaa.

Vaihdettavan reseptin tulee edelleen täyttää:

- valittu pääproteiinilähde
- keittoasetus
- enintään 45 minuutin aktiivinen työaika
- 14 päivän toistumiskielto
- yhden pääproteiinilähteen sääntö

Käyttäjän hyväksymä uusi resepti merkitään käytetyksi heti vaihdon yhteydessä.

### PR-10: Reseptin tarkastelu

Käyttäjän tulee voida tarkastella viikonpäivälle valitun reseptin ainesosia ja valmistusohjetta.

### PR-11: Riittämättömien vaihtoehtojen käsittely

Jos käyttäjän valinnat ja 14 päivän toistumiskielto eivät mahdollista seitsemän reseptin muodostamista, tuotteen tulee ilmoittaa tästä käyttäjälle selkeästi.

Tuotteen ei tule rikkoa käyttäjän valintoja tai toistumiskieltoa hiljaisesti.

## 6. Käyttäjän pääasiallinen käyttökulku

1. Käyttäjä avaa suunnitelman muodostamisen.
2. Käyttäjä valitsee yhden pääproteiinilähteen tai jättää valinnan tekemättä.
3. Käyttäjä ilmoittaa, sallitaanko keitot.
4. Tuote muodostaa maanantaista sunnuntaihin kestävän viikon suunnitelman.
5. Käyttäjä tarkastelee päivien reseptejä.
6. Käyttäjä voi vaihtaa yksittäisen päivän reseptin.
7. Tuote säilyttää suunnitelmassa käytetyt reseptit 14 päivän toistumissääntöä varten.

## 7. Käytettävyysvaatimukset

- Viikon seitsemän päivää tulee erottaa toisistaan selkeästi.
- Käyttäjän valinnat tulee olla ymmärrettäviä ilman teknistä tietoa.
- Suunnitelman muodostamisen tulee olla suoraviivaista.
- Käyttäjän tulee nähdä, mikä pääproteiinilähde on valittu.
- Käyttäjän tulee nähdä, sallitaanko keitot.
- Reseptin vaihtaminen tulee kohdistua selkeästi yhteen viikonpäivään.
- Virhe- ja puutetilanteissa käyttäjälle tulee kertoa, mitä tapahtui.

## 8. Sisältövaatimukset

- Reseptit ovat suomenkielisiä.
- Reseptien pääproteiinilähteiden tulee olla saatavilla Suomen ruokakaupoista.
- Reseptit eivät tarvitse kuvia.
- Reseptit eivät tarvitse ravintoarvoja.
- Allergia- ja erityisruokavaliosuodattimia ei tarvita ensimmäisessä vaiheessa.
- Tuotteen ensimmäinen versio tarvitsee vain seitsemän päivän listan ja reseptien tarkastelun.

## 9. Rajaukset ensimmäisessä vaiheessa

Ensimmäiseen vaiheeseen eivät kuulu:

- ravintoarvojen laskeminen tai näyttäminen
- reseptikuvat
- allergia- ja erityisruokavaliosuodattimet
- ostoslista
- annosmäärien hallinta
- budjetin tai hinnan seuranta
- käyttäjän viikon aloituspäivän valinta
- muiden käyttäjien hallinta
- julkinen reseptien jakaminen
- automaattinen ravitsemusneuvonta

## 10. Liiketoimintasäännöt

1. Viikko on aina maanantaista sunnuntaihin.
2. Suunnitelmassa on seitsemän päivällistä.
3. Jokaisella päivällä on yksi resepti.
4. Reseptin aktiivinen työaika on enintään 45 minuuttia.
5. Reseptillä on yksi pääasiallinen proteiininlähde.
6. Käyttäjä voi valita yhden pääproteiinilähteen.
7. Valinnan puuttuessa pääproteiinilähde on kana.
8. Pääproteiinilähteen tulee olla saatavilla Suomen ruokakaupoista.
9. Käyttäjä päättää, sallitaanko keitot.
10. Sama resepti ei saa toistua 14 päivän aikana.
11. Resepti lasketaan käytetyksi suunnitelman luonnin yhteydessä.
12. Yksittäisen päivän reseptin vaihtaminen ei saa kiertää muita sääntöjä.
13. Vanhempaa reseptiä voidaan suosia, jos se täyttää kaikki muut ehdot.

## 11. Riskit ja riippuvuudet

### Reseptikirjaston riittävyys

Valitun proteiininlähteen, keittoasetuksen ja 14 päivän toistumiskiellon yhdistelmä voi rajata vaihtoehdot liian pieniksi. Reseptikirjaston täytyy sisältää riittävästi vaihtelua.

### Proteiininlähteen luokittelu

Pääasiallisen proteiininlähteen määrittely voi olla epäselvää resepteissä, joissa on useita proteiinia sisältäviä ainesosia. Luokitteluperiaate tulee pitää yhdenmukaisena.

### Reseptien saatavuus Suomessa

Raaka-aineiden saatavuus voi vaihdella kauppaketjuittain, paikkakunnittain ja vuodenaikojen mukaan. Vaatimus tarkoittaa tässä yleistä saatavuutta Suomen ruokakaupoissa, ei taattua saatavuutta jokaisessa myymälässä.

### Reseptien käyttöoikeudet

Reseptitekstien, kuvien ja muun sisällön käyttöoikeudet on varmistettava ennen kuin sisältöä käytetään tuotteessa. Ensimmäinen vaihe ei edellytä kuvia, mikä pienentää tätä riskiä.

### Toistumishistorian oikeellisuus

14 päivän sääntö toimii vain, jos suunnitelman luonnit ja reseptien vaihdot kirjataan johdonmukaisesti.

## 12. Hyväksymiskriteerit

- [ ] Käyttäjä voi muodostaa seitsemän päivän suunnitelman maanantaista sunnuntaihin.
- [ ] Jokaisella päivällä on yksi resepti.
- [ ] Käyttäjä voi valita yhden pääproteiinilähteen.
- [ ] Valinnan puuttuessa käytetään kanaa.
- [ ] Kaikilla valituilla resepteillä on käyttäjän valitsema pääproteiinilähde.
- [ ] Käyttäjä voi sallia tai kieltää keitot.
- [ ] Yksikään valittu resepti ei ylitä 45 minuutin aktiivista työaikaa.
- [ ] Sama resepti ei toistu käyttäjän 14 päivän historiassa.
- [ ] Resepti kirjataan käytetyksi suunnitelman luonnin yhteydessä.
- [ ] Käyttäjä voi vaihtaa yksittäisen päivän reseptin.
- [ ] Vaihdettu resepti noudattaa kaikkia samoja sääntöjä kuin alkuperäinen.
- [ ] Käyttäjä voi tarkastella valitun reseptin ainesosia ja valmistusohjetta.
- [ ] Tuote ilmoittaa selkeästi, jos sopivia reseptejä ei ole riittävästi.
- [ ] Reseptit ovat suomenkielisiä.
- [ ] Reseptien pääproteiinilähteet ovat yleisesti saatavilla Suomen ruokakaupoista.
- [ ] Tuote ei vaadi kuvia tai ravintoarvoja.

## 13. Avoimet päätökset

Seuraavat kohdat eivät estä PRD:n laatimista, mutta ne on päätettävä ennen toteutuksen yksityiskohtaista suunnittelua:

- Miten käyttäjälle ilmoitetaan, ettei sopivaa reseptiä ole riittävästi?
- Näytetäänkö vaihtamisen yhteydessä yksi ehdotus vai useampi vaihtoehto?
- Voiko käyttäjä vaihtaa saman päivän reseptiä useita kertoja?
- Säilytetäänkö useampi aiempi viikkosuunnitelma kuin 14 päivän säännön edellyttämä historia?
- Määritelläänkö pääproteiinilähde reseptikirjastossa käsin vai jonkin ulkoisen luokituksen perusteella?

## 14. Ei-tekniset hyväksymisperusteet

Tuote voidaan katsoa ensimmäisen vaiheen vaatimusten mukaiseksi, kun henkilökohtainen käyttäjä pystyy ilman ohjeistusta:

1. valitsemaan pääproteiinilähteen tai käyttämään kanan oletusta
2. valitsemaan, sallitaanko keitot
3. muodostamaan maanantaista sunnuntaihin ulottuvan seitsemän päivän suunnitelman
4. tarkastelemaan jokaisen päivän reseptiä
5. vaihtamaan yhden päivän reseptin
6. ymmärtämään, jos sopivaa reseptiä ei ole saatavilla

