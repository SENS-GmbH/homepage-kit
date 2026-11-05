# Ordination oder Arztpraxis in Österreich

Hinweise für Websites von Ärztinnen und Ärzten. Sie ersetzen keine Rechtsberatung. Sag den Auftraggebern, dass die Ärztekammer ihres Bundeslandes Auskunft zu Werbung und Impressum gibt.

## Was Patienten suchen

Diese Angaben gehören auf die Startseite. Frag im Onboarding nach jeder einzelnen.

- Fachrichtung
- Kassenverträge (ÖGK, BVAEB, SVS, KFA) oder Wahlarzt
- Öffnungszeiten und Art der Terminvergabe
- Barrierefreier Zugang
- Sprachen, in denen behandelt wird
- Urlaub und Vertretung. Dafür gibt es das Feld `notice` im Inhalt, es erscheint über der Überschrift.

Für die Frage nach Hilfe außerhalb der Öffnungszeiten: Der Rettungsnotruf ist 144, die telefonische Gesundheitsberatung 1450. Der ärztliche Bereitschaftsdienst ist je Bundesland anders geregelt, frag nach der örtlichen Nummer.

## Tonfall

Das Ärztegesetz (§ 53) und die Richtlinie „Arzt und Öffentlichkeit“ der Österreichischen Ärztekammer verlangen sachliche und wahre Information. Für die Texte heißt das:

- Beschreibe, was die Ordination tut. Lass Heilversprechen, Superlative und Vergleiche mit Kollegen weg.
- Kundenstimmen, Bewertungen und Vorher-Nachher-Bilder nimmst du nur auf, wenn die Auftraggeber sie nach Rückfrage bei der Ärztekammer ausdrücklich wünschen.
- Titel und Qualifikationen stehen genau so da, wie sie verliehen wurden.

## Impressum

Nach § 5 E-Commerce-Gesetz und § 25 Mediengesetz gehören üblicherweise hinein:

- Name, Anschrift der Ordination, Telefon und E-Mail
- Berufsbezeichnung und der Staat, in dem sie verliehen wurde
- Zuständige Ärztekammer als Kammer und Aufsichtsbehörde
- Hinweis auf das Ärztegesetz 1998 mit Fundstelle (ris.bka.gv.at)
- UID-Nummer, falls vorhanden
- Bei Gruppenpraxen Firmenbuchnummer und Firmenbuchgericht

Trag ein, was die Auftraggeber liefern. Der Rest bleibt `TODO`.

## Gesundheitsdaten

Gesundheitsdaten sind nach Art. 9 DSGVO besonders geschützt.

- Die Website hat kein Kontaktformular. Kontakt läuft über Telefon.
- Bitte Besucher in der Datenschutzerklärung, keine Befunde oder Beschwerden per E-Mail zu schicken.
- Online-Terminbuchung läuft über einen spezialisierten Anbieter, mit dem die Ordination einen Auftragsverarbeitungsvertrag hat. Die Website verlinkt nur dorthin (`bookingUrl` in `business.ts`).

## Strukturierte Daten

Setze `schemaType` in `src/content/business.ts` auf `Physician` für eine Einzelordination, `Dentist` für Zahnärzte oder `MedicalClinic` für eine Gruppenpraxis.
