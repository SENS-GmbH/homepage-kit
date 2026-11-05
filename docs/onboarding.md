# Onboarding

Das Onboarding macht aus der Vorlage mit Beispielinhalt die Website eines echten Betriebs. Du führst es als Gespräch, in kleinen Schritten, und hältst jede Antwort sofort in `BRIEF.md` fest. So geht nichts verloren, wenn das Gespräch über mehrere Tage läuft.

## 1. Beginnen

Setze in `BRIEF.md` den Status auf `läuft`. Erkläre in zwei Sätzen, was jetzt passiert: Du sammelst zuerst Beispiele und Material, stellst dann einige Fragen und zeigst danach eine erste Fassung.

## 2. Nach Beispielen und Material fragen

Frag als Erstes danach, noch vor den Fragen zum Betrieb. Gutes Material beantwortet die Hälfte der späteren Fragen.

- **Vorbilder.** Welche Websites gefallen Ihnen, und was genau daran? Links oder Bildschirmfotos genügen.
- **Eigenes Material.** Logo, Fotos von Räumen und Team, Texte von einer bestehenden Website, einem Flyer oder dem Google-Profil.

Lege ab, was ankommt:

| Was | Wohin |
| --- | --- |
| Links zu Vorbildern, je Link eine Zeile dazu, was daran gefällt | `beispiele/vorbilder/links.md` |
| Bildschirmfotos von Vorbildern | `beispiele/vorbilder/` |
| Logo, Fotos, eigene Texte | `beispiele/eigenes-material/` |

Gibt es eine bestehende Website, lies sie und übernimm die Fakten in `BRIEF.md`. Vermerke dort die Quelle und lass die Angaben bestätigen, denn alte Websites enthalten oft veraltete Zeiten und Nummern.

Kommt nichts, mach ohne Material weiter und frag bei Schritt 4 noch einmal nach Fotos.

Erledigt, wenn die Auftraggeber Material geschickt oder gesagt haben, dass es keines gibt.

## 3. Fragen stellen

Geh die Blöcke der Reihe nach durch, höchstens drei Fragen pro Nachricht. Überspringe, was das Material schon beantwortet hat, und lass es dir stattdessen kurz bestätigen.

1. **Betrieb.** Name, Branche oder Fachrichtung, Ort. Für wen ist die Website gedacht? Was sollen Besucher tun: anrufen, online buchen, vorbeikommen?
2. **Fakten.** Adresse, Telefon, E-Mail, Öffnungszeiten je Wochentag. Wie werden Termine vergeben?
3. **Leistungen.** Die vier bis acht wichtigsten Leistungen, jede in einem Satz. Was unterscheidet den Betrieb von anderen in der Nähe?
4. **Personen.** Wer arbeitet dort, mit welcher Ausbildung? Gibt es Fotos?
5. **Häufige Fragen.** Welche Fragen stellen Kunden am Telefon am häufigsten? Daraus entsteht der FAQ-Bereich.
6. **Sprache.** Sie oder Du? Braucht es Englisch oder eine andere Sprache? Wenn nein, entferne die Sprache in `src/content/index.ts`.
7. **Gestaltung.** Gibt es ein Logo und feste Farben? Beschreibe auf Basis der Vorbilder zwei Richtungen in je einem Satz und lass wählen.
8. **Rechtliches.** Angaben für das Impressum, Verantwortliche für den Datenschutz. Sag dazu, dass Impressum und Datenschutzerklärung vor der Veröffentlichung rechtlich geprüft werden sollten.
9. **Domain und Server.** Gibt es schon eine Domain? Wo soll die Website laufen?

Erledigt, wenn jedes Feld in `BRIEF.md` einen Wert hat oder unter „Offene Punkte“ steht.

## 4. Erste Fassung bauen

1. Trage die Fakten in `src/content/business.ts` ein und wähle den passenden `schemaType`.
2. Schreibe die Texte in `src/content/de.ts` und in jeder weiteren Sprache neu. Vom Beispielinhalt bleibt nichts stehen.
3. Passe `src/styles/tokens.css` an die gewählte Richtung an. Prüfe den Kontrast jeder Textfarbe auf ihrem Hintergrund.
4. Ersetze `public/favicon.svg` durch das Logo oder ein Zeichen in der Hauptfarbe.
5. Lege Fotos aus `beispiele/eigenes-material/` in `src/assets/` ab und binde sie ein.
6. Setze `demo` in `business.ts` auf `false`, sobald kein Beispielinhalt mehr übrig ist.

Erledigt, wenn `npm run check` besteht und `npm run todos` nur noch Platzhalter zeigt, die unter „Offene Punkte“ in `BRIEF.md` stehen.

## 5. Zeigen und verbessern

Schick die Vorschau-Adresse und frag, was nicht passt. Arbeite die Rückmeldungen einzeln ab, wie in `AGENTS.md` unter „Ablauf jeder Änderung“ beschrieben.

Setze den Status in `BRIEF.md` auf `abgeschlossen`, sobald die Auftraggeber die erste Fassung bestätigt haben.
