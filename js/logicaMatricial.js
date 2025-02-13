/*AUTOR: 
    NOM: Santiago Sánchez Sans
    NIA: 12720004
*/
class matriuQuadrada {
    _nreFiles;            //nreFiles de les matrius del joc: forçosament entre 2 i 4 files
    _nreColumnes;         //serà igual a nreFiles (sempre serà una matriu quadrada)
    _matriu;              //la matriu quadrada (inicialment el constructor la posarà tota a 0)

    //inicialitzo una matriu quadrada de nreFiles files i poso a null els valors interns. L'heretarem en les subclasses
    constructor(nreFiles) {
        this._nreFiles = nreFiles;
        this._nreColumnes = nreFiles;
        this._matriu = Array.from({ length: nreFiles }, () => Array(this._nreColumnes).fill(0));
    }

    getNreFiles() {
        return this._nreFiles;
    }

    getNreColumnes() {
        return this._nreColumnes;
    }

    getMatriu() {
        return this._matriu;
    }

    //NOTA: Aquesta funció la creem perquè imprimint amb console.log() la matriu de les subclasses
    //      no es mostren els canvis que produeix el mètode swapCeles de la subclasse matriuJugador (no entenc bé el motiu)
    //      però no els mostrava ni dins de la funció swapCeles ni fora de la classe.
    imprimeixMatriu() {
        for (let i = 0; i < this._nreFiles; i++) {
            let fila = ''; // Inicialitzem una cadena per acumular els elements de la fila
            for (let j = 0; j < this._nreColumnes - 1; j++) {
                fila += this._matriu[i][j]  + '\t'; 
            }
            fila += this._matriu[i][this._nreColumnes - 1]; //últim element no té tabulador
            console.log(fila);
        }
    }



}

class matriuCorrecta extends matriuQuadrada {
      
    
    //Constructor de la matriu correcta (heretarà de la superclasse)
    //que és a la que el jugador voldrà arribar quan acabi el joc, per completar-lo
    constructor(nreFiles) {
        super(nreFiles);  
        this.emplenaMatriuCorrecta(); //emplenara _matriu que s'hereta de la superclasse
    }



    //PRE:  - nreFiles passat com a paràmetre objecte (entre 2 i 4). 
    //POST: - es retorrna un array (una matriu quadrada) de dos dimensions amb nreFiles * nreFiles cel·les, 
    //        començant amb 1,2,3,..., fins a (nreFiles * 2) - 1 a la penúltima cel·la
    //        i valor 0 a l'última.
    emplenaMatriuCorrecta() {
        let k = 1;
        
        for (let i = 0; i < this._nreFiles; ++i) {
            let fila = [];
            for (let j = 0; j < this._nreColumnes; ++j) {
                this._matriu[i][j] = k; //afegim els indexos k a cada array que representarà una fila. (Fixeu-vos que hem HERETAT _matriu de la superclasse matriuQuadrada)
                ++k;
            }
        }
        this._matriu[this._nreFiles - 1][this._nreColumnes - 1] = 0; //canviem últim element de nou per 0
    }


}

class matriuJugador extends matriuQuadrada {
    
    #dificultat;
    constructor(nreFiles, dificultat) {
        super(nreFiles);  
        this.#dificultat = dificultat;  //string: facil o dificil. Sera d'aplicacio a matrius 3x3 o 4x4 només
        this.#emplenaMatriuJugador();
    }


    //PRE:  - nreFiles: enter igual a 2.
    //      - _matriu: matriu del jugador, un array amb 2x2 elements (matriu 2x2)
    //                  és passada com a paràmetre d'objecte. tots els valors inicialitzats a 0.
    //POST: _matriu contindrà els valors 0,1,2,3 arranjats aleatòriament SEMPRE de forma 
    //      resoluble, es a dir en qualsevol de les tres configuracions
    //      de matriu de jugador (_matriu) següents:
    //              3 1       0 3       2 0
    //              0 2       2 1       1 3      
    //ANOTACIÓ: Aquesta funció evita generar aleatòriament la matriu 2x2 
    //          perquè fàcilment ens crea combinacions irresolubles, 
    //          que volem evitar. Per exemple qualsevol de les tres 
    //          matrius NO seria resoluble en el puzzle:
    //
    //              1 0       1 3       1 2
    //              2 3       2 0       0 3   

    //EXPLICACIÓ:
    //
    //una matriu correcta 2x2 serà així:
    //      1 2
    //      3 0
    // A partir d'ella podem buscar tres rotacions EN SENTIT HORARI que permetràn
    // que la matriu 2x2 sigui resoluble, convertible ràpidament en una matriu correcta
    // a través del dom amb les restriccions imposades pel joc.
    // 
    // Aquestes rotacions les podem disposar en un array unidimensional, així:
    //
    // [3,1,0,2] <-->  3   1 | [0,3,2,1] <-->  0   3 | [2,0,1,3] <-->  2   0
    //                 0   2 |                 2   1 |                 1   3
    //
    // Cada subarray unidimensional el posarem dins d'un array (arrValorsResolubles) que ens 
    // permetrà generar MATRIUS RESOLUBLES de tamany 2x2 dins de this._matriu (la matriu
    // del jugador) així:
    #emplenaMatriuJUGADOR2x2() {
        let arrValorsResolubles = [[3,1,0,2], [0,3,2,1], [2,0,1,3]];
        let l = Math.floor(Math.random()*arrValorsResolubles.length); //l seleccionarà aleatòriament una de les tres matrius amb configuració vàlidad per introduir-la dins _matriu
        let k = 0;
        for (let i = 0; i < this._nreFiles; ++i) {
            for (let j = 0; j < this._nreColumnes; ++j) {
                this._matriu[i][j] = arrValorsResolubles[l][k]; //afegim una de les tres configuracions dins la matriu
                ++k;
            }
        }
    }

    //PRE:  - nreFiles: enter, 3 o 4.
    //      - _matriu: array amb dues dimensions amb amb nreFiles * nreFiles cel·les, 
    //                 és passada com a paràmetre d'objecte. tots els valors inicialitzats a zero.
    //      - dificultat: si és  "dificil" --> es generarà aleatoriament sens ecap cel·la ben colocada a la seva posicio
    //                    si és "facil" -----> generarem una matriu amb totes les cel·les colocades al seu lloc, menys una cel·la permutada amb una altra.
    // POST: - _matriu contindrà ara tots els valors enters en la serie 0,1,2, ...(nreFiles * 2) - 1 
    //        BARREJATS ALEATÒRIAMENT dins la matriu.
    #emplenaMatriuJUGADOR_NxN() {
        let k = 0;
        let arr;
        if (this.#dificultat == "dificil") {  //cas dificil (array plenament aleatoria sense elements en posicions correctes)
            //fem l'array plenament aleatoria
            arr = generaArrayAleatoria(this._nreFiles);
            //afegimt l'array a l'objecte matriu.
            for (let i = 0; i < this._nreFiles; ++i) {
                for (let j = 0; j < this._nreColumnes; ++j) {
                    this._matriu[i][j] = arr[k]; //afegim els nombres
                    ++k;
                }
            }        
        
        }
        else if (this.#dificultat == "facil") //cas en que es facil (resoldrem la matriu tocant nomes la submatriu 2x2 inferior dreta de la matriu de jugador)
            this.#generaArraySENZILLA();
        


    }
    //PRE:  - nreFiles: enter que ha d'estar compresès entre 2 i 4 (ambdós inclosos).
    //      - _matriu: array amb dues dimensions amb amb nreFiles * nreFiles cel·les, 
    //                 és passada com a paràmetre d'objecte. tots els valors inicialitzats a zero.
    //      - dificultat: només aplica a matrius 3x3 i 4x4 (veure funcio emplenaMatriuJUGADOR_NxN)
    // POST: - _matriu contindrà ara tots els valors enters en la serie 0,1,2, ...(nreFiles * 2) - 1 
    //        BARREJATS ALEATÒRIAMENT dins la matriu sense cap element col·locat a la seva posició correcta. O bé
    //        elements ORDENATS creixentment i decreixentment (depenent de si dificultat == "dificil")
    //        o facil. Vegeu
    //     
    #emplenaMatriuJugador() {
        if (this._nreFiles == 2)
            this.#emplenaMatriuJUGADOR2x2();
        else
            this.#emplenaMatriuJUGADOR_NxN();
    }

    //PRE: - ij: string amb dues posicions (coordenades de la matriu, indexades des de 1 no zero) del td que cliquem
    //     - IJ: el id del td on esperarriem que que hi hagi un zero!    
    //POST:  els elements de #_matriu de les posicions ij i IJ quedaran swapejats (intercanviats) si i només
    //       si es dóna una condició: l'element IJ és un zero. Si es fa el swap retorna true; false altrament.       
    swapCeles(ij,IJ) {
        let [i, j] = ij.split('').map(Number);
        let [I, J] = IJ.split('').map(Number);

        let c1 = this._matriu[i-1][j-1];
        let c2 = this._matriu[I-1][J-1];

        if (c2 == 0) { 
            this._matriu[i-1][j-1] = c2;
            this._matriu[I-1][J-1] = c1;
            return true;
        }
        return false;
    }



    //PRE: nreElements: valor enter que indica el nombre de files de la matriu quadrada del jugador
    //POST: la matriu de jugador this._matriu sera igual que la matriuCorrecta però amb la
    //      submatriu 2x2 més inferior a la dreta de la matriu de jugador amb els elements 
    //      de la matriu correcta rotats aleatoriament (no permutats). Aixi la matriu jugaedor resoluble
    //      ràpidament només donant voletes a cuatre elements que roten entre ells..
    //
    //      LA MATRIU CORRECTA ORIGINAL               EXEMPLE D'UNA MATRIU DE JUGADOR FACILMENT RESOLUBLE
    //      [[1,2,3],                                   [[1,2,3],
    //       [4,5,6],               ----------->         [4,8,5], 
    //       [7,8,0]]                                    [7,0,6]]
    //          
    //
    #generaArraySENZILLA() {
        let mc = new matriuCorrecta(this._nreFiles);
        let arrCorr = mc.getMatriu(); //totes les arrays correctes són iguals.
        let n = this._nreFiles; //que es igual al nombre de columnes pq es matriu quadrada
                
        //Amem a recrdar a les variacions en cercle que feiem en la matriu 2x2 del jugador
        //en la funció #emplenaMatriuJUGADOR2x2 (vegeu codi i comentaris en aquest mateix fitxer,
        //per entrendre el cas particular del que ve acontinuació):

        //ARA PODEM FER EL MATEIX que tenint en compte que aquí en comptes de treballar 
        //amb nombres treballarem amb variables. Les tres possibilitats de submatriu de 
        //jugador 2x2 resoluble fent només canvis en la mateixa submatriu són així:
        //
        //         [c,a,d,b] <-->  c   a | [d,c,b,a] >-->  d   c | [b,d,a,c] <-->  b   d
        //                         d   b |                 b   a |                 a   c
        //
        // En aquest cas això ho aplicarem només a la submatriu 2x2 de la part més inferior i 
        // més a la dreta (d'aqui venen a,b,c,d).

        //traiem de la submatriu inferior a la dreta els valors de la matriu correcta:

        let [a,b,c,d] = [arrCorr[n-2][n-2],   //a: posicio en diagonal al zero (damunt a l'esquerra del zero).                    
                         arrCorr[n-2][n-1],   //b: posicio inmediatament superior al zero.
                         arrCorr[n-1][n-2],   //c: posicio a l'esquerra  del zero.
                         arrCorr[n-1][n-1]];  //d: el zero mateix, el "FORAT" de la taula (escaire inferior dret).
        
        //prenem les tres possibilitats existents (3 submatrius possibles)
        let arrValorsResolubles = [[c,a,d,b], [d,c,b,a], [b,d,a,c]];

        //I sel·leccionem aleatòriament una de les tres submatrius possibles
        let l = Math.floor(Math.random()*arrValorsResolubles.length); 
        
        //desempaquetem la submatriu en un aray unidimensional (reaprofitem variables previes)
        //i assignem
        [a, b, c, d] = arrValorsResolubles[l];
        arrCorr[n-2][n-2] = a;
        arrCorr[n-2][n-1] = b;
        arrCorr[n-1][n-2] = c;
        arrCorr[n-1][n-1] = d;

        this._matriu = arrCorr; //POSEM A LA MATIRU DEL JUGADOR l'array correcta modificada per ser quasi correcta.
    }
}


class marcador extends matriuQuadrada {
    #mCorr;
    #mJug;

    //Cal passar-hi instàncies d'objectes matriu 
    //correcta i matriuJugador (de les mateixes dimensions per suposat)
    constructor(mCorr, mJug) {
        super(mCorr.getNreFiles());
        this.#mCorr = mCorr.getMatriu();    //la matriu correcta
        this.#mJug = mJug.getMatriu();      //la matriu del jugador
        this.generaMarcador();              //ja generem un marcador res més començar
    }

    //Aquesta funció emplena la matriu de marcador, per defecte amb tot zeros
    // (amb 1 si s'escau)
    generaMarcador() {
        for (let i = 0; i < this._nreFiles; ++i) {
            for (let j = 0; j < this._nreColumnes; ++j) {
                if (this.#mCorr[i][j] == this.#mJug[i][j]) { //actualitzem els que hem trobat correctes
                    this._matriu[i][j] = 1; //utilitzo la matriu heredada inicialitzada a zero.
                }
                else if (this.#mCorr[i][j] != this.#mJug[i][j]) { //els que s'han tret d'una posició correcta també cal actualitzar-los
                    this._matriu[i][j] = 0; //utilitzo la matriu heredada inicialitzada a zero.
                }
            }
        }
    }

    //PRE: definits paràmetres de nombre de files i nombre de columnes. Tenim definida mCorr i mJug.
    //POST: un array amb el nombre de caselles correctament posades a la mJug
    //      en relació a la mCorr com a primer element (numerador de la proporció)
    //      i el nombre d'elements totals que té la matriu del jugador (denominador de la proporció).
    generaProporcioCompletats() {
        let numerador = 0;
        let denominador = this._nreFiles * this._nreColumnes;
        for (let i = 0; i < this._nreFiles; ++i) {
            for (let j = 0; j < this._nreColumnes; ++j) {
                if (this.#mCorr[i][j] == this.#mJug[i][j]) {
                    ++numerador;
                }
            }
        }
        return [numerador, denominador];   
    }


} 


/*
class rellotge {

}
*/

