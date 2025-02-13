/*AUTOR: 
    NOM: Santiago Sánchez Sans
    NIA: 12720004
*/

//PRE: mc (una array que representa la matriu correcta a la que volem arribar).
//     mj (una array que representa la matriu del jugador, segons l'estat actual del joc)
//     mrc (array que representa la matriu que fa de marcador segons l'estat actual del joc)
//POST: nombre de cel·les coincidents entre mc i mj.
function mostraEstatMatrius(mc, mj, mrc) {
    console.clear(); //esborro la consola perquè quan cal destruir la taula es generen multiples impressions (una per cada iteració del while)
    console.log("\n\nmc (matriu Correcta -ESTAT DESITJAT-):")
    mc.imprimeixMatriu();
    
    console.log("\n\nmj (matriu de jugador -ESTAT ACTUAL-):")
    mj.imprimeixMatriu();

    console.log("\n\nmrc (marcador  -COINCIDÈNCIES mc VS mj-):");
    mrc.imprimeixMatriu();

    //mostro l'estat del marcador (la proporciói d'encerts de l'usuari actualment)
    var [correctes, nreCeles] = mrc.generaProporcioCompletats();
    console.log(`\n\nProporcioEncerts = ${correctes}:${nreCeles} (${(Math.round(100*correctes/nreCeles))} %)`);
    return correctes;
}


//PRE: Funció que pren un valor enter positiu superior a 1
//POST: es genera un array unidimensional amb tots els nombres en l'interval [0, nreElements -1] DESORDENATS.
function generaArrayAleatoria(nreFiles) {
    let nreCeles = nreFiles * nreFiles;
    let arrNresCelesOrdenats = Array.from({ length: nreCeles }, (v, i) => i); //creo array amb tots els nombres que volem dins [0,1,2,..., nreCeles]
    let arrNresCelesALEATORITZATS = [];
    do {
        let indexSeleccionat = Math.floor(Math.random() * nreCeles); //genero indexos en el rang de dins de arrNresCelesOrdenats per seleccionar els seus valors de forma aleatoria 
        arrNresCelesALEATORITZATS.push(arrNresCelesOrdenats[indexSeleccionat]);
        arrNresCelesOrdenats.splice(indexSeleccionat, 1); //esborrem el nombre que ja hem seleccionat (es un mostreig aleatori SENSE reposicio, com la loteria)
        --nreCeles;
    } while (nreCeles > 0);
    return arrNresCelesALEATORITZATS;
}

//Amaga el selector de dificultat en la matriu de 2x2 i mostra-la per a les altres matrius més grans.
function avaluaVisibilitatSelectorDificultat(nFils, selectDificultat) {
    var pSelectDificultat = document.getElementById("llocGrauDificultat").firstElementChild; //agafo el paragraf p "nreFiles"
    if (nFils == 2) {
        pSelectDificultat.style.display = "none";
        selectDificultat.style.display = "none";
    } else {
        pSelectDificultat.style.display = "block";
        selectDificultat.style.display = "block";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const botoRefresca = document.querySelector("#resetejarJoc > button");
    botoRefresca.addEventListener("click", () => {
        location.reload();
    });


    //permet variar el nombre de files i columne que té la matriu quadrada del joc.
    // si posem 2 files no existeix la possibilitat de sel·leccionar dificultat.
    var selectNreFiles = document.getElementById('selectDificultat');
    selectNreFiles.addEventListener("change", function actualitzaNreFiles() {
        document.getElementById("contenidorMatriu").innerHTML = "";
        main();
    });

    //permet variar el grau de dificultat (només per a matrius superior a 2x2):
    //   fàcil: és matrius correctes nomes amb 4 elements rotats en la submatriu 2x2 en l'escaira inferior dreta 
    //   dificil: matrius aleatories sense cap cel·la col·locada al seu lloc)
    var selectGrauDificultat = document.getElementById("grauDificultat");
    selectGrauDificultat.addEventListener("change", function actualitzaGrauDificultat() {
        document.getElementById("contenidorMatriu").innerHTML = "";
        main();
    });


    /*Aquest script aconsegueix que en prémer el botó de fons vermell per tancar l'aside informatiu
    la funcionalitat de fer desaparèixer l'aside del DOM quedi centrada
    en el centre de la pantalla, horitzontalment, el contenidor on tenim el contingut de l'aplicació*/
    document.querySelector('.botoTancarAside').addEventListener('click', function() {
        const aside = document.querySelector('aside'); 
        aside.parentElement.removeChild(aside);
        
        //Ajusto el contenidor principal per centrar el <main>
        const contenidorPare = document.querySelector('#contenidorPare');
        contenidorPare.style.gridTemplateColumns = "1fr"; 
    });
    


});



