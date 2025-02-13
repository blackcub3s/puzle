# DESCRIPCIÓ GENERAL

Generació d'un puzle o trencaclosques amb programació orientada a objectes, herència i escoltadors d'esdeveniments. El programa inclou càlcul eficient de puntuacions i validació de moviments, amb 9 casos particulars de diferents programacions de comparació quan es clica una cel·la en funció de la posició d'aquesta (podeu veure-ho explicat a mà alçada dins la imatge [ilustracioComparacions.jpg](ilustracioComparacions.jpg)). S'han implementat funcions de swap entre elements del DOM i arrays subjacents. També incorpora selectors de files i dificultat per generar matrius inicials amb complexitat ajustada. Els escoltadors detecten la cel·la clicada a partir dels seus IDs, i la taula es genera dinàmicament dins l'article amb id "contenidorMatriu". 

# CASOS D'ÚS

 - **Dificultat** (no aplicable a 2x2):
    * Fàcil: Es pot resoldre movent les quatre peces de l'escaire inferior dret.
    * Difícil: la matriu es genera de forma aleatòria assgeurat que NO EXISTEIX cap peça inicialment colocada a la seva posició.

 - **Tamany matriu**: 2x2, 3x3 o 4x4.

# CONTEXT 

Aquest exercici és l'exercici més complex del tema 6 dedicat a escoltadors d'esdeveniments o funcions observadores (`addEventListeners`) de l'assignatura desenvolupament web en entorn client del cicle formatiu de grau superior de DAW. S'incrementa la dificultat en relació al que es demana l'assignatura afegint un menú que permet escollir un nombre variable de files a l'usuari (està acotat només a matrius 4x4 com a màxim perquè només tenim 16 imatges, però per com s'han programat les classes en JavaScript es pot escalar a un nombre N qualsevol de files i columnes).

Totes les matrius de 2x2 que inicialment generi el problama són resolubles. S'ha assegurat que les combinacions inicials ho siguin. Amb les matrius 3x3, en el seu grau de dificultat però, no s'ha implementat un sistema que asseguri si les matrius són resolubles o no, donada la seva complexitat (probablement es tracti d'un problema NP hard). Si no trobeu una solució per al puzzle cerqueu una altra combinació inicial i tracteu de resoldre'l: no us ofusqueu!

# DESPLEGAMENT

A Github pages. Feu click a la part superior dreta de la pàgina.


