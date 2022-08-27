const express = require('express');
const router = express.Router();
const sqlite = require('sqlite3').verbose();
const res = require("express/lib/response");
const url = require("url")

const db = new sqlite.Database("./bookweb.db",sqlite.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err);
});

router.post("/", (req,res) => {
    try{
        const {title, author} = req.body;

        const sqlCreateBook = "INSERT INTO book(title, author) VALUES(?,?)";
        db.run(sqlCreateBook, [title, author], (err) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });
            console.log("success input ",title, author);
        });
        return res.json({ status: 200, success: true });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.get("/", (req,res) => {
    sqlGetBook = "SELECT book.ID, book.title, book.author, round(avg(bookRating.rating),2) avg_rating FROM book \
    LEFT OUTER JOIN bookRating ON book.ID = bookRating.bookID GROUP BY book.ID ";
    try{
        db.all(sqlGetBook, [], (err, rows) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });

            if (rows.length < 1)         
            return res.json({ status: 300, success: false, error: "No match" });

            return res.json({ status: 200, data: rows, success: true });
        });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.get("/:bookID", (req,res) => {
    sqlGetBook = "SELECT book.title, book.author, count(bookRating.bookID) rating_count FROM book \
    LEFT JOIN bookRating ON bookRating.bookID = book.ID WHERE book.ID = ? GROUP BY book.ID";
    
    try{
        db.get(sqlGetBook, [req.params.bookID], (err, rows) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });

            return res.json({ status: 200, data: rows, success: true });
        });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.get("/:bookID/rating", (req,res) => {
    sqlGetBook = "SELECT bookRating.ID, user.username, bookRating.rating, bookRating.comment FROM bookRating \
    LEFT JOIN user ON user.ID = bookRating.userID WHERE bookRating.bookID = ? ";
    try{
        db.all(sqlGetBook, [req.params.bookID], (err, rows) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });

            if (rows.length == 0)         
            return res.json({ status: 300, success: false, error: "Not found" });

            return res.json({ status: 200, data: rows, success: true });
        });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

module.exports = router;