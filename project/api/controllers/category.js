const Category = require("../Models/category")
const apartment = require("./apartment")

module.exports = {
    createCategory: (req, res) => {
        // שליפת הערכים מתוך גוף הבקשה
        const { nameCategory, apartment:[] } = req.body
        const newCategory = new Category({
            nameCategory,
            apartment:[]
        })
     // שמירה מתבצעת על שם האובייקט
     newCategory.save()
     // בהצלחה מתקבל האובייקט החדש שנוצר (עם הקוד שלו)
     .then((category) => {
         res.status(200).send({ message: `create category ${category._id} succeed!` })
     })
     .catch((err) => {
         res.status(404).send({ error: err.message })
     })
},

    allCategory: (req, res) => {
        Category.find()
            // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
            .then((categories) => {
                res.status(200).send({ categories })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    
    // getAllApartment: (req, res) => {
    //    Apartment.findById({ _id: req.params.id })
    //         .then((p) => {
    //             res.status(200).send({ product: p })
    //         })
    //         .catch((err) => {
    //             res.status(404).send({ message: `product not found!` })
    //         })
    // },
   
   }