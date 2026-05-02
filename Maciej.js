mapArray[0] = [
    // --- GŁÓWNE POMIESZCZENIE (ZAMKNIĘTE) ---
    // Ściana Tylna (Z = 1000)
    [0, 0, 1000, 0, 0, 0, 2000, 200, "Patterns/3.jpg"], 
    [0, 0, 980, 0, 0, 0, 2000, 200, "Patterns/3.jpg"],
    [-1000, 0, 990, 0, 90, 0, 20, 200, "Patterns/3.jpg"], 
    [1000, 0, 990, 0, 90, 0, 20, 200, "Patterns/3.jpg"],

    // Ściana Przednia (Z = -1000)
    [0, 0, -1000, 0, 0, 0, 2000, 200, "Patterns/3.jpg"], 
    [0, 0, -980, 0, 0, 0, 2000, 200, "Patterns/3.jpg"],
    [-1000, 0, -990, 0, 90, 0, 20, 200, "Patterns/3.jpg"], 
    [1000, 0, -990, 0, 90, 0, 20, 200, "Patterns/3.jpg"],

    // Ściana Prawa (X = 1000)
    [1000, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"], 
    [980, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"],

    // Ściana Lewa (X = -1000)
    [-1000, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"], 
    [-980, 0, 0, 0, 90, 0, 2000, 200, "Patterns/3.jpg"],

    // Podłoga
    [0, 100, 0, 90, 0, 0, 2000, 2000, "Patterns/2.jpg"], 

    // --- WEWNĘTRZNE ŚCIANY LABIRYNTU ---
    // Ściana X1
    [500, 0, -500, 0, 0, 0, 1000, 200, "Patterns/3.jpg"],  
    [500, 0, -480, 0, 0, 0, 1000, 200, "Patterns/3.jpg"],  
    [0, 0, -490, 0, 90, 0, 20, 200, "Patterns/3.jpg"],     
    [1000, 0, -490, 0, 90, 0, 20, 200, "Patterns/3.jpg"],  

    // Ściana X2
    [-500, 0, 500, 0, 0, 0, 1000, 200, "Patterns/3.jpg"],   
    [-500, 0, 480, 0, 0, 0, 1000, 200, "Patterns/3.jpg"],   
    [-1000, 0, 490, 0, 90, 0, 20, 200, "Patterns/3.jpg"],  
    [0, 0, 490, 0, 90, 0, 20, 200, "Patterns/3.jpg"],      

    // Ściana X3
    [0, 0, 0, 0, 0, 0, 500, 200, "Patterns/3.jpg"],        
    [0, 0, 20, 0, 0, 0, 500, 200, "Patterns/3.jpg"],        
    [-250, 0, 10, 0, 90, 0, 20, 200, "Patterns/3.jpg"],    
    [250, 0, 10, 0, 90, 0, 20, 200, "Patterns/3.jpg"],     
    
    // Ściana Z1
    [-500, 0, -500, 0, 90, 0, 1000, 200, "Patterns/3.jpg"], 
    [-480, 0, -500, 0, 90, 0, 1000, 200, "Patterns/3.jpg"], 
    [-490, 0, -1000, 0, 0, 0, 20, 200, "Patterns/3.jpg"],  
    [-490, 0, 0, 0, 0, 0, 20, 200, "Patterns/3.jpg"],      
    
    // Ściana Z2
    [500, 0, 500, 0, 90, 0, 1000, 200, "Patterns/3.jpg"],   
    [480, 0, 500, 0, 90, 0, 1000, 200, "Patterns/3.jpg"],   
    [490, 0, 0, 0, 0, 0, 20, 200, "Patterns/3.jpg"],       
    [490, 0, 1000, 0, 0, 0, 20, 200, "Patterns/3.jpg"],    
    
    // Ściana Z3
    [0, 0, 0, 0, 90, 0, 500, 200, "Patterns/3.jpg"],        
    [-20, 0, 0, 0, 90, 0, 500, 200, "Patterns/3.jpg"],      
    [-10, 0, -250, 0, 0, 0, 20, 200, "Patterns/3.jpg"],    
    [-10, 0, 250, 0, 0, 0, 20, 200, "Patterns/3.jpg"],     // DODANO PRZECINEK
    
// --- PLATFORMA 1 (Lewy górny róg - teraz na ziemi) ---
    [-400, 80, -400, 90, 0, 0, 200, 200, "Patterns/3.jpg"],  // Góra platformy
    [-400, 90, -300, 0, 0, 0, 200, 20, "Patterns/3.jpg"],   // Ścianka front
    [-400, 90, -500, 0, 0, 0, 200, 20, "Patterns/3.jpg"],   // Ścianka tył
    [-500, 90, -400, 0, 90, 0, 200, 20, "Patterns/3.jpg"],  // Ścianka lewa
    [-300, 90, -400, 0, 90, 0, 200, 20, "Patterns/3.jpg"],  // Ścianka prawa

    // --- PLATFORMA 2 (Prawy dolny róg - teraz na ziemi) ---
    [400, 80, 400, 90, 0, 0, 200, 200, "Patterns/3.jpg"],    // Góra platformy
    [400, 90, 500, 0, 0, 0, 200, 20, "Patterns/3.jpg"],     // Ścianka front
    [400, 90, 300, 0, 0, 0, 200, 20, "Patterns/3.jpg"],     // Ścianka tył
    [300, 90, 400, 0, 90, 0, 200, 20, "Patterns/3.jpg"],    // Ścianka lewa
    [500, 90, 400, 0, 90, 0, 200, 20, "Patterns/3.jpg"]     // Ścianka prawa
];

coinsArray[0] = [
    [-750, 30, -800, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, -600, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, -400, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, -200, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, 0,    0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, 200,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, 400,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, 600,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-750, 30, 800,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, -800, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, -600, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, -400, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, -200, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, 0,    0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, 200,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, 400,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, 600,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [750, 30, 800,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, -800, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, -600, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, -400, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, -200, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, 200,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, 400,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, 600,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-250, 30, 800,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, -800, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, -600, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, -400, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, -200, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, 200,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, 400,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, 600,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [250, 30, 800,  0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-600, 30, 0, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-400, 30, 0, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [-100, 30, 0, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [100, 30, 0, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [400, 30, 0, 0, 0, 0, 50, 50, "Patterns/coin.png", 1],
    [600, 30, 0, 0, 0, 0, 50, 50, "Patterns/coin.png", 1]
];

finishArray[0] = [
    [0, 0, 980, 0, 0, 0, 120, 120, "Patterns/234.png", 50]
];
    
startArray[0] = [
    [-900, 0, -900, 0, 0]
];

keysArray[0] = [
    // Klucz na Platformie 1 (X: -400, Z: -400)
    // Y = 50 (Platforma jest na 80, więc 80 - 30 jednostek w górę = 50)
    [-400, 50, -400, 0, 0, 0, 50, 50, "Patterns/key.png", 50],

    // Klucz na Platformie 2 (X: 400, Z: 400)
    [400, 50, 400, 0, 0, 0, 50, 50, "Patterns/key.png", 50]
];