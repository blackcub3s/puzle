/*AUTOR: 
    NOM: Santiago Sánchez Sans
    NIA: 12720004
*/

class taulaDom {
    #idPare;        //identificador de l'element pare del qual penjarà la taula en el DOM (serà un string amb dues posicions indexat des de 1)
    #objMC;         //passem l'objecte de la matriu correcta que ja hem generat al main.
    #objMJ;         //prenem l'objecte de la matriu de jugador, que passarem per paràmetre al constructor (ja confeccionat i inicialitzat prèviament)
    #objMRC;        //passem l'objecte de la matriu del marcador que ja hem generat al main.
    #objMRCDOM;     //passem objecte del marcador en el dom
    #contenidorPare;//és el contenidor del dom on afegirem la taula (el que té l'id #idPare)  
    #ultimaCelaClicada; //l'string que indicarà la fila i la columna de la última cel·la de la taula clicada (per defecte es 00, que es quan encara l'usuari no ha clicat res)
    constructor(objMC, objMJ, objMRC, objMRCDOM, idPare) {
        this.#idPare = idPare;
        this.#objMC = objMC;
        this.#objMJ = objMJ; //objMJ és l'objecte matriuJugador creat anteriorment
        this.#objMRC = objMRC;
        this.#objMRCDOM = objMRCDOM;
        this.#contenidorPare = document.getElementById(this.#idPare);
        this.#afegeixTaula();
        this.#afegeixEscoltadorsEsdevenimentsTDs();
        this.ultimaCelaClicada = "00"; //per defecte la cela de la fila 1 columna 1 sera 11 (mai 00, això serà només per inicialitzar)
    }

    //MÈTODE PRIVAT:
    // 
    // funció que afegeix escoltadors d'esdeveniments a cada table data per poder fer els swaps
    //si es donen les condicions idònies (contiguitat horitzontal o vertical i que un dels dos elements sigui zero -el zero es l'element
    //en blanc tal i com ho he programat jo [NOTA: he canviat blanc.gif per 0.gif])
    #afegeixEscoltadorsEsdevenimentsTDs() {
        let filesTR = this.#contenidorPare.firstElementChild.children;
        for (let i = 0; i < filesTR.length; ++i) {
            let celesFILA= filesTR[i].children;
            for (let j = 0; j < celesFILA.length; ++j) { //és una matriu cuadrada, podem fer servir la mateixa longitud
                celesFILA[j].addEventListener("click", (esdeveniment) => {  //cal fer servir la DOUBLE arrow perquè sino agafaria l'esdeveniment
                    //POTS COMPROVAR SI ESDEVENIMENT ES CLICK EN CAS QUE EN VULGUIS AFEGIR ALTRES
                    this.#ultimaCelaClicada = celesFILA[j].getAttribute("id");
                    //console.log("----------------\ncela clicada: "+this.#ultimaCelaClicada+" ("+esdeveniment.type+").\n----------------");
                    this.#fesSwapCelesTaula();
                });                
            }
        }
    }

    // --mètode privat--
    // PRE: - IJclc --> la posició (indexada des de 1) de la cel·la cantonera on s'ha CLICAT 
    //               Si m es nreDeFiles i n es nreDeColumnes (IJclc podrà ser un 
    //               dels seguents quatre valors en cridar-la des de fesSwapCelesTaula:
    //              "11", "mn", "1n", "m1", tal que així:
    //              
    //              "11"   ... "1n"
    //                .          .
    //                .          .
    //               "m1"  ...  "mn"
    //
    //      - ij1, ij2 --> Ids de les dues cel·les contigues que hi hagi a la cel·la cantonera de posicio IJclc.
    //
    // POST: la cela de id IJclc es veurà comparada amb ij1. Si ij1 es 0 pararà i actualitzarà
    //       objMJ fent el swap. També farà el swap en el DOM. Si no, aleshores compararà IJclc
    //       amb ij2 i reiniciarà la comprovació amb aquesta nova cel·la fent el swap tant en objMJ com en DOM si és pertinent. Altrament
    //       no farà res.
    #avaluaCandidatsContigusEnCantonades(IJclc, ij1, ij2) {
        if (this.#objMJ.swapCeles(IJclc, ij1)) {   //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij1
            this.#intercanviaCelesDom(IJclc,ij1); //[B]
        }
        else if (this.#objMJ.swapCeles(IJclc, ij2)) { //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij2
            this.#intercanviaCelesDom(IJclc, ij2);    //[B]
        }        
    }

    //MÈTODE PRIVAT:
    // 
    // PRE: cIntercanv és un string que prové de l'escoltador d'esdeveniments (forma IJ mab indexació des de 1, on I es una caracter que identifica a la fila
    //     i J és un caràcter que identifica a la columna). Si IJ és 12 parlem de la fila 1 columna 2:
    // POST: la cela de id IJ es veurà comparada amb ij1. Si ij1 es 0 pararà i actualitzarà
    //       objMJ fent el swap. També farà el swap en el DOM. Si no, aleshores compararà IJclc
    //       amb ij2 i reiniciarà la comprovació amb aquesta nova cel·la fent el swap tant en objMJ com en DOM si és pertinent. Si no funciona
    //       amb aquesta ho farà amb ij3. Si no funciona amb cap no ho farà amb cap.
    #avaluaCandidatsContigusEn_FILESEXTERNES_NOCANTONERES(IJclc, ij1, ij2, ij3) {
        if (this.#objMJ.swapCeles(IJclc, ij1)) {   //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij1
            this.#intercanviaCelesDom(IJclc,ij1); //[B]
        }
        else if (this.#objMJ.swapCeles(IJclc, ij2)) { //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij2
            this.#intercanviaCelesDom(IJclc, ij2);    //[B]
        }  
        else if (this.#objMJ.swapCeles(IJclc, ij3)) { //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij3
            this.#intercanviaCelesDom(IJclc, ij3);    //[B]
        }  
    }

    #avaluaCandidatsContigusEn_FILESINTERNES_NOCANTONERES(IJclc, ij1, ij2, ij3, ij4) {
        if (this.#objMJ.swapCeles(IJclc, ij1)) {   //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij1
            this.#intercanviaCelesDom(IJclc,ij1); //[B]
        }
        else if (this.#objMJ.swapCeles(IJclc, ij2)) { //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij2
            this.#intercanviaCelesDom(IJclc, ij2);    //[B]
        }  
        else if (this.#objMJ.swapCeles(IJclc, ij3)) { //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij3
            this.#intercanviaCelesDom(IJclc, ij3);    //[B]
        } 
        else if (this.#objMJ.swapCeles(IJclc, ij4)) { //[A] | COMPARO AMB LA CEL·LA CONTIGUA ij4
            this.#intercanviaCelesDom(IJclc, ij4);  
        }
    }



    //MÈTODE PRIVAT:
    // 
    //PRE: this.#ultimaCelaClicada() és un string que prové de l'escoltador d'esdeveniments (forma IJ mab indexació des de 1, on I es una caracter que identifica a la fila
    //     i J és un caràcter que identifica a la columna). Si IJ és 12 parlem de la fila 1 columna 2:
    //POST: es farà el canvi de les dues celes de les matrius SI i només si es pot fer aquest canvi (cel·la clicada tingui una cela en blanc contigua horitzontal
    //      o verticalment).
    #fesSwapCelesTaula() {
        let IJ = this.#ultimaCelaClicada; //ES STRING AQUI, COMPTE
        let [i, j] =  this.#ultimaCelaClicada.split('').map(Number); //fila i columna clicada indexada des de 1 (AQUI i i j SON ENTERS)
        let m = this.#objMJ.getNreFiles();    //m és el nombre de files
        let n = this.#objMJ.getNreColumnes(); //n és el nombre de columnes (nota, tindrem que m == n ja que és matriu quadrada)
        let M = m.toString(); //M és el nombre de files (amb string)
        let N = n.toString(); //n és el nombre de columnes (amb string)
        


        //------------------------------------------------------
        //[***] VEURE JUST DESPRÉS DEL COMENTARI LA REFERÈNCIA
        // 
        // A continuació definim la lògica per un total de 9 escenaris de clics possibles (cada escenari
        // està en un bloc if o if else).
        // 
        // Aquests 9 escenaris els podriem agrupar en 3 subtipus (3 colors diferents), en funció del 
        // nombre de comparacioms necessaries a efectuar entre la cel·la clicada (IJ) i les seves cel·les contigues:
        //
        //     SUBTIPUS GROC: 4 comparacions (es dóna en fer clic a una cel·la que NO ÉS en una file o columna EXTERNA)
        //     SUBTIPUS BLAU: 2 comparacions (es dóna en fer clic a una cel·la que fa cantonada en la matriu).
        //     SUBTIPUS TARONJA: 3 comparacions (es dóna en fer clic a una cel·la que ÉS en una fila o columna EXTERNA però no és una cantonada de la matriu).
        //  
        // Cada subtipus té una funció definida per tractar cada un dels respectius escenaris.
        //
        // Comentarem l'escenari o cas més senzill (agrupable dins subtipus blau): 
        //  si element clicat és fila 1 i columna 1 (cel·La superior esquerra)
        //  aleshores compararé amb les dues cel·les contingues (la de la dreta i la de baix).
        //  
        //  En aquest cas, per exemple, primer intento fer el swap en la matriu de jugador 
        //  (objMJ), si es pot fer ([A], en el codi a continuació). 
        //  Això ho fa la funció "swapCeles()" que al seu torn ja comprova abans de fer el swap 
        //  si és pertinent fer l'intercanvi: cal que la cel·la contigua avaluada
        //  sigui un zero (en blanc). Sino la funció swapCeles tornarà
        //  false, no farà el swap en la matriu de jugador i tampoc s'anirà a executar
        //  la funció "intercanviaCelesDom()" que intercanvia les cel·les de la taula.
        // 
        //  Si i només si es possible fer el swap (swapCeles torna true), aleshores faig 
        //  l'intercanvi de les celes del dom. Això es troba en les anotacions [B].

        //------------------------------------------------------


        //###################################################################
        //#                                                                 #
        //#     CLICS EN LES CELES DE LA MATRIU QUE NO PERTANYEN            #
        //#                  A CAP FILA EXTERNA DE LA MATEIXA               # 
        //#              (comparacions amb QUATRE cel·les)                  #
        //#                       (UN SOL ESCENARI)                         #
        //#      (VEURE ENCERCLAT GROC ilustracioComparacions.jpg)          #    
        //#                                                                 #
        //################################################################### 
        
        //ESCENARI (G1): CLICS EN CEL·LES INTERNES DE LA MATRIU 
        //     (CAS MÉS RESTRICTIU, QUE POSEM PRIMER).
        if (i > 1 && i < m && j > 1 && j < n ) {
            let ijDalt = (i-1).toString() + j.toString();
            let ijDreta = i.toString() + (j+1).toString();
            let ijSota = (i+1).toString() + j.toString();
            let ijEsq= i.toString() + (j-1).toString();
            this.#avaluaCandidatsContigusEn_FILESINTERNES_NOCANTONERES(IJ, ijDalt, ijDreta, ijSota, ijEsq);
        }


        //###################################################################
        //#                                                                 #
        //#CLICS EN ELS EXTREMS DE LA MATRIU (COMPARACIONS AMB DOS CEL·LES) #
        //#                                                                 #
        //#      (VEURE ENCERCLAT BLAU EN ilustracioComparacions.jpg)       #    
        //#                        (QUATRE ESCENARIS)                       #
        //###################################################################

        //CLICO CEL·LA SUPERIOR ESQUERRA (primera fila i primera columna) [***]
        else if (i == 1 && j == 1) { 
            let ijDre = "12";    //COMPARO AMB LA CEL·LA CONTIGUA DE LA DRETA
            let ijBaix = "21";   //COMPARO AMB LA CEL·LA CONTIGUA DE BAIX
            this.#avaluaCandidatsContigusEnCantonades(IJ, ijDre, ijBaix);
        }
        //CLICO CEL·LA INFERIOR DRETA (la de l'última fila i última columna)
        else if (i == n && j == m) { 
            let ijEsq = M + (n-1).toString(); //COMPARO AMB LA CEL·LA CONTIGUA DE L'ESQUERRA
            let ijDalt = (m-1).toString() + N; //COMPARO AMB LA CEL·LA CONTIGUA PER DAMUNT
            this.#avaluaCandidatsContigusEnCantonades(IJ, ijEsq, ijDalt);
        }
        //CLICO CEL·LA SUPERIOR DRETA (la de la primera fila i última columna)
        else if (i == 1 && j == m) { 
            let ijEsq = "1" + (n-1).toString(); //COMPARO AMB EL CONTIGU PER L'ESQUERRA
            let ijSota = "2" + N;               //COMPARO AMB EL CONTIGU PER BAIX
            this.#avaluaCandidatsContigusEnCantonades(IJ, ijEsq, ijSota);
        }
        //CLICO CEL·LA INFERIOR ESQUERRA (la de l'última fila i primera columna)
        else if (i == m && j == 1) { 
            let ijDalt = (m-1).toString() + "1"; //COMPARO AMB LA QUE HI HA JUST DAMUNT
            let ijDreta = M + "2";               //COMPARO AMB LA QUE HI HA JUST A LA DRETA
            this.#avaluaCandidatsContigusEnCantonades(IJ, ijDalt, ijDreta);
        } 


        //###################################################################
        //#                                                                 #
        //#     CLICS EN ELS COSTATS DE LA MATRIU QUE NO SÓN EXTREMS        # 
        //#              (COMPARACIONS AMB TRES CEL·LES)                    #
        //#                                                                 #
        //#      (VEURE ENCERCLAT TARONJA ilustracioComparacions.jpg)       #    
        //#                       (4 ESCENARIS)                             #
        //###################################################################        
        
        //IDENTIFICO NOMÉS FILA SUPERIOR (MENYS EXTREMS)
        else if (j > 1 && j < n && i == 1) {  
                let ijBaix = "2" + j.toString();
                let ijDreta = "1" + (j+1).toString();
                let ijEsq = "1" + (j-1).toString();
                this.#avaluaCandidatsContigusEn_FILESEXTERNES_NOCANTONERES(IJ, ijEsq, ijDreta, ijBaix);
        }
        //IDENTIFICO NOMÉS FILA INFERIOR (MENYS EXTREMS)
        else if (j > 1 && j < n && i == m) { 
                let ijDalt = (m-1).toString()+j.toString();
                let ijDreta = M + (j+1).toString();
                let ijEsq = M + (j-1).toString();
                this.#avaluaCandidatsContigusEn_FILESEXTERNES_NOCANTONERES(IJ, ijDalt, ijDreta, ijEsq);
        }
        //IDENTIFICO LES CEL·LES DE LA COLUMNES DE L'ESQUERRA DEL TOT (MENYS EXTREMS COLUMNA)
        else if (j == 1 && i > 1 && i < m) {
            let ijDalt = (i-1).toString() + "1";
            let ijDreta = i.toString() + "2";
            let ijSota = (i+1).toString() + "1";      
            this.#avaluaCandidatsContigusEn_FILESEXTERNES_NOCANTONERES(IJ, ijDalt, ijDreta, ijSota);
        } 
        //IDENTIFICO NOMÉS COLUMNA DRETA DEL TOT (MENYS EXTREMS COLUMNA)
        else if (j == n && i > 1 && i < m) { 
            let ijDalt = (i-1).toString() + N;
            let ijEsq = i.toString() + (n-1).toString();
            let ijSota = (i+1).toString() + N;  
            this.#avaluaCandidatsContigusEn_FILESEXTERNES_NOCANTONERES(IJ, ijDalt, ijEsq, ijSota);
        }
    }




    //PRE: ids de les dues cel·les de taula a canviar (identificant fila i columna, indexat des de 1)
    //POST: les cel·les de la taula s'han canviat de lloc. Marcador objMRC (marcador en consola) 
    //      actualitzat i objMRCDOM també actualitzat (marcador en dom). Imprimim en consola les tres matrius informatives.
    //      Si l'usuar iha completat el repte substituim la taula per un missatge d'enhorabona.
    #intercanviaCelesDom(idCela1, idCela2) {
        //Agafem les cel·les a partir dels seus IDs
        const cela1 = document.getElementById(idCela1);
        const cela2 = document.getElementById(idCela2);
    
        //fem el swap de les cel·les
        const aux = cela1.innerHTML;
        cela1.innerHTML = cela2.innerHTML;
        cela2.innerHTML = aux;

        //actualitzem marcadors (tant en dom com en consola). 
        // Mostrem dades actualitzades en consola.
        this.#objMRC.generaMarcador();
        let correctes = mostraEstatMatrius(this.#objMC, this.#objMJ, this.#objMRC); //després de fer canvis mostrem els mateixos.
        var acabarJoc = this.#objMRCDOM.actualitza(correctes);

        if (acabarJoc) {
            let tFiJoc = new Date(); //variable global
            let diff_s = (tFiJoc - tIniJoc)/1000; //diferència en segons de la variable definida aqui en relacio a la varaibel global del main tIniJoc
            let diff_min = Math.floor(diff_s/60); //minuts enters
            let diff_sec = Math.floor(diff_s%60); //segons enters
            let diff_centes = Math.floor((tFiJoc - tIniJoc) % 1000 / 10);  //versio anterior feta per mi donava imprecisio per coma flotant. aquesta linia l'ha fet xat gpt. Versió anterior: let diff_centes = Math.floor((diff_s - diff_sec)*100);
            setTimeout(() => { //posem un timeout perquè pugui actualitzar-se el dom després d'acabar el puzzle (així veiem el resultat final de la resolució)
                if (diff_min > 0)
                    alert(`Joc completat! Enhorabona! Has tardat: ${diff_min} min ${diff_sec} s i ${diff_centes} centèssimes`);
                else
                    alert(`Joc completat! Enhorabona! Has tardat: ${diff_sec} s i ${diff_centes} centèssimes.`);
                
                this.#contenidorPare.innerHTML = "<h1>refresca la pantalla o canvia les files o el grau de dificultat per seguir jugant</h1>";
            },200);

        }
    }



    //MÈTODE PRIVAT:
    // 
    // funcio que afegeix una taula al dom amb totes les seves files, 
    //cel·les i identificadors (en forma fila columna indexat des de 1)
    //i els atributs src amb les imatges corresponents per a cada cel·la.
    #afegeixTaula() {
        let mj = this.#objMJ.getMatriu(); //n es dimensio del a matriu quadrada (n,n).
        let n = mj.length;
        
        // PER OBTENIR UNA TAULA AMB ids INDEXATS DES D'U I ELS VALORS
        // DE LA MATRIU DE JOC DISPOSATS EN IMATGES RECORREREM A LA MANIPULACIÓ DIRECTA DEL DOM
        let taula = document.createElement("table");
        this.#contenidorPare.appendChild(taula);

        //recorro files de la matriu verticalment (afegint un table row cada vegada)
        for (let i = 0; i < n; ++i) {
            let trFila = document.createElement("tr");
            taula.appendChild(trFila);
            for (let j = 0; j < n; ++j) { //recorro columnes horitzontalment
                
                //creo el table data de cada cel·la 
                // definint atribut id (v. commentA i commentB)
                let tdCela = document.createElement("td");
                let ijStr = (i+1).toString() + (j+1).toString(); //commentA: creo els indexos per als ids que identificaran cada table data (indexats des de 1)
                tdCela.setAttribute("id",ijStr);                 //commentB: afegeixo els indexos als atributs id: indispensable per poder fer servir la propietat target a l'eventListener que s'activarà en clicar damunt d'ells.
                
                //creo la imatge i defineixo el seu origen d'acord a les coordenades
                //de la mj (matriu de jugadors)
                let img = document.createElement("img");
                img.setAttribute("src", `img/${mj[i][j]}.gif`);
                tdCela.appendChild(img);

                trFila.appendChild(tdCela);
            }
        }
    }

    // MÈTODE PÚBLIC:el volem accessible des del main
    // 
    //Funció que destruieix el contingut de l'element contenidorPare
    //del qual farem penjar la tauola. Quan el destrueix retorna true,
    //només es farà quan tingui fills. En cas contrari no fa res i retorna false;
    destrueixTaula() {
        if (this.#contenidorPare.childElementCount > 0) {
            this.#contenidorPare.innerHTML = ""; //destrueix la taula que penja del contenidor pare
            return true;
        }
        return false;
    }






}

class marcadorDom {
    #marcadorDOM;  //el paragraf on posaré l'string del marcador al dom
    #mrc; //l'objecte de marcador (de la classe marcador)
    
    constructor(mrc) {
        this.#marcadorDOM = document.querySelector("#informacioMarcador > p:last-child");
        this.#mrc = mrc;
        this.#inicialitza();
    }

    //mostro l'estat del marcador al principi de la partida
    // (la proporciói d'encerts de l'usuari inicialment). Serà 
    // zero tal i com ho hem programat però fem una funció gnereal per si fem canvis 
    //l'estat inicial de la taula
    #inicialitza() {
        var [correctes, nreCeles] = this.#mrc.generaProporcioCompletats();
        this.#marcadorDOM.innerHTML = `<b>${correctes}</b>/${nreCeles} <i>(${(Math.round(100*correctes/nreCeles))} %)</i>`;
    }

    //funció que actualitza el nombre de respostes correctes en el dom
    //al valor que diu el paràmetre d'entrada.
    actualitza(correctes) {
        let nreCeles = this.#mrc._nreFiles*this.#mrc._nreFiles;
        this.#marcadorDOM.innerHTML = `<b>${correctes}</b>/${nreCeles} <i>(${(Math.round(100*correctes/nreCeles))} %)</i>`;
        if (correctes == nreCeles)
            return true;
        return false;

    }
}

