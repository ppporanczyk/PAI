const bcrypt = require("bcrypt")
const generateAccessToken = require("./generateAccessToken")
const express = require('express');
const router = express.Router();
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./bookweb.db",sqlite.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err);
});

router.post("/register", async (req,res) => {
    try{
        const {username, email, password} = req.body;
        const sqlGetUser = "SELECT * FROM user WHERE email = ?";
        db.all(sqlGetUser, [email], (err, rows) => {
            if (err || email==='' || username==='')         
            return res.json({ status: 302, success: false, error: err});
            if (rows.length != 0){         
                return res.json({ status: 409, success: false, error: "User already exists" });
            }
            else{
                bcrypt.hash(password,10).then((hash) =>{
                    console.log(hash)
                    const sqlCreateUser = "INSERT INTO user(username, email, password) VALUES (?,?,?)";
                    db.run(sqlCreateUser, [username, email, hash], (err) => {
                        if (err){
                            console.log("300 - creating  user");     
                            return res.json({ status: 300, success: false, error: err });
                        }
                        console.log("success register ", username, email);
                        return res.json({ status: 200, success: true });
                    });
                });
            }
        });
    } catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.post("/login", (req, res)=> {
    try{
        const {email, password} = req.body;

        const sqlLogIn = "SELECT * FROM user WHERE email = ?";
        db.all(sqlLogIn, [email], (err, rows) => {
            if (err)         
            return res.json({status: 300, success: false, error: err});

            if (rows.length < 1)         
            return res.json({status: 404, success: false, error: "Not found"});

            const hashedPassword = rows[0].password;
            const userID = rows[0].ID;

            bcrypt.compare(password, hashedPassword, (err, resCompare) => {
                console.log(password, hashedPassword);
                if (!resCompare)  
                return res.json({ status: 300, success: false, error: "Password incorrect" });
             
                const token = generateAccessToken({email: email});   
                console.log("accessToken ", token);
                console.log("success log in ",email);

                return res.json({ status: 200, data: {'accessToken': token, 'userID': userID}, success: true });
            })

        });  
    } catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.get("/:userID", (req,res) => {
    sqlGetBook = "SELECT username, \
    ( SELECT count(*) FROM bookRating WHERE bookRating.userID = user.ID ) rating_count \
    FROM user WHERE ID = ?";
    try{
        db.get(sqlGetBook, [req.params.userID], (err, rows) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });

            return res.json({ status: 200, data: rows, success: true });
        });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.get("/:userID/rating", (req,res) => {
    sqlGetBook = "SELECT bookRating.ID, book.title, book.author, bookRating.comment, bookRating.rating FROM book  \
    LEFT JOIN bookRating ON bookRating.bookID = book.ID WHERE bookRating.userID = ? ORDER BY bookRating.rating DESC";
    try{
        db.all(sqlGetBook, [req.params.userID], (err, rows) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });

            return res.json({ status: 200, data: rows, success: true });
        });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});

router.get("/:userID/rating/:bookID", (req,res) => {
    sqlGetBook = "SELECT ID, comment, rating FROM bookRating WHERE userID = ? AND bookID = ?";
    try{
        db.all(sqlGetBook, [req.params.userID,req.params.bookID], (err, rows) => {
            if (err)         
            return res.json({ status: 300, success: false, error: err });
            if (rows.length==0)         
            return res.json({ status: 404, success: false, error: "Not found" });

            return res.json({ status: 200, data: rows, success: true });
        });
    }catch (error){
        return res.json({ status: 400, success: false });
    }
});
router.delete("/:userID/delete", (req,res) => {
    try{
        const sqlDeleteBookRating = "DELETE FROM user WHERE ID = ?";
        db.run(sqlDeleteBookRating, [req.params.userID], (err) => {
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