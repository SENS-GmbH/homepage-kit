# AGENTS.md

Dieses Repo ist die Website eines kleinen Betriebs. Ein KI-Agent pflegt sie im Auftrag der Inhaberin oder des Inhabers, meist per Chat. Auf dem Rechner läuft eine Live-Vorschau, veröffentlicht wird auf einen eigenen Server.

## Zuerst den Stand prüfen

Lies `BRIEF.md`. Steht dort `Status: offen`, führe das Onboarding nach `docs/onboarding.md` durch, bevor du Inhalte änderst. Bei jedem anderen Status ist `BRIEF.md` deine Quelle für alles, was über den Betrieb und die gewünschte Gestaltung bekannt ist.

## Mit wem du sprichst

Deine Auftraggeber sind keine Techniker. Schreibe ihnen in ihrer Sprache, was sich auf der Website geändert hat, in ein bis drei Sätzen, und nenne die Adresse der Vorschau. Dateinamen und Befehle nennst du auf Nachfrage. Stelle höchstens drei Fragen pro Nachricht.

## Belegt oder TODO

Jede Angabe auf der Website ist **belegt**. Sie stammt aus `BRIEF.md`, aus einer Nachricht der Auftraggeber oder aus deren Material in `beispiele/eigenes-material/`. Das gilt für Öffnungszeiten, Preise, Qualifikationen, Kassenverträge, Personen, Kundenstimmen und alle rechtlichen Texte.

Was noch fehlt, trägst du als Platzhalter ein, der mit `TODO:` beginnt und sagt, was fehlt. Frag danach. Der Befehl zum Veröffentlichen bricht ab, solange ein `TODO` im Inhalt steht oder `demo: true` gesetzt ist.

Fotos kommen von den Auftraggebern. Bis echte Fotos da sind, bleibt der Bereich ohne Bild.

## Beispiele und Material

Mit Beispielen zeigen dir die Auftraggeber, wie die Website aussehen soll. Sie schicken sie dir im Chat, im Onboarding und jederzeit danach. Du legst alles im Repo ab und hältst fest, was du daraus ableitest, damit auch jeder spätere Agent weiß, wohin die Gestaltung gehen soll.

Es gibt zwei Arten:

- **Vorbilder** sind fremde Websites, als Link oder Bildschirmfoto. Sie geben die Richtung vor: Aufbau, Farbstimmung, Schrift, Tonfall. Text, Bilder und Gestaltung dieser Website entstehen neu.
- **Eigenes Material** gehört den Auftraggebern: Logo, Fotos, vorhandene Texte. Es erscheint direkt auf der Website.

Für jedes Beispiel, das ankommt:

1. Lege es ab. Bildschirmfotos von Vorbildern nach `beispiele/vorbilder/`, Links nach `beispiele/vorbilder/links.md`, eigenes Material nach `beispiele/eigenes-material/`. Gib jeder Datei einen Namen, der sagt, was sie zeigt.
2. Sieh es dir an. Öffne Bildschirmfotos als Bild und rufe Links auf.
3. Halte in `BRIEF.md` unter „Gestaltung“ fest, was du daraus ableitest: Aufbau, Farben, Schrift, Tonfall und was den Auftraggebern daran gefällt. Wissen sie selbst nicht, was ihnen gefällt, beschreibe zwei Dinge, die dir auffallen, und frag, ob es das ist.
4. Lege einen Commit an.
5. Bestätige in einem Satz, was angekommen ist und was du daraus mitnimmst.

Erledigt ist ein Beispiel, wenn es im Repo liegt und `BRIEF.md` sagt, was daraus folgt. Legt jemand Dateien selbst in den Ordner `beispiele/`, gelten dieselben Schritte ab Schritt 2.

## Ablauf jeder Änderung

1. Lies die betroffenen Dateien.
2. Setze die Änderung um, in jeder Sprache aus `src/content/index.ts`.
3. Führe `npm run check` aus. Der Schritt ist erledigt, wenn die Prüfung 0 Fehler meldet und der Build durchläuft.
4. Führe `npm run preview:check` aus. Der Schritt ist erledigt, wenn die Vorschau als gesund gemeldet wird.
5. Lege einen Git-Commit an. Die Nachricht beschreibt in einem deutschen Satz, was sich für Besucher ändert.
6. Antworte mit der Änderung und der Vorschau-Adresse. `npm run status` zeigt die Tailscale-Adresse.

Scheitert Schritt 3 oder 4, nenne die Ursache und behebe sie, bevor du antwortest.

Jede Änderung ist ein eigener Commit. Bittet jemand darum, etwas rückgängig zu machen, nimm `git revert` für den betreffenden Commit und durchlaufe die Schritte 3 bis 6.

## Wo was liegt

| Was | Ort |
| --- | --- |
| Fakten zum Betrieb, gleich in allen Sprachen: Name, Telefon, Adresse, Öffnungszeiten | `src/content/business.ts` |
| Texte je Sprache | `src/content/de.ts`, `src/content/en.ts` |
| Sprachen hinzufügen oder entfernen | `src/content/index.ts` |
| Farben, Schriften, Abstände, Radien | `src/styles/tokens.css` |
| Bilder für die Website | `src/assets/`, im Inhalt importieren, Astro verkleinert sie beim Build |
| Material der Auftraggeber | `beispiele/` |
| Einstellungen: Kurzname, Skill-Name, Port, Domain, Server | `kit.env` |

Neue Inhaltsfelder bekommen zuerst einen Typ in `src/content/types.ts`. Komponenten enthalten keine festen Texte.

## Vorschau

Die Vorschau ist ein einziger Dev-Server, den macOS als Dienst betreibt. Änderungen an Dateien erscheinen dort sofort. Zum Prüfen dient `npm run check`, das die Website baut, ohne einen Server zu starten. Ein zweiter Dev-Server neben dem Dienst teilt sich dessen Cache und legt die Vorschau lahm.

Antwortet die Vorschau nicht, hilft `npm run preview:check`. Bleibt sie aus, zeigt `npm run preview:logs` den Grund.

## Sprache

Deutsche Texte sind idiomatisch und folgen der Rechtschreibung, mit `ä`, `ö`, `ü` und `ß`. Technische Bezeichner, Adressen und Dateinamen bleiben ohne Umlaute. Besucher werden gesiezt, außer `BRIEF.md` legt das Du fest. Englische Begriffe stehen in deutschen Texten nur, wenn sie Fachbegriffe oder Eigennamen sind.

## Gestaltung und Zugänglichkeit

- Farben, Schriften und Abstände kommen aus `src/styles/tokens.css`. Komponenten enthalten keine Farbwerte.
- Maßstab ist WCAG 2.2 AA: Textkontrast mindestens 4,5:1, alles per Tastatur bedienbar, sichtbarer Fokus, Alternativtext für jedes informative Bild, Bewegung nur bei `prefers-reduced-motion: no-preference`.
- Jeder Abschnitt hat höchstens zwei Schaltflächen. Die wichtigste Handlung der Seite ist die Kontaktaufnahme.
- Öffnungszeiten und Telefonnummer stehen im ersten Bildschirm.

## Datenschutz

Die Website lädt alles vom eigenen Server: Schriften als npm-Paket, Bilder aus `src/assets/`, die Karte als Link. Sie setzt keine Cookies. Ein Formular hat sie nicht, weil dafür ein Dienst nötig wäre, der die Eingaben verarbeitet.

Wünschen die Auftraggeber eine eingebettete Karte, ein Buchungs-Widget, Statistik oder ein Formular, erkläre vorher, dass dafür die Datenschutzerklärung angepasst und meist eine Einwilligung eingeholt werden muss. Baue es erst nach ihrer Bestätigung ein.

## Suchmaschinen

`src/layouts/Base.astro` erzeugt Canonical, hreflang und strukturierte Daten aus dem Inhalt. Deine Aufgabe sind die Texte: `meta.title` mit höchstens 60 Zeichen, `meta.description` mit höchstens 155 Zeichen, beide je Seite eindeutig. `schemaType` in `business.ts` passt zur Branche.

## Veröffentlichen

Veröffentliche nur auf ausdrücklichen Wunsch.

1. `SITE_DOMAIN` und `DEPLOY_HOST` stehen in `kit.env`. Fehlen sie, frag danach.
2. Beim ersten Mal bereitet `npm run deploy:setup` den Server vor.
3. `npm run deploy` baut und veröffentlicht. Erledigt ist der Schritt, wenn der Befehl die öffentliche Adresse als erreichbar meldet.
4. Hat das Repo ein Remote, führe `git push` aus.

Bricht Schritt 3 wegen offener Platzhalter ab, nenne den Auftraggebern die fehlenden Angaben. Die Option `--allow-todos` nimmst du nur, wenn sie die Veröffentlichung mit Platzhaltern ausdrücklich verlangen.
