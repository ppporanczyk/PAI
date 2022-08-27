const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("./bookweb.db",sqlite.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err);
});

const delete_all= 'DELETE FROM bookRating'
// db.run(delete_all);

const sql = 'CREATE TABLE book(ID INTEGER PRIMARY KEY, title varchar(255) NOT NULL \
, author varchar(255) NOT NULL, rating DEFAULT 0)';
// db.run(sql);

const sql_user = 'CREATE TABLE user(ID INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255) NOT NULL \
, email varchar(255) NOT NULL, password varchar(255) NOT NULL)';
// db.run(sql_user);

const sql_rating = 'CREATE TABLE bookRating (ID INTEGER PRIMARY KEY, rating tinyint NOT NULL, comment TEXT,\
     userID INTEGER, bookID INTEGER, FOREIGN KEY(userID) REFERENCES user(ID), FOREIGN KEY(bookID) REFERENCES book(ID))';
// db.run(sql_rating);

const sql_user_filled = 'INSERT INTO user(username, email, password) VALUES (\
    "dizajner", "dizajner@wp.pl", "dizajner123"),\
    ("nowyUzytkownik", "nowyUzytkownik@wp.pl", "nowyUzytkownik456"), \
    ("SzopGracz", "SzopGracz@wp.pl", "SzopGracz!"), \
    ("button_clicker", "buttonclicker@wp.pl", "cliiicker")';
// db.run(sql_user_filled);

const sql_book_filled = 'INSERT INTO book(title, author) VALUES (\
    "Pięciodniowy sprint. Rozwiązywanie trudnych problemów i testowanie pomysłów ", "Jake Knapp, John Zeratsky, Braden Kowitz"),\
("Metoda Lean Startup. Wykorzystaj innowacyjne narzędzia i stwórz firmę, która zdobędzie rynek", "Eric Ries"),\
 ("Badania jako podstawa projektowania user experience ", "Barbara Rogoś-Turek, Iga Mościchowska"),\
  ("Programiści i tłumacze. Wprowadzenie do lokalizacji oprogramowania", "Marta Bartnicka, Agenor Hofmann-Delbor"),\
("Hidden Figures: The American Dream and the Untold Story of the Black Women Who Helped Win the Space Race", "Margot Lee Shetterly"),\
 ("Dizajn na co dzień", "Don Norman"),\
  ("Architektura informacji w serwisach internetowych", "Louis Rosenfeld, Peter Morville"),\
("Living in information architecture", "Jorge Arango"),\
 ("Web typography", "Richard Rutter"),\
  ("Nie każ mi myśleć", "Steve Krug"),\
("Emotional Design: Why We Love (or Hate) Everyday Things", "Donald Norman"),\
 ("The Elements of User Experience: User-centered Design for the Web", "Jesse James Garrett"),\
  ("Designing for Interaction: Creating Innovative Applications and Devices", "Dan Saffer"),\
("Web Form Design i Mobile First", "Luke Wroblewski"), \
("Responsive Web Design", "Ethan Marcotte"), \
("100 Things Every Designer Needs to Know About People", "Susan Weinschenk")';
// db.run(sql_book_filled);

const sql_rating_filled = 'INSERT INTO bookRating(rating, comment, userID, bookID) VALUES \
(2,"Nam sit amet felis sed dolor volutpat scelerisque. Pellentesque suscipit augue mattis eleifend pellentesque. Phasellus congue et magna eget congue. Nunc eu ex venenatis, lacinia dolor vel, suscipit nibh. Donec vehicula tempus nisi bibendum ultricies. Cras a lectus pellentesque, tempus tortor non, consequat dolor. Curabitur ultrices nec velit ut pretium.",16,1),\
(4,"Nam lobortis, mauris non volutpat ultricies, turpis ipsum finibus nunc, a egestas nisi ipsum quis dui. Pellentesque vitae erat a urna dapibus pellentesque. Sed ut odio elit. Nullam sed lectus ut urna faucibus luctus. Nullam at dui in leo congue laoreet. Pellentesque iaculis eros ut malesuada pharetra. Sed turpis ligula, scelerisque ac lacus ac, faucibus lobortis libero. Morbi condimentum diam libero, ac rhoncus urna sodales eu. Suspendisse erat enim, semper congue diam et, accumsan efficitur.",17,2),\
(6,"Pellentesque consectetur, lacus sed scelerisque dapibus, ipsum justo tincidunt nisi, vehicula pulvinar risus diam et purus. Duis a justo convallis mauris vehicula maximus. Quisque vitae purus ornare, pulvinar nunc in, hendrerit leo. Nunc sodales varius orci vitae malesuada. Nam volutpat urna ut tellus ullamcorper condimentum. Ut euismod sapien urna, nec scelerisque magna aliquet at. Nulla blandit congue commodo. Maecenas auctor a mauris malesuada semper. Ut eu ipsum tincidunt, volutpat ligula ac, lobortis erat. Sed ut gravida lacus. Sed vel tellus dolor. Curabitur feugiat mi eu fermentum volutpat.",18,3),\
(8,"Morbi in pharetra ipsum, eu consequat turpis. Maecenas purus felis, viverra eget eros ut, eleifend tristique enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ut efficitur nulla. Maecenas quis sodales mi.",19,4),\
(10,"Fusce ac magna turpis. Donec porttitor bibendum nulla at luctus. Nunc eleifend fringilla tortor in accumsan. Phasellus nec vestibulum eros, ac euismod massa. Proin vestibulum ultrices purus eu ultricies. Duis venenatis nunc sed suscipit mattis. Sed non finibus nulla. Etiam dapibus, nunc vel feugiat mattis, ex ligula porttitor leo, feugiat volutpat tortor purus vitae ligula. Curabitur sit amet pellentesque risus, non mattis sem. Aenean consequat sem non libero suscipit molestie. Maecenas tellus leo, semper vel lorem eu, convallis consequat sapien. Morbi nec faucibus arcu, non sodales nulla. Suspendisse ac porttitor arcu, et sodales purus.",16,5),\
(9,"Vivamus consequat finibus lectus, finibus condimentum dolor. Ut lobortis nulla bibendum ante tristique, vel gravida lectus sodales. Quisque efficitur mauris vitae dapibus auctor. Proin posuere ultricies mollis. Praesent tincidunt bibendum turpis.",17,6),\
(7,"Praesent laoreet tortor finibus tortor aliquet, ac pulvinar ante feugiat. Ut condimentum ligula ut magna euismod, vitae ultricies mi efficitur. Cras varius augue et erat egestas, sed egestas lorem volutpat. Phasellus a consectetur dolor. Fusce facilisis felis ante. Mauris dictum ultricies enim, eget commodo dui convallis in. Fusce nec lobortis nibh, sed feugiat leo. Nam id scelerisque tortor, in ullamcorper sem. Sed at dui laoreet, vulputate augue scelerisque, ornare ante. Integer aliquet fermentum diam, non luctus purus maximus in.",18,7),\
(5,"Curabitur ultricies pellentesque lacus in varius. Quisque malesuada massa quis risus porttitor aliquam. Sed in lacus tellus. Nulla eu tincidunt ante, ac congue sapien. Mauris consequat efficitur ligula nec laoreet. Morbi tempor quis neque ut laoreet. Quisque in arcu eget nisl auctor pellentesque ut quis dolor. Nunc vulputate dapibus sem, ac posuere massa.",19,8),\
(3,"Ut blandit tellus lorem, eu sagittis sapien condimentum vel. Mauris volutpat quam orci, vitae molestie risus scelerisque id. Nullam sit amet metus faucibus, semper eros id, rutrum justo. Morbi ipsum lacus, aliquam ut placerat a, rhoncus et orci. Vestibulum facilisis, quam et sagittis dictum, nisl velit varius lectus, tempor tempor sapien nunc ut dui. Suspendisse aliquet diam vitae ex mollis vehicula. Morbi in ullamcorper diam, sit amet viverra sapien.",16,9),\
(1,"Morbi vel nulla nec enim accumsan euismod. Phasellus vitae dolor purus. Donec et efficitur eros. Proin imperdiet, lorem sed dignissim rhoncus, ex urna maximus magna, at efficitur nibh sem nec magna. Nam et diam semper, imperdiet velit vel, consectetur nibh. Nullam et accumsan arcu. Donec vel tempus magna. Mauris at urna tristique, luctus augue sed, imperdiet magna. Etiam suscipit ex ac efficitur semper. In hac habitasse platea dictumst. Cras mattis, nulla sit amet dictum cursus, ligula lacus venenatis neque, sit amet tincidunt sem sapien ac ligula. Vestibulum volutpat congue placerat. Sed dignissim sagittis suscipit.",17,10),\
(3,"Aenean tincidunt dui eu erat malesuada aliquam. Praesent volutpat sed nisi quis porttitor. Suspendisse imperdiet interdum nulla. Nullam interdum diam sed venenatis hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras euismod risus dignissim, vehicula nibh at, cursus diam. Phasellus vulputate in mi at commodo. Donec molestie nulla pulvinar nulla euismod dapibus. Nullam sit amet commodo tortor.",18,11),\
(6,"Suspendisse bibendum congue libero. Nam et vehicula ante. Nulla et ligula tincidunt erat sollicitudin facilisis sed nec purus. In hac habitasse platea dictumst. In at ligula non diam commodo scelerisque sit amet fermentum nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam ultricies nibh at tortor laoreet feugiat. Quisque bibendum tempor risus et eleifend.",19,12),\
(9,"Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus in euismod magna. Donec rutrum lorem eget dolor consequat, et ornare diam pulvinar. Vivamus at nisi mollis, ornare magna lobortis, vehicula arcu. Vivamus porttitor diam neque, non consectetur ligula venenatis quis. Nunc nec finibus est. Phasellus facilisis sit amet nulla id semper. Vivamus iaculis lorem at fermentum suscipit. Cras elementum, nisi nec viverra accumsan, lectus sem pellentesque dui, et lobortis ante ligula vel erat. Phasellus efficitur maximus dolor id rhoncus. Nunc eget lobortis sem. Nunc non porttitor quam. Curabitur pellentesque feugiat dui, et dictum lacus consequat nec. Aenean ut feugiat nibh, quis bibendum enim.",16,13),\
(8,"Curabitur mattis ipsum non nibh suscipit blandit. Ut molestie posuere tellus sit amet rutrum. Morbi at imperdiet nunc, ac sollicitudin sem. Aliquam erat volutpat. Sed neque ligula, vehicula accumsan nunc sed, tristique consequat diam. Morbi hendrerit enim quis pulvinar consectetur. Cras sodales dolor et interdum suscipit. Cras id tempor eros. Aliquam consequat orci ac lobortis suscipit.",17,1),\
(4,"Aliquam erat volutpat. Fusce pulvinar imperdiet vulputate. Integer leo erat, dignissim et dictum et, molestie eget ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis felis nisl. Duis ac tortor ut mi ultricies pharetra nec nec diam. Vivamus lectus odio, aliquam ac imperdiet eget, aliquet consectetur metus. Praesent in lectus vel ante euismod finibus. Morbi ac enim ornare, pharetra est ac, fermentum augue. Duis eget justo quis nibh pulvinar vestibulum vitae pharetra elit. Etiam lobortis orci ipsum, convallis rhoncus est posuere a. Sed odio ipsum, rutrum ut mollis ac, rutrum non lorem. In ac vulputate urna. Curabitur volutpat scelerisque mi nec ullamcorper. Nullam varius orci vitae lorem posuere efficitur. Nam sit amet posuere dui.",18,2),\
(2,"Donec tempor vel libero eu tempus. Quisque cursus mattis gravida. Ut suscipit tincidunt mauris id posuere. Phasellus gravida at odio at volutpat. Mauris pharetra risus ac metus gravida, non congue leo mollis. Duis tortor metus, ullamcorper in elementum id, faucibus at mi. Cras vel velit et diam porta interdum sed ac tortor. Duis in suscipit turpis, gravida pellentesque nisi. Quisque at risus non magna vestibulum iaculis. Donec mollis augue accumsan, semper dui eu, tincidunt augue. Sed sit amet volutpat nunc, sed placerat velit. Pellentesque auctor metus nec ullamcorper fringilla.",19,3),\
(7,"Cras vehicula mollis nulla eget lacinia. Quisque nec pharetra nulla. Nunc quis elit sed turpis imperdiet ultrices eget vitae ex. Praesent pretium lobortis mi, a euismod justo egestas ut. Vestibulum ullamcorper vel metus et lacinia. Vestibulum ut nunc at enim pulvinar aliquam. Sed tempor nec lectus vitae pretium. Nunc lobortis scelerisque enim id scelerisque.",18,1),\
(5,"Mauris nec scelerisque erat, vitae imperdiet quam. Aliquam posuere, justo sagittis vestibulum pellentesque, turpis nisi venenatis ante, vel lacinia urna elit at diam. Nam lacinia tempor fermentum. Sed porta fermentum magna, non ornare ligula euismod ut. Cras consequat a turpis sit amet accumsan. Integer non vestibulum sapien. Maecenas in diam sodales nulla pulvinar viverra et non sapien. Duis eu nisi ipsum. Integer quis mattis ligula, in mollis libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vestibulum est ut pretium pellentesque. Duis efficitur lacus eget nibh rutrum fermentum. Cras facilisis at elit ac sodales.",19,2),\
(6,"Vivamus tristique auctor nisi, sed mattis lectus. Quisque ac fermentum elit. Aliquam egestas elit nec diam lacinia, id pharetra libero feugiat. Morbi malesuada rhoncus iaculis. Vestibulum porttitor tempor dui, eu aliquet dui cursus ut. In sollicitudin leo nisi, id placerat est rhoncus quis. Suspendisse id sem volutpat, pharetra odio vel, tincidunt ex.",19,1)';
// db.run(sql_rating_filled);