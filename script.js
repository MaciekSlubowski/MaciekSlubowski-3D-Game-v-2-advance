//world constatnt
var dag = Math.PI/180;
var PressUp = 0;
var MouseX = 0;
var MouseY = 0;
var PressSprint = 1;
var hud = document.getElementById("hud");

// --- ZMIENNE DLA PRZEDMIOTÓW ---
let coinsCount = 0;
let keysCount = 0;
let sprintTimer = null;
let sprintTimeLeft = 1000;

// --- NOWE ZMIENNE DLA GRAWITACJI ---
var vy = 0; // Prędkość pionowa (velocity Y)
var gravity = 0.3; // Siła grawitacji

function player(x,y,z,rx,ry){
	this.x = x;
	this.y = y;
	this.z = z;
	this.rx = rx;
	this.ry = ry;
}

//Zdefiniowanew poziomy
var mapArray = new Array();
var coinsArray = new Array();
var finishArray = new Array();
var startArray = new Array();
var keysArray = new Array();

function update() {
    // 1. Obliczanie kierunku ruchu z mnożnikiem prędkości (* PressSprint)
    let dx = (Math.cos(pawn.ry * dag) * (PressRight - PressLeft) - 
              Math.sin(pawn.ry * dag) * (PressForward - PressBack)) * PressSprint;
    let dz = (- Math.sin(pawn.ry * dag) * (PressRight - PressLeft) -
              Math.cos(pawn.ry * dag) * (PressForward - PressBack)) * PressSprint;
    
    // 2. Obsługa myszki
    let drx = MouseY / 4;
    let dry = -MouseX / 4;
    MouseX = 0;
    MouseY = 0;

    // 3. Sprawdzanie KOLIZJI ze ścianami
    let nextX = pawn.x + dx;
    let nextZ = pawn.z + dz;

    if (!checkCollision(nextX, pawn.z)) {
        pawn.x = nextX;
    }
    if (!checkCollision(pawn.x, nextZ)) {
        pawn.z = nextZ;
    }

    // 4. GRAWITACJA I SKAKANIE
    if (PressUp === 1 && pawn.y >= 0) {
        vy = -7; // Siła skoku
    }

    vy = vy + gravity;
    let nextY = pawn.y + vy;

    if (nextY >= 0) {
        nextY = 0;
        vy = 0;
    }
    pawn.y = nextY;

    // 5. Obrót kamery
    if (lock) {
        pawn.rx = Math.max(-90, Math.min(90, pawn.rx + drx));
        pawn.ry = pawn.ry + dry;
    }
    
    // 6. Aktualizacja CSS świata - PRZYWRÓCONE 600px
    world.style.transform = "translateZ(700px)" + 
                            "rotateX(" + (-pawn.rx) + "deg)" +
                            "rotateY(" + (-pawn.ry) + "deg)" +
                            "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";

    // 7. Animacja wirowania monet - PRZYWRÓCONE 600 i 400
    if (typeof coins !== "undefined") {
        for (let i = 0; i < coins.length; i++) {
            if (coins[i][0] !== 1000000) { 
                coins[i][4] += 3;
                let coinElement = document.getElementById("coin" + i);
                if (coinElement) {
                    coinElement.style.transform = 
                        "translate3d(" + 
                            (600 - coins[i][6]/2 + coins[i][0]) + "px," + 
                            (400 - coins[i][7]/2 + coins[i][1]) + "px," + 
                            coins[i][2] + "px)" +
                            "rotateX(" + coins[i][3] + "deg)" + 
                            "rotateY(" + coins[i][4] + "deg)" +
                            "rotateZ(" + coins[i][5] + "deg)";
                }
            }
        }
    }

    if (typeof checkCollections === "function") {
        checkCollections();
    }

	// 8. Animacja wirowania portalu - PRZYWRÓCONE 600 i 400
    if (typeof finish !== "undefined") {
        finish[0][5] += 3;
        let portalElement = document.getElementById("portal0");
        if (portalElement) {
            portalElement.style.transform = 
                "translate3d(" + 
                    (600 - finish[0][6]/2 + finish[0][0]) + "px," + 
                    (400 - finish[0][7]/2 + finish[0][1]) + "px," + 
                    finish[0][2] + "px)" +
                    "rotateX(" + finish[0][3] + "deg)" + 
                    "rotateY(" + finish[0][4] + "deg)" +
                    "rotateZ(" + finish[0][5] + "deg)";
        }
    }
}




//LEvel 2


var map = new Array();
var coins = new Array();
var finish = new Array();
var start = new Array();  


//variables for movement
var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp = 0;
var MouseX = 0;
var MouseY = 0;
var lock = false;
var canlock = false;

//link variable to container
var container = document.getElementById("container");
//if the mouse ir pressed
container.onclick = function(){
	if (canlock) container.requestPointerLock();
};
		
//if the key is pressed
document.addEventListener("keydown",(event) =>{
    if (event.repeat) return; // Zabezpieczenie przed spamowaniem klawisza

    if (event.key == "w") PressForward = 1;
    if (event.key == "s") PressBack = 1;
    if (event.key == "d") PressRight = 1;
    if (event.key == "a") PressLeft = 1;
    if (event.key == " ") PressUp = 1;
    
// NOWA LOGIKA SPRINTU Z PŁYNNYMI MILISEKUNDAMI (1 sekunda = 1 moneta)
// NOWA LOGIKA SPRINTU Z PAMIĘCIĄ MILISEKUND
    if (event.key == "q") {
        if (coinsCount > 0) {
            PressSprint = 5; 
            
            // Wyświetlamy aktualny, zapamiętany czas
            showInGameMessage("fast speed<br><span id='sprintCountdown' style='font-size: 80px; color: #fff;'>" + (sprintTimeLeft / 1000).toFixed(2) + "</span>", "#00ffff", 999999); 

            if (sprintTimer === null) {
                sprintTimer = setInterval(() => {
                    sprintTimeLeft -= 10; 
                    
                    if (sprintTimeLeft > 0) {
                        let countdownUI = document.getElementById("sprintCountdown");
                        if (countdownUI) countdownUI.innerText = (sprintTimeLeft / 1000).toFixed(2);
                    } else {
                        // Czas minął - ZABIERAMY MONETĘ
                        coinsCount--; 
                        
                        let ui = document.getElementById("coinCountUI");
                        if (ui) ui.innerText = coinsCount;

                        if (coinsCount > 0) {
                            // Restartujemy odliczanie dla KOLEJNEJ monety
                            sprintTimeLeft = 1000;
                            let countdownUI = document.getElementById("sprintCountdown");
                            if (countdownUI) countdownUI.innerText = (sprintTimeLeft / 1000).toFixed(2);
                        } else {
                            // Koniec monet! Zatrzymujemy sprinta i resetujemy czas na przyszłość
                            PressSprint = 1; 
                            clearInterval(sprintTimer); 
                            sprintTimer = null;
                            sprintTimeLeft = 1000; // Reset, żeby po zebraniu monety zacząć od pełnej sekundy
                            showInGameMessage("OUT OF COINS!", "#ff0000", 3000);
                        }
                    }
                }, 10); 
            }
        } else {
            showInGameMessage("NO COINS FOR SPEED!", "#ff0000", 2000);
        }
    }
})

//locked mouse listener 
document.addEventListener("pointerlockchange", (event) => {
	lock = !lock;
})

//if the key is released
document.addEventListener("keyup", (event) =>{
    if (event.key == "w") PressForward = 0;
    if (event.key == "s") PressBack = 0;
    if (event.key == "d") PressRight = 0;
    if (event.key == "a") PressLeft = 0;
    if (event.key == " ") PressUp = 0;
    
    // ZATRZYMANIE SPRINTU I POBIERANIA MONET
if (event.key == "q") {
        PressSprint = 1; // Powrót do normalnej prędkości
        
        // Zatrzymujemy odliczanie
        if (sprintTimer !== null) {
            clearInterval(sprintTimer);
            sprintTimer = null;
        }
        
        // --- NOWOŚĆ: Ukrywamy napis fast speed NATYCHMIAST po puszczeniu Q ---
        let msgBox = document.getElementById("gameMessages");
        if (msgBox && msgBox.innerHTML.includes("sprintCountdown")) {
            msgBox.style.display = "none";
        }
    }
})

//mouse movement listener
document.addEventListener("mousemove", (event) =>{
	MouseX = event.movementX;
	MouseY = event.movementY;
})

// Startujesz w bezpiecznym miejscu
var pawn = new player(0, 0, -1150, 0, 180);

var world = document.getElementById("world");
function coorTransform(x0, y0, z0, rxc, ryc, rzc) {
    let x1 =  x0;
    let y1 =  y0*Math.cos(rxc*dag) + z0*Math.sin(rxc*dag);
    let z1 = -y0*Math.sin(rxc*dag) + z0*Math.cos(rxc*dag);
    let x2 =  x1*Math.cos(ryc*dag) - z1*Math.sin(ryc*dag);
    let y2 =  y1;
    let z2 =  x1*Math.sin(ryc*dag) + z1*Math.cos(ryc*dag);
    let x3 =  x2*Math.cos(rzc*dag) + y2*Math.sin(rzc*dag);
    let y3 = -x2*Math.sin(rzc*dag) + y2*Math.cos(rzc*dag);
    let z3 =  z2;
    return [x3, y3, z3];
}

function coorReTransform(x3, y3, z3, rxc, ryc, rzc) {
    let x2 =  x3*Math.cos(rzc*dag) - y3*Math.sin(rzc*dag);
    let y2 =  x3*Math.sin(rzc*dag) + y3*Math.cos(rzc*dag);
    let z2 =  z3;
    let x1 =  x2*Math.cos(ryc*dag) + z2*Math.sin(ryc*dag);
    let y1 =  y2;
    let z1 = -x2*Math.sin(ryc*dag) + z2*Math.cos(ryc*dag);
    let x0 =  x1;
    let y0 =  y1*Math.cos(rxc*dag) - z1*Math.sin(rxc*dag);
    let z0 =  y1*Math.sin(rxc*dag) + z1*Math.cos(rxc*dag);
    return [x0, y0, z0];
}


// --- OSTATECZNA KOLIZJA: WYMUSZA SKAKANIE, ALE LIKWIDUJE HACZENIE ---
function checkCollision(newX, newZ) {
    let playerRadius = 30;
    let wallThickness = 20;

    for (let i = 0; i < map.length; i++) {
        let wall = map[i];
        // Wyjątki - ignorujemy sufit, podłogę, nadproża i drzwi
        if (wall[3] === 90) continue; 
        if (wall[1] < -40) continue;

        let wX = wall[0];
        let wY = wall[1];
        let wZ = wall[2];
        
        let rx = wall[3];
        let ry = wall[4];
        let rz = wall[5];
        let width = wall[6];
        let height = wall[7]; // Pobieramy wysokość ściany[cite: 6, 2]

        // 1. Sprawdzamy układ dla NOWEJ pozycji (gdzie gracz chce iść)
        let dx = newX - wX;
        let dy = pawn.y - wY;
        let dz = newZ - wZ;
        let localCoords = coorReTransform(dx, dy, dz, rx, ry, rz);
        let localX = localCoords[0];
        let localY = localCoords[1];
        let localZ = localCoords[2];

        let localHead = localY; 
        let localFeet = localY + 100; // Ciało od głowy do stóp[cite: 6]

        // Standardowy, sztywny margines 5 - musisz skakać, żeby wejść na przeszkodę!
        let newCollides = (localX + playerRadius > -width / 2 && 
                           localX - playerRadius < width / 2 &&
                           localZ + playerRadius > -wallThickness && 
                           localZ - playerRadius < wallThickness &&
                           localFeet > -height / 2 + 5 &&  
                           localHead < height / 2 - 5);

        // Jeśli nowa pozycja wykrywa uderzenie w ścianę:
        if (newCollides) {
            
            // 2. SYSTEM ANTI-TRAP
            // Wyliczamy, czy STARA pozycja (zanim gracz się ruszył) JUŻ była w ścianie.
            let oldDx = pawn.x - wX;
            let oldDz = pawn.z - wZ;
            let oldLocalCoords = coorReTransform(oldDx, dy, oldDz, rx, ry, rz);
            let oldLocalX = oldLocalCoords[0];
            let oldLocalZ = oldLocalCoords[2];

            let oldCollides = (oldLocalX + playerRadius > -width / 2 && 
                               oldLocalX - playerRadius < width / 2 &&
                               oldLocalZ + playerRadius > -wallThickness && 
                               oldLocalZ - playerRadius < wallThickness &&
                               localFeet > -height / 2 + 5 &&  
                               localHead < height / 2 - 5);

            if (oldCollides) {
                // Gracz "wpadł" do niewidzialnego pola ściany spadając z platformy.
                // Ignorujemy kolizję i pozwalamy mu gładko odejść, aby nie utknął!
                continue;
            }

            // Normalne zderzenie idąc po ziemi - blokujemy ruch!
            return true; 
        }
    }
    return false;
}


function update() {
    // 1. Obliczanie kierunku ruchu z mnożnikiem prędkości (* PressSprint)
    let dx = (Math.cos(pawn.ry * dag) * (PressRight - PressLeft) - 
              Math.sin(pawn.ry * dag) * (PressForward - PressBack)) * PressSprint;
    let dz = (- Math.sin(pawn.ry * dag) * (PressRight - PressLeft) -
              Math.cos(pawn.ry * dag) * (PressForward - PressBack)) * PressSprint;
    
    // 2. Obsługa myszki
    let drx = MouseY / 4;
    let dry = -MouseX / 4;
    MouseX = 0;
    MouseY = 0;

    // 3. Sprawdzanie KOLIZJI ze ścianami
    let nextX = pawn.x + dx;
    let nextZ = pawn.z + dz;

    if (!checkCollision(nextX, pawn.z)) {
        pawn.x = nextX;
    }
    if (!checkCollision(pawn.x, nextZ)) {
        pawn.z = nextZ;
    }

// 4. GRAWITACJA I SKAKANIE
    let groundLevel = 0; // Domyślna, główna podłoga[cite: 6]

    // Sprawdzanie Platformy 1 (lewy górny róg) zdefiniowanej w mapArray[0][cite: 2]
    if (pawn.x > -500 && pawn.x < -300 && pawn.z > -500 && pawn.z < -300) {
        groundLevel = -20; // Różnica między podłogą (100) a platformą (80)
    }
    // Sprawdzanie Platformy 2 (prawy dolny róg) zdefiniowanej w mapArray[0][cite: 2]
    else if (pawn.x > 300 && pawn.x < 500 && pawn.z > 300 && pawn.z < 500) {
        groundLevel = -20; 
    }

    // Skok możliwy tylko wtedy, gdy stoimy na aktualnym groundLevel
    if (PressUp === 1 && pawn.y >= groundLevel) {
        vy = -7; // Siła skoku[cite: 6]
    }

    vy = vy + gravity;
    let nextY = pawn.y + vy;

    // Zabezpieczenie przed wpadnięciem pod odpowiednią podłogę
    if (nextY >= groundLevel) {
        nextY = groundLevel;
        vy = 0;
    }
    pawn.y = nextY;

    // Zabezpieczenie przed wpadnięciem pod podłogę
    if (nextY >= 0) {
        nextY = 0;
        vy = 0;
    }
    pawn.y = nextY;

    // 5. Obrót kamery (zabezpieczony przed fikołkami)
    if (lock) {
        // Blokada obrotu góra/dół do kąta 90 stopni
        pawn.rx = Math.max(-90, Math.min(90, pawn.rx + drx));
        pawn.ry = pawn.ry + dry;
    }
    
    // 6. Aktualizacja CSS świata
    world.style.transform = "translateZ(600px)" + 
                            "rotateX(" + (-pawn.rx) + "deg)" +
                            "rotateY(" + (-pawn.ry) + "deg)" +
                            "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";

    // 7. Animacja wirowania monet
    if (typeof coins !== "undefined") {
        for (let i = 0; i < coins.length; i++) {
            if (coins[i][0] !== 1000000) { 
                coins[i][4] += 3; // Szybkość obrotu
                let coinElement = document.getElementById("coin" + i);
                if (coinElement) {
                    coinElement.style.transform = 
                        "translate3d(" + 
                            (600 - coins[i][6]/2 + coins[i][0]) + "px," + 
                            (400 - coins[i][7]/2 + coins[i][1]) + "px," + 
                            coins[i][2] + "px)" +
                            "rotateX(" + coins[i][3] + "deg)" + 
                            "rotateY(" + coins[i][4] + "deg)" +
                            "rotateZ(" + coins[i][5] + "deg)";
                }
            }
        }
    }

    // 8. Sprawdzanie zbierania przedmiotów (jeśli posiadasz tę funkcję)
    if (typeof checkCollections === "function") {
        checkCollections();
    }
	// 8. Animacja wirowania portalu
    if (typeof finish !== "undefined") {
        finish[0][5] += 3; // Szybkość wirowania portalu (zwiększyłem do 3)
        let portalElement = document.getElementById("portal0");
        if (portalElement) {
            portalElement.style.transform = 
                "translate3d(" + 
                    (600 - finish[0][6]/2 + finish[0][0]) + "px," + 
                    (400 - finish[0][7]/2 + finish[0][1]) + "px," + 
                    finish[0][2] + "px)" +
                    "rotateX(" + finish[0][3] + "deg)" + 
                    "rotateY(" + finish[0][4] + "deg)" +
                    "rotateZ(" + finish[0][5] + "deg)";
        }
    }
} // <-- To jest klamra zamykająca funkcję update()


function CreateNewWorld(map){
	CreateSquares(map,"map");
}

// OSTATECZNA WERSJA - Matematycznie wyliczone przesunięcie i skala (100% 100%)
// TUTAJ JEST NAPRAWIONA FUNKCJA - IDEALNIE DOPASOWANA KRAWĘDŹ Z OBRAZKA
function CreateSquares(squares, string){
	for (let i = 0; i< squares.length; i++){
		
		let newElement = document.createElement("div");
		newElement.className = string + " square";
		newElement.id = string + i;
		newElement.style.width = squares[i][6] + "px";
		newElement.style.height = squares[i][7] + "px";

		newElement.style.transform = 
					"translate3d(" + 
						(600 - squares[i][6]/2 + squares[i][0]) + "px," + 
						(400 - squares[i][7]/2 + squares[i][1]) + "px," + 
						squares[i][2] + "px)" +
						"rotateX(" + squares[i][3] + "deg)" + 
						"rotateY(" + squares[i][4] + "deg)" + 
						"rotateZ(" + squares[i][5] + "deg)";

		if (string === "coin") {
			newElement.style.transformStyle = "preserve-3d"; 
			newElement.style.backgroundColor = "transparent";
			
			for (let j = -2; j <= 2; j += 0.5) { 
				let layer = document.createElement("div");
				layer.className = "coin-layer";
				
				// NAKŁADAMY OBRAZEK NA KAŻDĄ WARSTWĘ - krawędź dopasuje się do przezroczystości!
				layer.style.backgroundImage = "url(" + squares[i][8] + ")";
				
				if (j === -2) { 
					// SKRAJNY TYŁ
					layer.style.transform = "translateZ(" + j + "px) rotateY(180deg)";
				} else if (j === 2) { 
					// SKRAJNY PRZÓD
					layer.style.transform = "translateZ(" + j + "px)";
				} else {
					// ŚRODEK (KRAWĘDŹ)
					layer.style.transform = "translateZ(" + j + "px)";
					// Przyciemniamy obrazek w środku, żeby wyglądał jak boczna krawędź
					layer.style.filter = "brightness(0.35)"; 
					layer.style.backgroundColor = "transparent"; // Upewniamy się, że nie ma koloru tła
				}
				
				newElement.appendChild(layer);
			}
		} else { // Dla zwykłych ścian i kluczy
			newElement.style.background = squares[i][8];
			newElement.style.backgroundImage = "url(" + squares[i][8] + ")";
			newElement.style.opacity = squares[i][9];
			newElement.style.borderRadius = squares[i][9] +"%";
		}
		
		world.append(newElement);
	}
}



// --- LOGIKA GENEROWANIA PRZEDMIOTÓW ---
function CreateCollectibles(itemsArray, className) {
    for (let i = 0; i < itemsArray.length; ++i) {
        let newElement = document.createElement("div");
        newElement.className = "square " + className;
        newElement.id = className + i;
        newElement.style.width = itemsArray[i][6] + "px";
        newElement.style.height = itemsArray[i][7] + "px";
        newElement.style.background = itemsArray[i][8];
        newElement.style.borderRadius = "50%"; // okrągły kształt
        
        newElement.style.transform = 
        "translate3d(" + 
        (600 - itemsArray[i][6]/2 + itemsArray[i][0]) + "px," + 
        (400 - itemsArray[i][7]/2 + itemsArray[i][1]) + "px," + 
        itemsArray[i][2] + "px)" +
        "rotateX(" + itemsArray[i][3] + "deg)" +
        "rotateY(" + itemsArray[i][4] + "deg)" +
        "rotateZ(" + itemsArray[i][5] + "deg)";

        world.append(newElement);
    }
}

// --- LOGIKA ZBIERANIA (KOLIZJI) ---
function checkCollections() {
    let radius = 60; // Odległość podnoszenia

    // Zbieranie monet
    for (let i = 0; i < coins.length; i++) {
        if (coins[i][2] !== 1000000) { 
            let dx = pawn.x - coins[i][0];
            // (Jeśli usunąłeś oś Y zgodnie z poprzednią radą, zostaw samo X i Z)
            let dz = pawn.z - coins[i][2]; 
            let dist = Math.sqrt(dx*dx + dz*dz); 

            if (dist < radius) {
                coins[i][2] = 1000000; // Przesuń poza mapę[cite: 6]
                
                // Bezpieczne ukrywanie elementu monety[cite: 6]
                let coinElement = document.getElementById("coin" + i);
                if (coinElement) {
                    coinElement.style.display = "none";
                }
                
                // --- NAPRAWA: ODTWARZANIE DŹWIĘKU TUTAJ ---
                if (typeof coinCollectSound !== 'undefined') {
                    coinCollectSound.currentTime = 0;
                    coinCollectSound.play();
                }
                // ------------------------------------------

                coinsCount++;
                
                // Aktualizacja UI[cite: 6]
                let ui = document.getElementById("coinCountUI");
                if (ui) {
                    ui.innerText = coinsCount;
                }
                
                // --- LOGIKA KOMUNIKATÓW ---[cite: 6]
                if (typeof showInGameMessage === "function") {
                    if (coinsCount === coins.length) {
                        showInGameMessage("Great! All coins are collected!", "#00ff00", 5000); 
                    } else {
                        if (PressSprint === 5) {
                            showInGameMessage("C O I N", "#ffff00", 600); 
                        } else {
                            showInGameMessage("C O I N", "#ffff00", 800); 
                        }
                    }
                }
            }
        }
    }

// Zbieranie kluczy
    for (let i = 0; i < keys.length; i++) {
        if (keys[i][2] !== 1000000) {
            let dx = pawn.x - keys[i][0];
            let dy = pawn.y - keys[i][1];
            let dz = pawn.z - keys[i][2];
            let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < radius) {
                keys[i][2] = 1000000;
                
                // Bezpieczne ukrywanie elementu klucza
                let keyElement = document.getElementById("key" + i);
                if (keyElement) {
                    keyElement.style.display = "none";
                }
                
		keysCount++;
                let ui = document.getElementById("keyCountUI");
                // ZMIANA: Doklejamy " / " oraz całkowitą długość tablicy kluczy
                if (ui) ui.innerText = keysCount + " / " + keys.length;

                // --- TO WYWOŁUJE NAPIS KLUCZA ---
                if (typeof showInGameMessage === "function") {
                    showInGameMessage("K E Y", "#00ffff", 800); 
                }
            }
        }
    }
}