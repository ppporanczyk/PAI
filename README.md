# PAI_BookWeb
Projekt ma na celu stworzenie platformy do swobodnej wymiany opinii na temat księgozbioru, który jest mało dostępny, a co za tym idzie, trudno o pozyskanie recenzji czytelników na temat tych pozycji. Przykładową grupą odbiorców byliby designerzy UX/UI. Książki dostępne dla ludzi z tej branży zwykle nie są powszechnie dostępne w bibliotekach, brakuje rzetelnych opinii na stronach autorów, a ich koszty zakupu są bardzo wysokie. Aplikacja pozwoliłaby zasięgnąć opinii wśród bardziej doświadczonych kolegów z branży, a co za tym idzie, podjąć właściwy zakup. Oprócz recenzji opisowej zawarte jest podsumowanie  w postaci liczbowej (w skali 1-10), które składa się na średnia liczba ocen wszystkich recenzujących.<br />
Aplikacja oparta jest na strukturze MVC: posiada trzy modele (użytkownika, książki oraz recenzji), na których opiera się cały schemat bazy danych (patrz niżej), część backendowa pełni rolę kontrolera w komunikacji  na linii baza danych-widok, a frontendowa jest skupiona na interfejsie aplikacji. <br />
 ![image](https://user-images.githubusercontent.com/60820160/187030316-d67e72ac-d220-4046-b512-86a289778593.png)

Projekt składa się de facto z dwóch aplikacji: backendowej (Node.js, express.js), która komunikuje się z bazą danych (SQLite) oraz frontendowej (React), która odpowiada za widok serwisu. Komunikacja pomiędzy nimi  (axios API) jest oparta na RESTowych żądaniach.<br />
<b>[pogrubione żądania wymagają zalogowania się]</b><br />
Użytkownik:<br />
POST user/register => wymaga ustawienia nazwy użytkownika, hasła oraz unikalnego adresu email (niewystępującego w bazie danych). Hasło zostaje zapisane w postaci hasha (bcrypt).<br />
POST user/login => wymaga wprowadzenia adresu email występującego w bazie oraz hasła, które będzie zgodne z odkodowanym hashem przypisanym do tego maila. Zwraca ID użytkownika.<br />
<b>GET user/:userID</b> => otrzymujemy nazwę użytkownika oraz liczbę zrecenzowanych przez niego pozycji.
Widok książek:<br />
GET book/ => otrzymujemy dane na temat wszystkich książek w bazie wraz ze średnią otrzymanych ocen.<br />
GET book/:bookID => otrzymujemy dane na temat książki o danym ID w bazie wraz ze liczbą otrzymanych ocen.<br />
Wystawienie recenzji:<br />
<b>POST rating/</b> => użytkownik może wystawić liczbową oraz opisową recenzję.<br />
<b>GET user/:userID/rating/:bookID</b> => żądanie sprawdza, czy pozycja już została zrecenzowana przez użytkownika (każdy użytkownik może wystawić tylko jedną recenzję na książkę)<br />
<b>DELETE rating/:ratingID/delete</b> => użytkownik może skasować swoją recenzję książki  (co pozwoli mu np. na wystawienie nowej)<br />
Widok recenzji:<br />
<b>GET user/:userID/rating</b> => użytkownik może zobaczyć swoje recenzje<br />
GET book/:bookID/rating => umożliwia zobaczenia wszystkich recenzji danej książki<br />
Aplikacja pozwala na podstawowe użytkowanie, tj. założenie konta i recenzowanie przedstawionych pozycji, jednak nadal jest w pełni otwarta na rozwój innych funkcjonalności. Poprawie może ulec (o ironio) UX/UI serwisu, ale poszczególne komponenty mogą ulec rozwinięciu, np. powstanie profilu użytkownika, czy rozszerzenie opisu książki. Z pewnością podwyższyłoby to atrakcyjność aplikacji.<br />
