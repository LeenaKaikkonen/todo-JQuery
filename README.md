# todo-lista
Tehtävät sovellus, johon voi syöttää tehtävia asioita. 
Asiat voivat olla mitä tahansa merkkijonoja, mutta tyhjää kenttää ei voi tallentaa vaan se antaa virheilmoituksen.
Syötetyt asiat listataan array-muodossa, mutta tallennusta varten ne muutetaan string-muotoon ja tallennetaan localStorageen.
listalla olevia asioita voi klikata, jolloin ne yliviivataan.
Listattujen asioiden vieressä oleva ruksi poistaa asiat.
Muokkaa-nappia painamalla syötetty kenttä siirtyy takaisin editoitavaksi ja poistuu listalta.
Listan voi hakea näkyviin joko kokonaan, tai siten että näkyvissä ovat vain tehdyt tai tekemättömät tehtävät.
Tehdyt ja tekemättömät asiat jaetaan esi tyyliluokkiin, sekä käsitellään erillisinä ryhminä ohjelmassa. 
Tallennusta varten ne merkitään # merkillä, jolloin ne voidaan uudelleen jakaa omiin luokkiinsa kun tallennetut tiedot haetaan käyttöön.
Koko sovellus koodattiin ilman JSON tai Bootsrap ominaisuuksia.
Javasript löytyy tiedostosta todoskripti.js ja tyylimääritelyt tiedostosta styletodo.css.

