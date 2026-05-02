// ==========================================
//           LEVEL 3 (Array 2)
// ==========================================

// ==========================================
//           LEVEL 3 (Array 2)
// ==========================================

mapArray[2] = [
    // --------------------------------------------------------
    // --- SKOPIOWANY SZKIELET Z LEVELU 0 (Ściany i Podłoga) ---
    // --------------------------------------------------------
    [-550, 0, -1000, 0, 0, 0, 900, 200, "Patterns/3.jpg"], 
    [550, 0, -1000, 0, 0, 0, 900, 200, "Patterns/3.jpg"],  
    [0, -80, -1000, 0, 0, 0, 200, 40, "Patterns/3.jpg"],   
    [-550, 0, -980, 0, 0, 0, 900, 200, "Patterns/3.jpg"],  
    [550, 0, -980, 0, 0, 0, 900, 200, "Patterns/3.jpg"],
    [0, -80, -980, 0, 0, 0, 200, 40, "Patterns/3.jpg"],
    [-100, 20, -990, 0, 90, 0, 20, 160, "Patterns/3.jpg"], 
    [100, 20, -990, 0, 90, 0, 20, 160, "Patterns/3.jpg"],  
    [0, -60, -990, 90, 0, 0, 200, 20, "Patterns/3.jpg"],
    [-1000, 0, -990, 0, 90, 0, 20, 200, "Patterns/3.jpg"], 
    [1000, 0, -990, 0, 90, 0, 20, 200, "Patterns/3.jpg"],
    [0, 0, 1000, 0, 0, 0, 2000, 200, "Patterns/3.jpg"], 
    [0, 0, 980, 0, 0, 0, 2000, 200, "Patterns/3.jpg"],  
    [-1000, 0, 990, 0, 90, 0, 20, 200, "Patterns/3.jpg"], 
    [1000, 0, 990, 0, 90, 0, 20, 200, "Patterns/3.jpg"],  
    [1000, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"], 
    [980, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"],  
    [-1000, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"], 
    [-980, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"], 
    [0, 100, 0, 90, 0, 0, 2000, 2000, "Patterns/2.jpg"], // Główna niebieska podłoga

    [-100, 0, -1500, 0, 90, 0, 1000, 200, "Patterns/2.jpg"], 
    [100, 0, -1500, 0, 90, 0, 1000, 200, "Patterns/2.jpg"],  
    [0, 100, -1500, 90, 0, 0, 200, 1000, "Patterns/2.jpg"],  // Podłoga korytarza

    [0, 0, -3000, 0, 0, 0, 1000, 200, "Patterns/2.jpg"],     
    [-500, 0, -2500, 0, 90, 0, 1000, 200, "Patterns/2.jpg"], 
    [500, 0, -2500, 0, 90, 0, 1000, 200, "Patterns/2.jpg"],  
    [0, 100, -2500, 90, 0, 0, 1000, 1000, "Patterns/2.jpg"], // Podłoga sandbox
    [-350, 0, -2000, 0, 0, 0, 600, 200, "Patterns/2.jpg"],   
    [350, 0, -2000, 0, 0, 0, 600, 200, "Patterns/2.jpg"],    
    [0, -80, -2000, 0, 0, 0, 200, 40, "Patterns/2.jpg"],     

    // --------------------------------------------------------
    // --- NOWY UKŁAD WEWNĘTRZNY DLA LEVELU 3 (GRUBOŚĆ 3D) ---
    // --------------------------------------------------------

    // 1. SPIRALA W GŁÓWNYM POKOJU
    
    // Dolna ściana spirali (Prostopadła do Z)
    [-200, 0, 400, 0, 0, 0, 1600, 200, "Patterns/3.jpg"], 
    [-200, 0, 380, 0, 0, 0, 1600, 200, "Patterns/3.jpg"], 
    [-1000, 0, 390, 0, 90, 0, 20, 200, "Patterns/3.jpg"], // Lewa krawędź
    [600, 0, 390, 0, 90, 0, 20, 200, "Patterns/3.jpg"],   // Prawa krawędź

    // Prawa ściana spirali (Prostopadła do X)
    [600, 0, -200, 0, 90, 0, 1200, 200, "Patterns/3.jpg"], 
    [580, 0, -200, 0, 90, 0, 1200, 200, "Patterns/3.jpg"], 
    [590, 0, -800, 0, 0, 0, 20, 200, "Patterns/3.jpg"],   // Górna krawędź
    [590, 0, 400, 0, 0, 0, 20, 200, "Patterns/3.jpg"],    // Dolna krawędź

    // Górna ściana spirali (Prostopadła do Z)
    [0, 0, -800, 0, 0, 0, 1200, 200, "Patterns/3.jpg"],    
    [0, 0, -780, 0, 0, 0, 1200, 200, "Patterns/3.jpg"],    
    [-600, 0, -790, 0, 90, 0, 20, 200, "Patterns/3.jpg"], // Lewa krawędź
    [600, 0, -790, 0, 90, 0, 20, 200, "Patterns/3.jpg"],  // Prawa krawędź

    // Lewa ściana zamykająca środek (Prostopadła do X)
    [-600, 0, -400, 0, 90, 0, 800, 200, "Patterns/3.jpg"], 
    [-580, 0, -400, 0, 90, 0, 800, 200, "Patterns/3.jpg"], 
    [-590, 0, -800, 0, 0, 0, 20, 200, "Patterns/3.jpg"],   // Górna krawędź
    [-590, 0, 0, 0, 0, 0, 20, 200, "Patterns/3.jpg"],      // Dolna krawędź

    // 2. WIELKI KRZYŻ W SALI SANDBOX (-2500)

    // Pomarańczowa belka pozioma (Prostopadła do Z)
    [0, 0, -2500, 0, 0, 0, 600, 200, "Patterns/3.jpg"],  
    [0, 0, -2480, 0, 0, 0, 600, 200, "Patterns/3.jpg"],  
    [-300, 0, -2490, 0, 90, 0, 20, 200, "Patterns/3.jpg"], 
    [300, 0, -2490, 0, 90, 0, 20, 200, "Patterns/3.jpg"],  

    // Pomarańczowa belka pionowa (Prostopadła do X)
    [0, 0, -2500, 0, 90, 0, 600, 200, "Patterns/3.jpg"],  
    [-20, 0, -2500, 0, 90, 0, 600, 200, "Patterns/3.jpg"],  
    [-10, 0, -2800, 0, 0, 0, 20, 200, "Patterns/3.jpg"],   
    [-10, 0, -2200, 0, 0, 0, 20, 200, "Patterns/3.jpg"]    
];

// --- START: Na dole po lewej stronie, przed wejściem w spiralę ---
startArray[2] = [
    [-800, 0, 800, 0, 0]
];

// --- PORTAL: W lewym górnym rogu sali Sandbox, przyklejony do tylnej ściany ---
finishArray[2] = [
    [-350, 0, -2995, 0, 0, 0, 120, 120, "Patterns/234.png", 50]
];

	keysArray[2] = [
    [-300, 30, -2900, 0, 0, 0, 50, 50, "Patterns/key.png", 50],  // Pierwszy klucz tuż przed portalem (lekko z prawej)
    [-400, 30, -2900, 0, 0, 0, 50, 50, "Patterns/key.png", 50]   // Drugi klucz tuż przed portalem (lekko z lewej)
];

// --- MONETY: Ścieżka prowadząca do środka spirali i przez korytarz ---
coinsArray[2] = [
    // Wejście do spirali
    [800, 30, 800, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [800, 30, 400, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [800, 30, 0, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    
    // Zakręt na górę
    [800, 30, -500, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [400, 30, -500, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [0, 30, -500, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-300, 30, -500, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],

    // Zejście w dół do centrum spirali
    [-300, 30, -100, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [0, 30, -200, 0, 0, 0, 50, 50, "Patterns/coin.png", 1], // Przed samym kluczem

    // Ścieżka ewakuacyjna do korytarza
    [-800, 30, -800, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-400, 30, -900, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],

    // Ścieżka w długim korytarzu
    [0, 30, -1300, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [0, 30, -1600, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [0, 30, -1900, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],

    // Monety otaczające krzyż w Sandboxie
    [0, 30, -2100, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-300, 30, -2500, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [300, 30, -2500, 0, 0, 0, 50, 50, "Patterns/coin.png", 1]
];