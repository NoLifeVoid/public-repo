Setup-Anleitung (Deutsch)

1. Voraussetzungen

1.1. Node.js installieren
Lade Node.js von der offiziellen Website herunter:
```
https://nodejs.org/en/
```


1.2. Repo lokal holen
- Entweder .zip herunterladen oder mit Git klonen:
```git
git clone <repo-url>
```
- In den Projektordner wechseln.

2. .env Datei erstellen

2.1. Erstelle eine .env-Datei im Projektordner.
2.2. Beispielinhalt für eigene Datenbank:
```.env

# DATABASE_DATA
MYSQL_ROOT_PASSWORD=admin        # nur für Entwicklung / Virtualisierung
MYSQL_USER=mysql                 # ersetzen
MYSQL_PASSWORD=mysql             # ersetzen
MYSQL_HOST=localhost             # ersetzen
MYSQL_PORT=3306                  # ersetzen
MYSQL_DATABASE=user_database     # verwenden
#MySQL User, Password, Host und Datenbank müssen existieren und auf angegebenem Port lauschen.
#Für das Vorbereiten einer externen Datenbank, kann das init.sql Skript verwendet werden.
#Tabellen werden im späteren Setup automatisch von Primsa.js über angelgte Modelle erstellt. 

# MAIL_DATA
EMAIL_SERVICE=gmail              # aktuell nur Gmail getestet
EMAIL_ADDRESS=any@gmail.com      # ersetzen
EMAIL_APP_PASSWORD=dgfhenfheutjgit # ersetzen

# COMPANY_DATA
COMPANY_NAME="Paper-Street-Soul-Company"  # ersetzen
COMPANY_KIND="Ltd."                        # ersetzen

# FRONTEND_DATA
FRONTEND_URL=https://www.google.com  # ersetzen
FRONTEND_PORT=4200                    # ersetzen
# Hinweis: Für Redirects muss die URL online erreichbar sein, z.B. <fqdn>/user/:token

# WEBTOKEN_DATA
ACCESS_SECRET=mysupersecuresecret0234712893123478lala  # ersetzen

# HASHING
PEPPER=mySoE3ndl3sslkSuperSecretPepper123!  # ersetzen

# BACKEND_DATA
BACKEND_PORT=3000  # optional ersetzen, darauf achten, dass der Datenfluss passt

# CONNECTION_MODI
DATABASE_ON_REQUEST=false  # aktuell nur in diesem Modus getestet

```


3. Abhängigkeiten installieren
```
npm install
```


4. MySQL-Datenbank starten
- Entweder die eigene Datenbank gemäß .env nutzen oder Docker Compose verwenden:

```docker
docker-compose down -v                     # alle Container, Images, Volumes entfernen
docker system prune -af --volumes          # zusätzliche Aufräumarbeiten
docker-compose up --build -d               # neuen Datenbank-Container starten

```


5. Verbindung konfigurieren

```cmd
node assemble.js    # erstellt die DATABASE_URL in .env
node wait.js        # wartet bis MySQL bereit ist

```


6. Prisma vorbereiten

```npx

npx prisma generate  # Prisma Client generieren
npx prisma db push   # Prisma Schema in die DB pushen
```


7. Anwendung starten

Windows:
```cmd
npm start
```


Linux / macOS:
```sh
rm -rf ./dist
tsc
node ./dist/index.js
```


Hinweise:
- Tabellen werden nach den vorgegebenen Schemata erstellt.
- Alle Datenbanknamen in kleinbuchstaben.
- Projekt nach Features strukturiert.
- Sauberer, wartbarer Code, leicht erweiterbar.



Funktionen & API-Routen

Sobald der Server läuft, können folgende POST-Requests gesendet werden:

---

1. User erstellen

Route: `"/user-create"`

Beispiel-Request-Body:
```json
{
  "username": "newUserNiuniuhniu",
  "email": "sld@domain.tld",
  "countries": ["England", "France"],
  "companies": ["Buh Corp", "Zeta Inc"],
  "groups": ["Admins"],
  "rights": ["READ", "EXECUTE"],
  "sets": ["Set C"],
  "manufacturers": ["Maker 1"]
}
```
---

2. Passwort setzen

Route: `"/user-set-password"`

Beispiel-Request-Body:
```json
{
  "token": "n9807827b148902374891273489172b123b902348907123894712b89347",
  "password": "supersecretpassword"
}
```
---

3. User nach ID updaten

Route: `"/user-update-by-id"`

Beispiel-Request-Body:
```json

{
  "user": {
    "username": "darkninja99",
    "countries": ["England", "France", "Greenland", "Italy", "Spain"],
    "companies": ["Buh Corp", "Zeta Inc", "Whatever Corp"],
    "groups": ["Admins"],
    "rights": ["READ", "EXECUTE"],
    "sets": ["Set C","Set V"],
    "manufacturers": ["Maker 1"]
  },
  "id": "0f9021a6-9a52-4979-ad5d-d0548b6f49c1"
}
```
---

4. User nach ID löschen

Route: `"/user-delete-by-id"`

Beispiel-Request-Body:
```json
{
  "id": "0f9021a6-9a52-4979-ad5d-d0548b6f49c1"
}
```
---

5. User nach ID auslesen

Route: `"/user-read-by-id"`

Beispiel-Request-Body:
```json
{
  "id": "0f9021a6-9a52-4979-ad5d-d0548b6f49c1"
}
```
---

6. Login via Email

Route: `"/user-login-via-email"`

Beispiel-Request-Body:
```json
{
  "email": "any@one.lol",
  "password": "supersecretpassword"
}
```
---

7. Login via Username

Route: `"/user-login-via-username"`

Beispiel-Request-Body:
```json
{
  "username": "darkninja",
  "password": "supersecretpassword"
}
```
---

8. Alle User auslesen

Route: `"/users-read-all"`

Beispiel-Request-Body:

{}

---


9. Neues Passwort anfordern

Route: `"/user-new-password-request"`

Beispiel-Request-Body:
```json
{
  "email": "any@one.lol"
}
```
