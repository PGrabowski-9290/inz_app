# System wspomagający pracę komisu samochodowego
Aplikacja stworzona na potrzeby pracy dyplomowej  
Autor : [Paweł Grabowski](https://github.com/PGrabowski-9290)
---
# Aplikacja 
Do aplikacji wymagane jest zainstalowane środowisko uruchomieniowe `nodejs 18 LTS`  
Baza danych jako MongoDB minimalna wersja silnika serwera mongo `4.x`


### Konfiguracja serwera
Główna konfiguracja aplikacji została zawarta w poniższym pliku, jest on wymagana w celu poprawnego działania aplikacji  
W głównym folderze aplikacji należy utworzyć plik `.env` z następującymi wartościami: 
```env
#API PORT
PORT=
#secret keys for token and refresh token
SECRET=
REFRESH_SECRET=
#expires token (values in seconds def 900)
EXPIRE_TOKEN=
EXPIRE_REF_TOKEN=
#db connection string
MONGO_URI=
#System Administrator Account
EMAIL=
PASSWD=
#mailer
SMTP=
SMTP_PORT=
SECURE=
USER=
PASS=
```
#### Poszczególne atrybuty pliku env:
#### konfiguracja aplikacji  
`PORT` - port aplikacji backend  
`SECRET` - klucz prywatny dla tokenu dostępu  
`REFRESH_SECRET` - klucz prywatny dla tokenu odświeżającego  
`EXPIRE_TOKEN` - czas w milisek po jakim token dostępu wygasa  
`EXPIRE_REF_TOKEN` - czas w milisek po jakim token odświeżający wygasa  

#### Połączenie do bazy danych  
`MONGO_URI` - adres URI z dostępem do bazy MongoDB  

#### Dane logowania superadministrotara
konto tworzone podczas wdrożenia aplikacji i instalacji bazy  

`EMAIL` - adres email używany do konfiguracji administratora systemu  
`PASSWD` - hasło do administratora systemu  

#### konfiguracja wysyłki komunikatów mailowych 

`SMTP` - serwer smtp  
`SMTP_PORT` - port serwera smtp  
`SECURE` - wartość boolean, domyślnie `false`, dla połączeń SSL (port 465) należy użyć wartości `true`  
`USER` - dane logowania do serwera SMTP, z tego adresu również będą wysyłane maile    
`PASS` - hasło logowania do serwera SMTP  

---

### Plik konfiguracjny CORS
plik z listą dozwolonych adresów:  
`/config/allowedOrigins.js`  
Do pliku w tablicy należy dopisać adres serwera na którym jest hostowana aplikacja, oraz adres aplikacji klienta

---

### Konfiguracja klienta
plik konfiguracyjny dla aplikacji frontend jest w katalogu `/client/config.json`. Zawartość pliku:
```json
{
  "SERVER_API_URL":"http://localhost:5050"
}
```
`SERVER_API_URL` - adres serwera z aplikacją backend

---

## Skrypty 
skrypty wykonujmy przez polecenie `npm run` z konsoli w głównym folderze z aplikacją


### `setup`
Instalacja wymaganych pakietów dla klienta oraz serwera
### `setubDb`
Konfiguracja bazy danych, utworzenie i dodanie wymaganych danych do poszczególnych tabel, utworzenie konta typu `superAdmin` w systemie
### `dev`
uruchomienia serwera i klienta w trybie deweloperskim
### `server`
uruchomienie serwera w trybie deweloperskim
### `debug`
uruchmienie serwera w trybie debugowania
### `client`
uruchmienie klienta w trybie deweloperskim  

---
