# Bullet Journal To-Do Application

Ez egy modern, reszponzív teendőkezelő alkalmazás, amely letisztult, "bullet journal" stílusú megjelenéssel segíti a napi feladatok rendszerezését.

## Futtatás helyi környezetben

A projekt elindításához kövesse az alábbi lépéseket:

1. Telepítse a függőségeket:

```bash
npm install
```

2. Indítsa el a fejlesztői szervert:

```bash
npm run dev
```

3. Nyissa meg a böngészőben a helyi címet:

```text
http://localhost:5173
```

## Felhasznált technológiák

Az alkalmazás fejlesztése során a modern webfejlesztés eszközeit használtam:

- React 19: a felhasználói felület deklaratív felépítéséhez
- TypeScript: a kód robusztussága és a jobb fejlesztői élmény érdekében
- Vite: gyors build és fejlesztői szerver
- Tailwind CSS 4: utility-first stílusozáshoz
- Framer Motion: animációkhoz és az idézet megjelenítéséhez
- Lucide React: ikonkészlet a feladatkezelő gombokhoz

## Főbb funkciók

- új feladatok felvétele
- feladatok szerkesztése
- feladatok törlése megerősítéssel
- feladatok teljesítettként jelölése
- haladás megjelenítése progress barral
- feladatok áthúzása drag and drop módon
- automatikus mentés `localStorage`-ba

## Kihívások és megoldások

A fejlesztés során az alábbi területek igényeltek külön figyelmet:

- Animációk szinkronizálása: a törlési és állapotváltozási animációkat úgy kellett kezelni, hogy lefussanak, mielőtt az elem kikerül a DOM-ból vagy áthelyeződik a listában.
- Drag and drop logika: a lista sorrendjének frissítéséhez össze kellett hangolni a húzd-és-ejtsd működést a React állapotkezelésével.
- Vizuális részletek: a papírhatás, az SVG-alapú stíluselemek és a kézírásos megjelenés finomhangolást igényelt.

## 📈 Továbblépési lehetőségek (Roadmap)

Amennyiben több idő állna rendelkezésemre, az alábbi fejlesztésekkel folytatnám a projektet:

- **Backend integráció:** Node.js/Express vagy Firebase használata a feladatok felhő alapú tárolásához és szinkronizációjához.
- **Kategóriák és Határidők:** Bővített adatmodell a feladatok csoportosítására és határidők kezelésére (DatePicker integráció).
- **Sötét mód vagy egyéb stílusok:** A különböző felhaszálói igények kielégítésére.

---

**Készítette:** Czuppon-Horváth Lili
