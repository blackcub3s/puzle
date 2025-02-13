/*AUTOR: 
    NOM: Santiago Sánchez Sans
    NIA: 12720004
*/

function main() {

    let correctes;
    const selectNreFiles = document.getElementById('selectDificultat');
    const selectDificultat = document.getElementById('grauDificultat');
    //fem un bucle do while per aconseguir que en carregar la pàgina (en executar el main) la matriu de jugadors que es generi 
    // quan la dificultat del select està posada a "dificil" (cas en que existeix una generació plenament aleatòria inicial de
    //  tots els nombres de la matriu de jugador) MAI es pugui donar el cas que per atzar es crei una matriu amb cel·les que 
    // ja estiguin a les seves posicions correctes. Són poques les cel·les que es veuen ja resoltes, però la probabilitat 
    // no és negligible i se sol donar habitualment.
    do {
        document.getElementById("contenidorMatriu").innerHTML = "";
        
        nFils = parseInt(selectNreFiles.options[selectNreFiles.selectedIndex].value);
        dificilOfacil = selectDificultat.options[selectDificultat.selectedIndex].value;

        avaluaVisibilitatSelectorDificultat(nFils, selectDificultat);


        const mc = new matriuCorrecta(nFils); //matriuCorrecta
        const mj = new matriuJugador(nFils, dificilOfacil);  //matriuJugadors
        const mrc = new marcador(mc, mj);     //matriuMarcador (té 1 si hi ha coincidència entre mc i mj, i 0 altrament)
        const mrcDom = new marcadorDom(mrc);  //I també posem un marcador al dom

        correctes = mostraEstatMatrius(mc, mj, mrc);

        //Un cop creades les tres matrius internes per executar el joc creem la taula en el dom!
        var tDom = new taulaDom(mc, mj, mrc, mrcDom, "contenidorMatriu"); //passo per paràmetre la taula de jugador que hem creat.
        
    } while (dificilOfacil == "dificil" && correctes != 0 && tDom.destrueixTaula()); //en essència tDom.destrueixTaula només destruira la taula si la taula de jugador generada té alguna cel·la que ja estigui al lloc correcte on l'hauria d'haver posat el jugador en jugar (és dir quan correctes != 0 i detecti fills a la taula)
    tIniJoc = new Date(); //variable Global (marcador d'inici de temps del joc)
}


main();