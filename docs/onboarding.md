# Onboarding

Das Onboarding macht aus der Vorlage mit Beispielinhalt die Website eines echten Betriebs. Du führst es als Gespräch, in kleinen Schritten, und hältst jede Antwort sofort in `BRIEF.md` fest. So geht nichts verloren, wenn das Gespräch über mehrere Tage läuft.

## 1. Beginnen

Setze in `BRIEF.md` den Status auf `läuft`. Erkläre in zwei Sätzen, was jetzt passiert: Du sammelst zuerst Beispiele und Material, stellst dann einige Fragen und zeigst danach eine erste Fassung.

## 2. Nach Beispielen und Material fragen

Frag als Erstes danach, noch vor den Fragen zum Betrieb. Gutes Material beantwortet die Hälfte der späteren Fragen.

- **Vorbilder.** Welche Websites gefallen Ihnen, und was genau daran? Bitte schicken Sie Links oder Bildschirmfotos hier in den Chat.
- **Eigenes Material.** Logo, Fotos von Räumen und Team, Texte von einer bestehenden Website, einem Flyer oder dem Google-Profil, ebenfalls hier in den Chat.

Behandle alles, was ankommt, nach dem Abschnitt „Beispiele und Material“ in `AGENTS.md`.

Gibt es eine bestehende Website, lies sie und übernimm die Fakten in `BRIEF.md`. Vermerke dort die Quelle und lass die Angaben bestätigen, denn alte Websites enthalten oft veraltete Zeiten und Nummern.

Kommt nichts, mach ohne Material weiter und frag vor der ersten Fassung noch einmal nach Fotos.

Erledigt, wenn jedes geschickte Beispiel im Repo liegt und in `BRIEF.md` ausgewertet ist, oder die Auftraggeber gesagt haben, dass es keines gibt.

## 3. Fragen stellen

Geh die Blöcke der Reihe nach durch, höchstens drei Fragen pro Nachricht. Überspringe, was das Material schon beantwortet hat, und lass es dir stattdessen kurz bestätigen.

1. **Betrieb.** Name, Branche oder Fachrichtung, Ort. Für wen ist die Website gedacht? Was sollen Besucher tun: anrufen, online buchen, vorbeikommen?
2. **Fakten.** Adresse, Telefon, E-Mail, Öffnungszeiten je Wochentag. Wie werden Termine vergeben?
3. **Leistungen.** Die vier bis acht wichtigsten Leistungen, jede in einem Satz. Was unterscheidet den Betrieb von anderen in der Nähe?
4. **Personen.** Wer arbeitet dort, mit welcher Ausbildung? Gibt es Fotos?
5. **Häufige Fragen.** Welche Fragen stellen Kunden am Telefon am häufigsten? Daraus entsteht der FAQ-Bereich.
6. **Sprache.** Sie oder Du? Braucht es Englisch oder eine andere Sprache? Wenn nein, entferne die Sprache in `src/content/index.ts`.
7. **Gestaltung.** Gibt es ein Logo und feste Farben? Beschreibe auf Basis der ausgewerteten Vorbilder zwei Richtungen in je einem Satz und lass wählen. Ohne Vorbilder schlägst du zwei Richtungen vor, die zur Branche passen.
8. **Rechtliches.** Angaben für das Impressum, Verantwortliche für den Datenschutz. Sag dazu, dass Impressum und Datenschutzerklärung vor der Veröffentlichung rechtlich geprüft werden sollten.
9. **Domain und Server.** Gibt es schon eine Domain? Wo soll die Website laufen?

Erledigt, wenn jedes Feld in `BRIEF.md` einen Wert hat oder unter „Offene Punkte“ steht.

## 4. Erste Fassung bauen

1. Trage die Fakten in `src/content/business.ts` ein und wähle den passenden `schemaType`.
2. Schreibe die Texte in `src/content/de.ts` und in jeder weiteren Sprache neu. Vom Beispielinhalt bleibt nichts stehen.
3. Passe die Abschnitte an den Betrieb an. Was nicht passt, etwa Öffnungszeiten bei einem Betrieb ohne feste Zeiten, entfernst du. Was fehlt, ergänzt du mit eigenem Typ in `src/content/types.ts`.
4. Setze die gewählte Richtung um: Farben, Schriften, Abstände und Radien in `src/styles/tokens.css`, den Aufbau in den Komponenten. Prüfe den Kontrast jeder Textfarbe auf ihrem Hintergrund.
5. Ersetze `public/favicon.svg` durch das Logo oder ein Zeichen in der Hauptfarbe.
6. Lege Fotos aus `beispiele/eigenes-material/` in `src/assets/` ab und binde sie ein.
7. Setze `demo` in `business.ts` auf `false`, sobald kein Beispielinhalt mehr übrig ist.

Erledigt, wenn `npm run check` besteht und `npm run todos` nur noch Platzhalter zeigt, die unter „Offene Punkte“ in `BRIEF.md` stehen.

## 5. Zeigen und verbessern

Schick die Vorschau-Adresse und frag, was nicht passt. Arbeite die Rückmeldungen einzeln ab, wie in `AGENTS.md` unter „Ablauf jeder Änderung“ beschrieben.

Setze den Status in `BRIEF.md` auf `abgeschlossen`, sobald die Auftraggeber die erste Fassung bestätigt haben.
