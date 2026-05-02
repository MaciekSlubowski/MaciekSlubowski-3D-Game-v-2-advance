// --- LOGIKA OBSŁUGI PRZYCISKÓW MENU ---

// Pobieranie elementów menu
var menu1 = document.getElementById("menu1");
var menu2 = document.getElementById("menu2");
var menu3 = document.getElementById("menu3");
var menu4 = document.getElementById("menu4");

// Pobieranie przycisków
var button1 = document.getElementById("button1"); // Start Game
var button2 = document.getElementById("button2"); // Instructions
var button3 = document.getElementById("button3"); // Back from Instructions
var button4 = document.getElementById("button4"); // Rules
var button5 = document.getElementById("button5"); // Back from Rules
var button6 = document.getElementById("button6"); // Next Level / Summary

// Dźwięki
var clickSound = new Audio("Sound/1.mp3");
var coinCollectSound = new Audio("Sound/2.mp3");

// Statystyki gry
var level = 0;
var totalScore = 0;
var totalCoins = 0;     // Łącznie monety ze wszystkich poziomów
var totalKeys = 0;      // Łącznie klucze ze wszystkich poziomów
var totalGameTime = 0;  // Łączny czas ze wszystkich poziomów

// Definicja muzyki tła
var backgroundMusic = new Audio("Sound/background.mp3"); // Użyj poprawnej nazwy pliku
backgroundMusic.loop = true;                       // Muzyka będzie grać w pętli
backgroundMusic.volume = 0.1;                     // Opcjonalnie: ustaw głośność (0.0 do 1.0)

// Zmienne systemowe
var TimerGame;
var TimerInterval;
var msgBox = document.getElementById("gameMessages");
var hud = document.getElementById("hud");
var msgTimer;

// ==========================================
// FUNKCJA URUCHAMIAJĄCA POZIOM
// ==========================================
function loadLevel() {
    // 1. Kopiowanie danych poziomu
    map = makeCopy(mapArray[level]);
    coins = makeCopy(coinsArray[level]);
    keys = makeCopy(keysArray[level]);
    finish = makeCopy(finishArray[level]);
    start = makeCopy(startArray[level]);
    
    // 2. Ustawienie gracza
    pawn.x = start[0][0];
    pawn.y = start[0][1];
    pawn.z = start[0][2];
    pawn.rx = start[0][3];
    pawn.ry = start[0][4];
    
    // 3. Reset lokalnych liczników poziomu
    coinsCount = 0;
    keysCount = 0;
    gameTime = 0;
    
    // 4. Aktualizacja UI
	document.getElementById("coinCountUI").innerText = "0";
    document.getElementById("keyCountUI").innerText = "0 / " + keys.length;
    document.getElementById("timerUI").innerText = "60.0"; // ZMIANA: Startujemy od 60.0
    document.getElementById("totalScoreUI").innerText = totalScore;
    
    // 5. Przełączanie widoczności
    menu1.style.display = "none";
    menu4.style.display = "none";
    hud.style.display = "block";
    
    // 6. Budowanie świata
    let worldDiv = document.getElementById("world");
    if (worldDiv) worldDiv.innerHTML = ""; // Czyścimy stary świat
    
    CreateNewWorld(map);
    CreateSquares(coins, "coin");
    CreateSquares(keys, "key");
    CreateSquares(finish, "portal");
    
    // 7. Start pętli i timerów
	update();
    TimerGame = setInterval(repeatForever, 10);
	TimerInterval = setInterval(() => {
        gameTime += 0.1;
        
        let uiTime = document.getElementById("timerUI");
        
        // OBLICZAMY ILE ZOSTAŁO: 60 sekund minus czas który upłynął
        let timeLeft = (60.0 - gameTime).toFixed(1);
        
        // Wyświetlamy pozostały czas (zabezpieczamy, żeby nie spadł poniżej 0.0)
        uiTime.innerText = Math.max(0, timeLeft).toFixed(1);
        
        // Zmiana koloru na czerwony, gdy zostanie 10 sekund lub mniej
        if (gameTime >= 50.0) {
            uiTime.style.color = "#ff3333";
            uiTime.style.fontWeight = "bold";
        } else {
            uiTime.style.color = "#00ff00"; // Zielony dla bezpiecznego czasu
            uiTime.style.fontWeight = "normal";
        }

        // --- SPRAWDZENIE LIMITU CZASU ---
        if (gameTime >= 60.0) {
            gameOverTimeUp();
        }
    }, 100);
    
    canlock = true;
} // <-- To zamyka funkcję loadLevel()

// ==========================================
// OBSŁUGA PRZYCISKÓW
// ==========================================

button1.onclick = function() {
    clickSound.play();
    backgroundMusic.play(); // <--- DODAJ TĘ LINIJKĘ
    
    // Całkowity reset gry przy nowym starcie
    level = 0;
    totalScore = 0;
    totalCoins = 0;
    totalKeys = 0;
    totalGameTime = 0;
    loadLevel();
};

button6.onclick = function() {
    clickSound.play();
    // Sprawdzamy czy to był ostatni poziom (limit np. 4 poziomy: 0,1,2,3)
    if (level === 0 && totalScore > 0) { 
        // Jeśli level zresetował się do 0 po przejściu całości
        menu4.style.display = "none";
        menu1.style.display = "block";
    } else {
        loadLevel();
    }
};

button2.onclick = function() { clickSound.play(); menu1.style.display = "none"; menu2.style.display = "block"; };
button3.onclick = function() { clickSound.play(); menu1.style.display = "block"; menu2.style.display = "none"; };
button4.onclick = function() { clickSound.play(); menu1.style.display = "none"; menu3.style.display = "block"; };
button5.onclick = function() { clickSound.play(); menu1.style.display = "block"; menu3.style.display = "none"; };

// ==========================================
// LOGIKA GRY
// ==========================================

function iteration(squares, string){
    for (let i = 0; i < squares.length; i++){
        // Usunęliśmy badanie osi Y, sprawdzamy tylko X oraz Z
        let r = (squares[i][0] - pawn.x)**2 + (squares[i][2] - pawn.z)**2;
        let r1 = squares[i][6]**2;
        
        if (r < r1) {
            if (string === "coin") {
                coinCollectSound.currentTime = 0;
                coinCollectSound.play();
                coinsCount++;
                document.getElementById("coinCountUI").innerText = coinsCount;
            } else if (string === "key") {
                keysCount++;
                document.getElementById("keyCountUI").innerText = keysCount + " / " + squares.length;
            }
            
            document.getElementById(string + i).style.display = "none";
            squares[i][0] = squares[i][1] = squares[i][2] = 1000000;
        }
    }
}

function checkWin() {
    let r = (finish[0][0] - pawn.x)**2 + (finish[0][1] - pawn.y)**2 + (finish[0][2] - pawn.z)**2;
    let r1 = finish[0][6]**2;

    if (r < r1) {
        if (keysCount < keys.length) {
            showInGameMessage("🔒 FIND ALL KEYS (" + keysCount + "/" + keys.length + ") FIRST!", "#ffcc00");
            pawn.z -= 80;
        } else {
            // STOP GRY
            clearInterval(TimerGame);
            clearInterval(TimerInterval);
            
            // DODAWANIE DO STATYSTYK GLOBALNYCH
            totalScore += (coinsCount * 100);
            totalCoins += coinsCount;
            totalKeys += keysCount;
            totalGameTime += gameTime;
            
            showInGameMessage("🎉 LEVEL CLEAR!", "#00ff00");

            // Przygotowanie Menu 4 (Podsumowanie)
            document.getElementById("summaryTotalCoins").innerText = totalCoins;
            document.getElementById("summaryTotalKeys").innerText = totalKeys;
            document.getElementById("summaryTotalTime").innerText = totalGameTime.toFixed(1);
            document.getElementById("summaryTotalScore").innerText = totalScore;

            // Zmiana poziomu
            level++;
            let gameFinished = false;
            if (level === 3) { // Zakładamy 4 poziomy
                level = 0;
                gameFinished = true;
            }

            // Przejście do podsumowania po 2 sekundach
            setTimeout(() => {
                hud.style.display = "none";
                document.exitPointerLock();
                
                // Jeśli to był ostatni poziom, zmień napis na przycisku
                if (gameFinished) {
                    button6.querySelector("p").innerText = "Main Menu";
                } else {
                    button6.querySelector("p").innerText = "Next Level";
                }
                
                menu4.style.display = "block";
            }, 2000);
        }
    }
}

// Systemowe funkcje pomocnicze
function repeatForever(){
    update();
    iteration(coins, "coin");
    iteration(keys, "key");
    checkWin();
}

function makeCopy(array){
    let NewArray = [];
    if (!array) return NewArray; // Zabezpieczenie przed brakiem danych
    for (let i = 0; i < array.length; i++){
        // Sprawdzamy, czy element istnieje i jest tablicą przed kopiowaniem
        if (array[i] && Array.isArray(array[i])) {
            NewArray.push([...array[i]]);
        }
    }
    return NewArray;
}

function showInGameMessage(text, color = "#ff3333", duration = 3000) {
    clearTimeout(msgTimer);
    
    // ZMIANA: Zmieniamy innerText na innerHTML, żeby móc dodawać znaczniki HTML (np. nową linię)
    msgBox.innerHTML = text; 
    msgBox.style.color = color;

    msgBox.style.animation = 'none';
    msgBox.offsetHeight; 
    msgBox.style.animation = null;

    msgBox.classList.remove("fast-speed", "coin-pickup");

    // ZMIANA: Używamy .includes(), bo teraz tekst będzie zawierał w sobie licznik!
    if (text.toLowerCase().includes("fast speed")) {
        msgBox.classList.add("fast-speed"); 
    } 
    else if (text === "C O I N" || text === "K E Y") {  
        msgBox.classList.add("coin-pickup"); 
    }

    msgBox.style.display = "block";
    msgTimer = setTimeout(() => { 
        msgBox.style.display = "none"; 
    }, duration);
}


function gameOverTimeUp() {
    // 1. Zatrzymujemy pętle gry, żeby gracz nie mógł się poruszać
    clearInterval(TimerGame);
    clearInterval(TimerInterval);
    
    // 2. Odblokowujemy myszkę
    canlock = false;
    document.exitPointerLock();

    // 3. Wyświetlamy wielki czerwony komunikat o przegranej przez 3 sekundy
    showInGameMessage("⏰ TIME'S UP!", "#ff0000", 3000);

    // 4. Po 3 sekundach restartujemy dokładnie ten sam poziom od nowa
    setTimeout(() => {
        loadLevel(); 
    }, 3000);
}