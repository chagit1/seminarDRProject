const jwt = require('jsonwebtoken')
const multer = require('multer')

//פונקציה שמסננת את סוגי הקבצים שאפשר להעלות
const fileFilter = (req, file, cb) => {
    //במקרה שלנו נאפשר רק קבצי בסיומת תמונה
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //true אם הקובץ מסוג מתאים נחזיר 
        cb(null, true)
    }
    //ואם לא - false
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = {

    logUrl: (req, res, next) => {
        console.log(req.url);
        next()
    },

    allowingAccess: (req, res, next) => {
        const cookies = req.headers.authorization.split(';')
        const token = cookies[1].split('=')[1]
        console.log(token);
        if (!token) {
            res.status(401).send({ message: `Authorization failed!`, error })
        }
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                res.status(401).send({ message: `Authorization failed!`, error })
            }
            // decoded = מפוענח
            if (decoded) {
                next()
            }
        })
    },

    upload: multer({
        // dest: 'uploads/',
        storage,
        //הגדרות לגבי הקובץ המועלה
        limits: {
            //2MB הקובץ יכול להיות עד גודל של 
            fileSize: 1024 * 1024 * 100
        },
        fileFilter
    })


}