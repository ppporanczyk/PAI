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
        const {rating, comment, userID, bookID} = req.body;
        if(rating <1 || rating >10){      
            return res.json({ status: 300, success: false, error: "Invalid range of rating" });
        }
        const sqlCreateBookRating = "INSERT INTO bookRating(rating, comment, userID, bookID) VALUES(?,?,?,?)";
        db.run(sqlCreateBookRating, [rating, comment, userID, bookID], (err) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });
            console.log("success input ", rating, comment);
        });
        return res.json({ status: 200, success: true });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.get("/", (req,res) => {
    sqlGetBook = "SELECT book.title, book.author, user.username, bookRating.rating, bookRating.comment FROM bookRating \
    LEFT JOIN book ON book.ID = bookRating.bookID LEFT JOIN user ON user.ID = bookRating.userID ORDER BY book.title ";
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

router.get("/:bookRatingID", (req,res) => {
    sqlGetBook = "SELECT * FROM bookRating WHERE ID = ?";
    try{
        db.get(sqlGetBook, [req.params.bookRatingID], (err, rows) => {
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

router.put("/:bookRatingID/update", (req,res) => {
    try{
        const {rating, comment} = req.body;

        const sqlUpdateBookRating = "UPDATE bookRating SET rating = ? , comment = ? WHERE ID = ?";
        db.run(sqlUpdateBookRating, [rating, comment, req.params.bookRatingID], (err) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });
            console.log("success update ", rating, comment);
        });
        return res.json({ status: 200, success: true });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.delete("/:bookRatingID/delete", (req,res) => {
    try{
        const sqlDeleteBookRating = "DELETE FROM bookRating WHERE ID = ?";
        db.run(sqlDeleteBookRating, [req.params.bookRatingID], (err) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });
            console.log("success delete");
        });
        return res.json({ status: 200, success: true });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

module.exports = router;