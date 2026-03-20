# Bullet Journal To-Do Application

Ez egy modern, reszponzív teendőkezelő alkalmazás, amely letisztult, "bullet journal" stílusú megjelenéssel segíti a napi feladatok rendszerezését.

## 🚀 Futtatás helyi környezetben

A projekt elindításához kövesse az alábbi lépéseket:

1. **Tárhely klónozása:**
   ```bash
   git clone [repository-url]
   cd todo

   fejlesztői szerver indítása:

2.  **Fejlesztői szerver indítása:**
    
    Bash
    
    ```
    npm run dev
    
    ```
    
3.  **Megtekintés:** Nyissa meg a böngészőben a [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) címet.
    

## 🛠 Felhasznált technológiák

Az alkalmazás fejlesztése során a modern webfejlesztés iparági sztenderdjeit alkalmaztam:

-   React 19: A felhasználói felület deklaratív felépítéséhez.
  
-   TypeScript: A kód robusztusságának és a fejlesztői élmény növelésének érdekében.
    
-   Vite: Mint villámgyors build eszköz és fejlesztői szerver.
    
-   Tailwind CSS 4: A modern, utility-first stílusozáshoz.
    
-   Framer Motion: A sima animációkért és a "kifestő" stílusú idézetmegjelenítésért.
    
-   Lucide React: Ikonkészlet a feladatkezelő gombokhoz.
    

## 🧠 Kihívások és megoldások

A fejlesztési folyamat során felmerült problémák és az azokra adott válaszaim:

- **Animációk szinkronizálása:** A feladatok törlésekor és állapotváltozásakor (pipálás) trükkös volt megoldani, hogy az animációk lefussanak, mielőtt a komponens kikerül a DOM-ból vagy áthelyeződik a listában. Ezt végül `setTimeout` és állapotjelzők (pl. `isExiting`) segítségével sikerült áthidalni.
- **Drag and Drop logika:** Drag and Drop integrálása a React állapotkezelésével (useState) igényelt némi finomhangolást, hogy a lista sorrendje megbízhatóan frissüljön.

- **SVG Mask Images kezelése:** Az egyedi vizuális elemek, pontosabban az `mask-image` tulajdonság és az SVG-k kombinálása, a helyes megjelenítése (például a "papír" hatás elérése) jelentős finomhangolást igényelt a CSS-ben.

## 📈 Továbblépési lehetőségek (Roadmap)

Amennyiben több idő állna rendelkezésemre, az alábbi fejlesztésekkel folytatnám a projektet:
    
-   **Kategóriák és Határidők:** Bővített adatmodell a feladatok csoportosítására és határidők kezelésére (DatePicker integráció).
    
-   **Sötét mód vagy egyéb stílusok:** A különböző felhaszálói igények kielégítésére.
