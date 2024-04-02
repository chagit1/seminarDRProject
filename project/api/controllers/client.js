const client = require("../Models/client")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')


dotenv.config()

module.exports = {
    signUp: (req, res) => {
        const { email, password } = req.body
        //בדיקה עם קיים משתמש בעל מייל זהה 
        client.find({ email: { $eq: email } })
            .then((clients) => {
                if (clients.length > 0) {
                    return res.status(404).send({ message: `email has been exists already!` })
                }
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).send({ error: error.message })
                    }
                    const newClient = new client({
                        email,
                        password: hash
                    })
                    console.log(newClient);
                    newClient.save()

                    res.status(200).send({ message: `welcome to our application!`, newClient })
                })


            })


            .catch((err) => {
                res.status(500).send({ error: err.message })
            })
    },

//         //מחזיר את כל המפרסמים בעלי מייל כזה-(אחד)
//         client.find({ email: { $eq: email } })
//             .then((clients) => {
//                 const [clienter] = clients
//                 //אם אין בכלל כזה משתמש
//                 if (!clienter) {
//                     res.status(404).send({ message: `email and password are not match!` })
//                 }
//                 // //בודק אם הסיסמא אינה זהה 
//                 bcrypt.compare(password, clienter.password, (error, result) => {
//                     if (error || !result) {
//                         return res.status(500).send({ error: 'Email and password are not matches!' })
//                     }
//                     const token = jwt.sign({ email: clienter.email }, process.env.SECRET, {
//                         expiresIn: '1hr'
//                     })
//                     console.log(token);
//                     res.status(200).send({ message: `login successfuly!`, clienter, token })
//                 })
//             })
//             .catch((err) => {
//                 res.status(404).send({ error: err.message })
//             })
//     }
// }
signIn: (req, res) => {
    const { email, password } = req.body;
    
    client.find({ email: { $eq: email } })
        .then((clients) => {
            const [client] = clients; // Update variable name to client
            
            if (!client) {
                return res.status(404).send({ message: `Email and password do not match!` });
            }
            
            bcrypt.compare(password, client.password, (error, result) => {
                if (error || !result) {
                    return res.status(500).send({ error: 'Email and password do not match!' });
                }
                
                const token = jwt.sign({ email: client.email }, process.env.SECRET, {
                    expiresIn: '1hr'
                });
                
                console.log(token);
                res.status(200).send({ message: `Login successful!`, client, token });
            });
        })
        .catch((err) => {
            res.status(404).send({ error: err.message });
        });
}
}