# Architecture Specification: Viikon päivällissuunnitelma

## Dokumentin tila

- **Tila:** Draft
- **Päivitetty:** 2026-09-08
- **Tavoite:** Mahdollisimman nopeasti kehitettävä ja yksinkertainen MVP
- **Liittyvä ominaisuus:** [Viikon päivällissuunnitelman muodostaminen](features/weekly-dinner-planning.md)
- **Tuotevaatimukset:** [Product Requirements Document](product-requirements.md)

## 1. Arkkitehtuurin tavoite

MVP:n tulee mahdollistaa yhden käyttäjän viikon päivällissuunnitelman muodostaminen, tarkastelu, yksittäisen päivän reseptin vaihtaminen ja 14 päivän käyttöhistorian säilyttäminen mahdollisimman pienellä määrällä liikkuvia osia.

Arkkitehtuurin ensisijainen tavoite on kehitysnopeus ja toiminnallinen luotettavuus. Skaalautuvuus, monen käyttäjän hallinta ja usean laitteen synkronointi eivät ole MVP:n tavoitteita.

## 2. Ehdotettu arkkitehtuurimalli

### 2.1 Local-first-sovellus

MVP toteutetaan selaimessa toimivana local-first-sovelluksena:

- käyttöliittymä, suunnittelulogiikka, reseptikirjasto ja käyttäjän historia ovat samassa sovelluksessa
- reseptikirjasto toimitetaan sovelluksen mukana ennalta tarkistettuna sisältönä
- käyttäjän suunnitelmat ja käyttöhistoria säilytetään käyttäjän selaimessa
- erillistä palvelinta, käyttäjätiliä tai kirjautumista ei tarvita
- sovellus voidaan julkaista staattisena verkkosovelluksena

Tämä on perusteltu valinta, koska tuote on henkilökohtaiseen käyttöön eikä vaadi käyttäjien välistä jakamista tai keskitettyä reseptien ylläpitoa.

### 2.2 Modulaarinen monoliitti selaimessa

Sovellus jaetaan selkeisiin toiminnallisiin osiin yhden sovelluksen sisällä:

1. **Suunnittelunäkymä** vastaanottaa käyttäjän valinnat.
2. **Suunnittelumoottori** suodattaa ja järjestää reseptiehdokkaat.
3. **Reseptikirjasto** tarjoaa validoidut reseptit ja niiden metatiedot.
4. **Historia** lukee ja tallentaa 14 päivän käyttötapahtumat.
5. **Viikkosuunnitelma** hallitsee maanantaista sunnuntaihin sijoitettuja reseptejä.
6. **Reseptinäkymä** näyttää ainesosat ja valmistusohjeen.
7. **Paikallinen tallennus** säilyttää sovelluksen tilan selaimessa.

Osat voidaan pitää erillisinä ilman erillisiä palveluita tai raskasta abstraktiokerrosta.

## 3. Keskeinen tietovirta

### Suunnitelman muodostaminen

1. Käyttäjä valitsee pääproteiinin tai jättää valinnan tyhjäksi.
2. Sovellus käyttää oletuksena kanaa, jos valinta puuttuu.
3. Käyttäjä valitsee, sallitaanko keitot.
4. Suunnittelumoottori suodattaa reseptit pääproteiinin, keittostatuksen ja enintään 45 minuutin aktiivisen työajan perusteella.
5. Suunnittelumoottori poistaa reseptit, jotka ovat käyttäjän viimeisen 14 päivän historiassa.
6. Jäljelle jäävät reseptit järjestetään niin, että pisimpään käyttämättä ollut sopiva resepti on etusijalla.
7. Sovellus tarkistaa, että ehdokkaita on vähintään seitsemän.
8. Sovellus sijoittaa reseptit viikonpäiville maanantaista sunnuntaihin.
9. Onnistunut suunnitelma ja sen seitsemän käyttötapahtumaa tallennetaan paikallisesti.

### Yksittäisen päivän vaihto

1. Käyttäjä valitsee yhden viikonpäivän vaihdettavaksi.
2. Sovellus käyttää samaa suodatusta ja historiaa kuin suunnitelman luonnissa.
3. Nykyinen resepti suljetaan kyseisen päivän vaihtoehdoista.
4. Käyttäjä valitsee uuden reseptin.
5. Vain kyseisen päivän resepti vaihtuu.
6. Uuden reseptin käyttö kirjataan heti vaihdon hyväksymisen yhteydessä.

## 4. Arkkitehtuurin liiketoimintasäännöt

- Viikko sisältää täsmälleen seitsemän päivää maanantaista sunnuntaihin.
- Jokaisella päivällä on täsmälleen yksi resepti.
- Oletusproteiini on kana.
- Käyttäjän valitsema proteiini suodattaa kaikki viikon reseptit.
- Aktiivinen työaika saa olla enintään 45 minuuttia.
- Keittojen salliminen määräytyy käyttäjän valinnasta.
- Sama resepti ei saa olla valittavissa käyttäjän viimeisen 14 päivän historiassa.
- Historia kirjataan suunnitelman luonnin yhteydessä, ei ruoan valmistumisen yhteydessä.
- Yksittäisen päivän vaihto ei saa muuttaa muita viikonpäiviä.
- Vajaa suunnitelma ei ole onnistunut suunnitelma.

## 5. Tallennuksen periaate

MVP:n tallennuksessa säilytetään vain ominaisuuden kannalta tarpeellinen tieto:

- viimeisin viikkosuunnitelma
- suunnitelman viikonpäiväkohtaiset reseptit
- reseptien käyttöpäivät vähintään 14 päivän tarkistusta varten
- käyttäjän viimeisin proteiinivalinta
- käyttäjän viimeisin keittoasetus

Vanhaa historiaa voidaan poistaa, kun sitä ei enää tarvita 14 päivän säännön tarkistamiseen.

Tallennuksen tulee käsitellä suunnitelman luonti yhtenä käyttäjälle näkyvänä tapahtumana. Jos seitsemää kelvollista reseptiä ei ole, suunnitelmaa tai sen osittaista käyttöhistoriaa ei tallenneta.

## 6. Reseptikirjaston periaate

MVP käyttää ennalta tarkistettua reseptikirjastoa eikä generoi reseptejä vapaasti käyttäjän pyynnön perusteella.

Jokaisella reseptillä on oltava ennen julkaisemista:

- suomenkielinen nimi, ainesosat ja valmistusohje
- yksi pääasiallinen proteiininlähde
- tieto keitosta
- aktiivinen työaika minuutteina
- yksilöllinen tunniste
- tieto siitä, että pääproteiini on yleisesti saatavilla Suomen ruokakaupoissa
- oikeus käyttää reseptisisältöä sovelluksessa

## 7. Rajat ja myöhempi laajennettavuus

### MVP:n ulkopuolelle jäävät rajat

- ei palvelinpuolta
- ei kirjautumista
- ei keskitettyä synkronointia
- ei usean käyttäjän tietojen erottelua palvelimella
- ei reseptikirjaston hallintapaneelia
- ei ulkoista resepti-API:a ajonaikaisena riippuvuutena

### Mahdollinen myöhempi laajennus

Jos käyttäjä tarvitsee usean laitteen synkronointia, käyttäjätilin tai reseptikirjaston keskitetyn päivityksen, paikallinen tallennus voidaan korvata palvelinpuolen tallennuksella. Suunnittelumoottorin liiketoimintasäännöt tulee tällöin säilyttää erillään käyttöliittymästä, jotta niitä ei tarvitse suunnitella uudelleen.

## 8. Arkkitehtuurin hyväksymiskriteerit

- **AA1:** MVP toimii yhdellä käyttäjän selaimella ilman kirjautumista ja ilman erillistä palvelinprosessia.
- **AA2:** Suunnitelman muodostamisen liiketoimintasäännöt ovat käyttöliittymästä erillinen testattava kokonaisuus.
- **AA3:** Seitsemän reseptin suunnitelma ja sen käyttöhistoria tallennetaan vasta, kun kaikki seitsemän reseptiä on valittu onnistuneesti.
- **AA4:** Epäonnistunut suunnitelman muodostaminen ei lisää yhtään käyttöhistoriatapahtumaa.
- **AA5:** Yksittäisen päivän vaihto muuttaa vain valitun viikonpäivän reseptin.
- **AA6:** Reseptikirjasto sisältää vain reseptejä, joilla on kaikki suunnitteluun tarvittavat metatiedot.
- **AA7:** Arkkitehtuuri ei edellytä kuvia, ravintoarvoja, ostoslistaa tai käyttäjätiliä.
- **AA8:** Suunnittelumoottori voidaan myöhemmin siirtää palvelinpuolelle ilman, että käyttäjän näkyvät liiketoimintasäännöt muuttuvat.

## 9. Avoimet arkkitehtuuripäätökset

- Säilytetäänkö käyttäjän historia vain yhdessä selaimessa vai tarvitaanko myöhemmin synkronointi?
- Tarvitaanko reseptikirjaston päivitykseen erillinen sisällönhallinta?
- Mikä on sovelluksen palautumistapa selaimen tietojen tyhjentämisen jälkeen?
- Tarvitaanko varmuuskopio tai vienti henkilökohtaiseen käyttöön?
