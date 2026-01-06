# PDF-Export – Dokumente für den Kunden

## Option A: Ohne zusätzliche Tools (empfohlen, sofort möglich)
1. Datei im Browser öffnen (z. B. `docs/01-Lastenheft.md` in einem Markdown-Viewer oder über GitHub/IDE Preview).
2. „Drucken“ wählen.
3. Drucker: „Microsoft Print to PDF“.
4. Als PDF speichern.

Hinweis: Für sauber formatiertes Drucken ist es oft am besten, Markdown vorher als HTML anzuzeigen (IDE Preview / GitHub Preview) und dann zu drucken.

## Option B: Pandoc (wenn installiert)
Wenn Pandoc auf dem Rechner installiert ist, kann man pro Dokument eine PDF erzeugen.

Beispiel (PowerShell):
- `pandoc docs/01-Lastenheft.md -o docs/01-Lastenheft.pdf`

Optional (wenn LaTeX installiert ist) entsteht meist die beste Typografie.

## Option C: Word/Google Docs
1. Markdown in ein Dokument kopieren.
2. Format prüfen.
3. Export → PDF.

## Empfehlung
- Für „Kundenabgabe“: Option A oder C (am schnellsten).
- Für wiederholbare Exporte: Option B (automatisierbar).
