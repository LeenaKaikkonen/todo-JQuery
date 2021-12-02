const todoTeksti = document.getElementById("todo-teksti");
const lisaaTodoNappi = document.getElementById("lisaa");
const tehtavaLista = document.getElementById("tehtavalista");
const naytaTehtavatNappi = document.getElementById("tehtavat");
const naytaTehdytNappi = document.getElementById("tehdyt");
const naytaKaikkiNappi = document.getElementById("kaikki");

// You’ll need a key to access the AMEE Open Business API.
// API Key: 8c68347b01e3a4280cf15b549db32aa9
// API Secret: 6b3b33dab568179c0106e5725cd28d11
// https://www.amee.com/api/companies?from_lat_lon=51.623,-0.0732&distance=20

let todoLista = [];
let nayta = 1;

// Haetaan localStorageen stringinä tallennettu lista ja muutetaan se arrayksi käsittelya varten
function haeLista() {
  let nykyinenTodoLista = localStorage.getItem("todoTallennetut");
  if (nykyinenTodoLista == null || nykyinenTodoLista == "") {
    todoLista = [];
  } else {
    todoLista = nykyinenTodoLista.split(",");
  }
}

//tallennetaan arraymoutoinen todoLista stringmuodossa localStorageen
function tallennaLista() {
  localStorage.setItem("todoTallennetut", todoLista.join(","));
}

// Lisätään listalle uusia asioita (edellä luotuun Arrayhin) ja tallennetaan lista stringinä Local Storageen sekä näytetään lista
lisaaTodoNappi.addEventListener("click", function () {
  if (todoTeksti.value == "") {
    alert("Lisää tehtävä");
    return false;
  }

  nayta = 1;
  haeLista();
  todoLista.push(todoTeksti.value);

  tallennaLista();
  naytaTehtavat();

  $("#todo-teksti")[0].value = null;
});

// valitaan mitä näytä tehtävät / tehdyt / kaikki napit näyttävät
naytaTehdytNappi.addEventListener("click", function () {
  nayta = 2;
  naytaTehtavat();
});

naytaTehtavatNappi.addEventListener("click", function () {
  nayta = 3;
  naytaTehtavat();
});

naytaKaikkiNappi.addEventListener("click", function () {
  nayta = 1;
  naytaTehtavat();
});

let todoHtml = "";

// Funktio jonka perusteella lista näytetään. Tehtävät yliviivataan jos ne on merkitty tehdyiksi (luokka vaihtuu), lisäksi määritetään mitä eri napeista näytetään
function naytaTehtavat() {
  let i = 1;
  todoLista.forEach((tehtava) => {
    let id = i;
    let te = tehtava;

    let rivinluokka = "tekstirivi";
    if (onkoTehty(tehtava)) {
      te = tehtava.substring(1);
      rivinluokka = "tekstirivi2";
    }

    if (
      nayta === 1 ||
      (nayta === 2 && onkoTehty(tehtava)) ||
      (nayta === 3 && !onkoTehty(tehtava))
    ) {
      todoHtml += `<br><div class='todo'><div id=inside>
            <button onclick='poistaTodo("${tehtava}")' type="button" class="poista-nappi">X</button>
          <p class='${rivinluokka}' id=it${id} onclick='teeTodo("${tehtava}")'>&nbsp;&nbsp;${te}&nbsp;&nbsp; </p>
          <button onclick='muokkaaTodo("${tehtava}")' type="button" class="editoi-nappi">Muokkaa</button>
          </div>  
       </div>`;
    }
    i++;
  });
  tehtavaLista.innerHTML = todoHtml;

  todoHtml = "";
}

// // Muokataan listan tehtäviä muokkaa napista (tehtävä siirtyy editoitavaksi ja häviää listalta)
function muokkaaTodo(tehtava) {
  haeLista();
  let muokattavaIndex = todoLista.indexOf(tehtava);

  $("#todo-teksti")[0].value = tehtava;

  todoLista.splice(muokattavaIndex, 1);
  tallennaLista();
  naytaTehtavat();
}

// Poistetaan listalta tehtäviä ruksia painamalla
function poistaTodo(tehtava) {
  haeLista();
  let poistettavaIndex = todoLista.indexOf(tehtava);
  todoLista.splice(poistettavaIndex, 1);

  // Run the effect
  let poistettava = $("#it" + (poistettavaIndex + 1));
  poistettava.effect("drop", 600);
  tallennaLista();
  setTimeout(naytaTehtavat, 600);
}

// Tarkistetaan onko tehtävä tehty vai ei (jos stringissä on #, tehtävä on tehty)
function onkoTehty(tehtava) {
  return tehtava.indexOf("#") == 0;
}

// Merkitään tehtävä tehdyksi tai tekemättömäksi klikkaamalla tehtävätekstiä
function teeTodo(tehtava) {
  haeLista();

  let viivattavaIndex = todoLista.indexOf(tehtava);

  let homma = $("#it" + (viivattavaIndex + 1)); //[0];

  if (onkoTehty(tehtava)) {
    homma.removeClass("tekstirivi2");
    homma.addClass("tekstirivi");
    homma.attr("onclick", 'teeTodo("' + tehtava.substring(1) + '")');
    todoLista[viivattavaIndex] = tehtava.substring(1);
  } else {
    homma.removeClass("tekstirivi");
    homma.addClass("tekstirivi2");
    homma.attr("onclick", 'teeTodo("#' + tehtava + '")');
    todoLista[viivattavaIndex] = "#" + tehtava;
  }
  tallennaLista();

  // naytaTehtavat();
}

// haetaan localStoragesta kulloinkin olemassa oleva lista näytölle, kun näyttö päivitetään
haeLista();
naytaTehtavat();
