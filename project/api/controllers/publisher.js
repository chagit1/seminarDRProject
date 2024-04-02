const Publisher = require("../Models/publisher")
// התקנת הספריה - jsonwebtoken
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

module.exports = {
    signUp: (req, res) => {

        const { email, password, phone, enothrPhone, apartments: [] } = req.body
        console.log("ttt");
        //בדיקה עם קיים משתמש בעל מייל זהה 
        Publisher.find({ email: { $eq: email } })
            .then((publishers) => {
                console.log("em");
                if (publishers && publishers.length > 0) {
                    res.status(404).send({ message: `email has been exists already!` })
                }
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        console.log("hg");
                        return res.status(500).send({ error: error.message })
                    }
                    const newPublisher = new Publisher({
                        email,
                        password: hash,
                        phone,
                        enothrPhone,
                        apartments: []
                    })
                    console.log(newPublisher);
                    newPublisher.save()
                    return res.status(200).send({ message: `login successfuly!`, newPublisher })
                })
            })
          
           
            .catch((err) => {
                res.status(500).send({ error: err.message })
            })

            // })
            // // .then((publisher) => {
            // //     res.status(200).send({ message: `welcome to our application!` })
            // // })
            // .catch((err) => {
            //     console.log("eee");
            //     res.status(500).send({ error: err.message })
            // })
    },

    // signIn: (req, res) => {
    //     const { email, password } = req.body
    //     //מחזיר את כל המפרסמים בעלי מייל כזה-(אחד)
    //     Publisher.find({ email: { $eq: email } })
    //         .then((users) => {
    //             const [newPublisher] = users
    //             //אם אין בכלל כזה מפרסם
    //             if (!newPublisher) {
    //                 res.status(404).send({ message: `email and password are not match!` })
    //             }
    //             //אם הסיסמא אינה זהה
    //             bcrypt.compare(password, newPublisher.password, (error, result) => {
    //                 if (error || !result) {
    //                     return res.status(500).send({ error: 'Email and password are not matches!' })
    //                 }
    //                 const token = jwt.sign({ email: newPublisher.email }, process.env.SECRET, {
    //                     expiresIn: '1hr'                
    //             })
    //             console.log(token);
    //             res.status(200).send({ message: `login successfuly!`, newPublisher, token })
    //         })
    //     })
    //     .catch((err) => {
    //         res.status(404).send({ error: err.message })
    //     })
    // }

    // signIn: (req, res) => {
    //     const { email, password } = req.body
    //     //מחזיר את כל המפרסמים בעלי מייל כזה-(אחד)
    //     Publisher.find({ email: { $eq: email } })
    //         .then((pablish) => {
    //             const [newPublish] = pablish
    //             //אם אין בכלל כזה משתמש
    //             if (!newPublish) {
    //                 res.status(404).send({ message: `email and password are not match!` })
    //             }
    //             // //בודק אם הסיסמא אינה זהה 
    //             bcrypt.compare(password, newPublish.password, (error, result) => {
    //                 if (error || !result) {
    //                     return res.status(500).send({ error: 'Email and password are not matches!' })
    //                 }
    //                 const token = jwt.sign({ email: newPublish.email }, process.env.SECRET, {
    //                     expiresIn: '1hr'
    //                 })
    //                 console.log(token);
    //                 res.status(200).send({ message: `login successfuly!`, newPublish, token })
    //             })
    //         })
    //         .catch((err) => {
    //             res.status(404).send({ error: err.message })
    //         })
    // }



    signIn: (req, res) => {
        const { email, password } = req.body;
        
        Publisher.find({ email: { $eq: email } })
            .then((publishers) => {
                const [publisher] = publishers;
                
                if (!publisher) {
                    return res.status(404).send({ message: `Email and password do not match!` });
                }
                
                bcrypt.compare(password, publisher.password, (error, result) => {
                    if (error || !result) {
                        return res.status(500).send({ error: 'Email and password do not match!' });
                    }
                    
                    const token = jwt.sign({ email: publisher.email }, process.env.SECRET, {
                        expiresIn: '1hr'
                    });
                    
                    console.log(token);
                    res.status(200).send({ message: `Login successful!`, publisher, token });
                });
            })
            .catch((err) => {
                res.status(404).send({ error: err.message });
            });
    }
    
}

