const Apartment = require("../Models/apartment")
const Pablisher = require("../Models/publisher")
const City = require("../Models/city")
const Category = require("../Models/category")
const CityControler = require('./city'); // Import the City module
const apartment = require("../Models/apartment");
const publisher = require("./publisher");

module.exports = {

    // createApartment: (req, res) => {
    //     // שליפת הערכים מתוך גוף הבקשה
    //     const {
    //         name,
    //         description,
    //         image,
    //         categoryId,
    //         cityId,
    //         address,
    //         numOfBed,
    //         price,
    //         publisherId
    //     } = req.body
    //     //הכנסת הערכים למשתנה חדש
    //     const newApartment = new Apartment({
    //         name,
    //         description,
    //         image,
    //         categoryId,
    //         cityId,
    //         address,
    //         numOfBed,
    //         price,
    //         publisherId
    //     })
    //     //שמירת המשתנה החדש במסד
    //     newApartment.save()
    //         .then((a) => {
    //             // הוספת קוד הדירה שנוצרה למערך הדירות בקטגוריה
    //             Category.findByIdAndUpdate(categoryId, { $push: { apartments: a._id } }, { new: true })
    //                 .then(() => {
    //                     res.status(200).send({ message: `create article ${a._id} succeed!` })
    //                 })
    //                 .catch((err) => {
    //                     res.status(500).send({ error: err.message })
    //                 })
    //             // הוספת קוד הדירה שנוצרה למערך הדירות בערים
    //             City.findByIdAndUpdate(cityId, { $push: { apartments: a._id } }, { new: true })
    //                 .then(() => {
    //                     res.status(200).send({ message: `create article ${a._id} succeed!` })
    //                 })
    //                 .catch((err) => {
    //                     res.status(500).send({ error: err.message })
    //                 })
    //             // הוספת קוד הדירה שנוצרה למערך הדירות במפרסמים
    //             Pablisher.findByIdAndUpdate(publisherId, { $push: { apartments: a._id } }, { new: true })
    //                 .then(() => {
    //                     res.status(200).send({ message: `create article ${a._id} succeed!` })
    //                 })
    //                 .catch((err) => {
    //                     res.status(500).send({ error: err.message })
    //                 })
    //         })
    //         .catch((err) => {
    //             res.status(500).send({ error: err.message })
    //         })
    // },

    createApartment: (req, res) => {
        // Retrieving the values ​​from the request body
        const {
            name,
            description,
            categoryId,
            cityId,
            address,
            numOfBed,
            price,
            publisherId
        } = req.body;
        const {path: image } = req.file
        console.log(image, name);
        // Inserting the values ​​into a new variable
        const newApartment = new Apartment({
            name,
            description,
            image: image.replace('\\', '/'),
            categoryId,
            cityId,
            address,
            numOfBed,
            price,
            publisherId
        });
    console.log("gt");
        // Saving the new variable in the database
        newApartment.save()
        .then((a) => {
            console.log("1");
            //הוספת הדירה למערך הדירות בקטגוריה המתאימה
            Category.findByIdAndUpdate(categoryId, { $push: { apartments: a._id } }, { new: true })
                .then(() => {
            console.log("2");
                    //הוספת הדירה למערך הדירות בעיר המתאימה
                    City.findByIdAndUpdate(cityId, { $push: { apartments: a._id } }, { new: true })
                        .then(() => {
            console.log("3");

                            //הוספת הדירה למערך הדירות במפרסם המתאים
                            Pablisher.findByIdAndUpdate(publisherId, { $push: { apartments: a._id } }, { new: true })
                                .then(() => {
                                    console.log("4");
                                return  res.status(200).send(a)
                                })
                                .catch((err) => {
                                    console.log("err1");
                               return  res.status(500).send({ error: err.message })
                                })
                        })
                        .catch((err) => {
                            console.log("err2");
                            return  res.status(500).send({ error: err.message })
                             })
                })
                .catch((err) => {
                    console.log("err3");
                return res.status(500).send({ error: err.message })
                })
        })
        .catch((err) => {
            console.log("err4");
          return res.status(500).send({ error: err.message })
        })
            // .then((a) => {
            //     // Update the category, city, and advertiser with the new apartment ID
            // return Promise.all([
            //         Category.findByIdAndUpdate(categoryId, { $push: { apartments: a._id } }, { new: true }),
            //         City.findByIdAndUpdate(cityId, { $push: { apartments: a._id } }, { new: true }),
            //         Pablisher.findByIdAndUpdate(publisherId, { $push: { apartments: a._id } }, { new: true }),
                    
            //     ]); 
                // console.log("jfk");
            // })
            
            // .then(() => {
                // res.status(200).send({ message: 'Apartment created successfully' });
            // })
            // .catch((err) => {
            //     res.status(500).send({ error: err.message });
            // });
    },
   
    // מחיקה לפי קוד
    remove: (req, res) => {
        Apartment.findByIdAndDelete({ _id: req.params._id })
            .then((apartment) => {
                res.status(200).send({ message: `delete category succeed!` })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },

    update: (req, res) => {
        const id = req.params._id;
        const updateParams = req.body; // This will contain the properties to be updated

        Apartment.findById(id)
            .then((apartment) => {
                if (
                    (updateParams.categoryId && updateParams.categoryId != apartment.categoryId) ||
                    (updateParams.publisherId && updateParams.publisherId != apartment.publisherId) ||
                    (updateParams.cityId && updateParams.cityId != a != apartment.cityId)
                ) {
                    return res.status(400).json({
                        message: 'Foreign key values cannot be updated.',
                    });
                }

                // Update the rest of the apartment details
                Object.assign(apartment, updateParams);
                return apartment.save();
            })
            .then((updatedApartment) => {
                res.json(updatedApartment);
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    },

    //////////////////שליפות/////////
    //שליפת כל הדירות 
    getAllApartment: (req, res) => {
        Apartment.find()
            .populate({ path: 'categoryId', select: 'nameCategory' })
            .populate({ path: 'cityId', select: 'nameCity' })
            .populate({ path: 'publisherId', select: 'phone email' })
            .then((p) => {
                res.status(200).send({ apartment: p })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },

    //פונקציה מקבלת קוד דירה ושולחת לפונקציה ממודול של ערים את קוד העיר של אותה דירה ומחזיר את כל נתוני הדירה באופן מורחב בתוספת התחזית העכשוית התחזית 
    getById: async (req, res) => {

        try {
            // const { id } =req.params._id;
            const currentApartment = await Apartment.findById(req.params._id);
            if (!currentApartment) {
                return res.status(404).send({ message: 'Apartment not found!' });
            }
            CityControler.weatherByIdCityFunc({ params: { _id: currentApartment.cityId } }, (error, weatherData) => {
                if (error) {
                    console.error(error);
                }
                Apartment.findById(req.params._id)
                    .populate({ path: 'categoryId', select: 'nameCategory' })
                    .populate({ path: 'cityId', select: 'nameCity' })
                    .populate({ path: 'publisherId', select: 'phone email' })
                    .then((p) => {
                        //מייצר משתנה חדש ושופך לו את כל תכולת הערכים ששלפנו ומוסיף לו עוד חבר מחלקה חדש המכיל את המזג האויר 
                        const updatedApartment = {
                            ...p._doc,
                            weather: weatherData
                        }
                        res.status(200).send({ apartment: updatedApartment })
                    })
                    .catch((err) => {
                        res.status(404).send({ message: `product not found!` })
                    })
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    },

    getByIdAndNumOfDay: async (req, res) => {
        try {
            const id = req.params._id;
            const numOfDay = req.params.numOfDays;
            const currentApartment = await Apartment.findById(req.params._id);
            if (!currentApartment) {
                return res.status(404).send({ message: 'Apartment not found!' });
            }
            CityControler.weatherForNextFewDays({ params: { _id: currentApartment.cityId, numOfDays: numOfDay } }, (error, weatherData) => {
                if (error) {
                    console.error(error);
                }
                Apartment.findById(req.params._id)
                    .populate({ path: 'categoryId', select: 'nameCategory' })
                    .populate({ path: 'cityId', select: 'nameCity' })
                    .populate({ path: 'publisherId', select: 'phone email' })
                    .then((p) => {
                        //מייצר משתנה חדש ושופך לו את כל תכולת הערכים ששלפנו ומוסיף לו עוד חבר מחלקה חדש המכיל את המזג האויר 
                        const updatedApartment = {
                            ...p._doc,
                            weather: weatherData
                        }
                        res.status(200).send({ apartment: updatedApartment })
                    })
                    .catch((err) => {
                        res.status(404).send({ message: `product not found!` })
                    })
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    },

    getByCategoryId: (req, res) => {
        const id = req.params._id
        console.log(id);
        Category.findOne({ _id: id })
            //מציג את כל מאפייני הדירה 
            .populate({
                path: 'apartments',
                select: '-__v' // Exclude _id and __v fields
            })
            .then((c) => {
                res.status(200).send({ apartment: c.apartments })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },

    getByCityId: (req, res) => {
        const id = req.params._id
        console.log(id);
        CityControler.weatherByIdCityFunc({ params: { _id: id } }, (error, weatherData) => {
            if (error) {
                console.error(error);
            }
            City.findOne({ _id: id })
                //מציג את כל מאפייני הדירה 
                .populate({
                    path: 'apartments',
                    select: '-__v ' // Exclude _id and __v fields
                })
                .then((c) => {
                    c.apartments.weather = weatherData
                    // const a = c.apartments.map((apartment) => {
                    //     updatedApartment = {
                    //         ...apartment._doc,
                    //         weather: weatherData
                    //     }

                    // });
                    res.status(200).send({ apartment: c.apartments })
                })
                .catch((err) => {
                    res.status(404).send({ message: `product not found!` })
                })
        });

        // catch (err) {
        //     console.error(err);
        //     return res.status(500).send({ error: 'Internal Server Error' });

    },

    getByPublisherId: (req, res) => {
        const id = req.params._id
        console.log(id);
        Pablisher.findOne({ _id: id })
            //מציג את כל מאפייני הדירה 
            .populate({
                path: 'apartments',
                select: '-__v' // Exclude _id and __v fields
            })
            .then((c) => {
                res.status(200).send({ apartment: c.apartments })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },

    //שליפות לפי כמות מיטות 
    getByNumOfBadGreader: (req, res) => {
        Apartment.find().where('numOfBed').gt(req.params.numOfBed)
            .then((a) => {
                res.status(200).send({ apartment: a })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },

    getByNumOfBadLesser: (req, res) => {
        Apartment.find().where('numOfBed').lte(req.params.numOfBed)
            .then((a) => {
                res.status(200).send({ apartment: a })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },

    getByNumOfBadEqual: (req, res) => {
        Apartment.find().where('numOfBed').eq(req.params.numOfBed)
            .then((a) => {
                res.status(200).send({ apartment: a })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },

    //שליפות לפי מחיר
    getByNumOfPriceGreader: (req, res) => {
        Apartment.find().where('price').gt(req.params.price)
            .then((a) => {
                res.status(200).send({ apartment: a })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },
    getByNumOfPriceLesser: (req, res) => {
        Apartment.find().where('price').lte(req.params.price)
            .then((a) => {
                res.status(200).send({ apartment: a })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },
    getByNumOfPriceEqual: (req, res) => {
        Apartment.find().where('price').eq(req.params.price)
            .then((a) => {
                res.status(200).send({ apartment: a })
            })
            .catch((err) => {
                res.status(404).send({ message: `product not found!` })
            })
    },












    // const updatedApartment = p.reduce((acc, property) => {
    //     return { ...acc, [property.name]: property.description, weather: weatherData };
    //   }, {});
    // const updatedApartment = p.reduce((weather, property) => {
    //     return { ...weather, [property]: Apartment[property] };
    //   }, {});   
    //         // weather:weatherData                                

    //     updatedApartment.weather = weatherData;
    //  p.newProperty = weatherData

    // aa = weatherData
    // return res.status(500).send({ error: 'Error fetching weather data' });

    // console.log(weatherData);
    // return res.status(200).send(weatherData);

    // getById:async (req, res) => {
    //     const { id } = req.body;
    //     try {
    //         const currentApartment = await Apartment.findById(id);
    //         if (!currentApartment) {
    //             res.status(404).send({ message: 'Apartment not found!' });
    //         }

    //     CityControler.weatherByIdCity({ params: { _id: currentApartment.cityId } })
    //     .then((ss) => {
    //         console.log(ss);
    //         res.status(200).send(ss.send)
    //     })
    //     .catch((err) => {
    //         res.status(404).send({error:err.message})
    //     })
    //     // {
    //             // status: (code) => {
    //             //     console.log(`Response status code: ${code}`);
    //             // },
    //             // send: (data) => {
    //             //     console.log(data);
    //                 // res.status(200).send(data);
    //         //     }
    //         // });

    //     } catch (err) {
    //         console.error(err);
    //         return res.status(500).send({ error: 'Internal Server Error' });
    //     }
    // },



    // getById: async (req, res) => {
    //     const { id } = req.body;
    //     try {
    //         const currentApartment = await Apartment.findById(id);
    //         if (!currentApartment) {
    //             res.status(404).send({ message: 'Apartment not found!' });
    //         }

    //         CityControler.weatherByIdCity({ params: { _id: currentApartment.cityId } }, {
    //             status: (code) => {
    //                 console.log(`Response status code: ${code}`);
    //             },
    //             send: (data) => {
    //                 console.log(data);
    //                 res.status(200).send(data);
    //             }
    //         });

    //     } catch (err) {
    //         console.error(err);
    //         return res.status(500).send({ error: 'Internal Server Error' });
    //     }
    // },
    // //פונקציה מקבלת קוד דירה ושולחת לפונקציה ממודול של ערים את קוד העיר של אותה דירה ומחזיר את התחזית 
    // getById: async (req, res) => {
    //     const { id } = req.body;
    //     await Apartment.findById(id)
    //         .then((currentApartment) => {
    //            const rrr = CityControler.weatherByIdCity({ params: { _id: currentApartment.cityId } })

    //             // .then((secc) => {
    //             //     res.status(200).send(secc)
    //             // })
    //             // .catch((err) => {
    //             //     res.status(404).send({ message: `product not found!` })
    //             // // })
    //             // })
    //         })
    //         .catch((err) => {
    //             res.status(404).send({ error: 'Apartment not found!' });
    //         })
    // },











    // עדכון לפי קוד
    // update: (req, res) => {
    //     const _id = req.params.id
    //     Category.findByIdAndUpdate(_id, req.body, { new: true })
    //         .then((category) => {
    //             res.status(200).send({ message: `update category ${category._id} succeed!` })
    //         })
    //         .catch((err) => {
    //             res.status(404).send({ error: err.message })
    //         })
    // }


    // router.patch( (req, res) => {
    // update: (req, res) => {
    //     const id = req.params._id;
    //     const key = false
    //     const updateParams = req.body; // This will contain the properties to be updated
    //     Apartment.findById(id)
    //         .then((apartment) => {
    //             if (updateParams.categoryId != apartment.categoryId ||
    //                 updateParams.publisherId != apartment.publisherId ||
    //                 updateParams.cityId != apartment.cityId)
    //                 // res.status(404).send({ message:' לא ניתן לבצע שינויים על מפתחות זרים שינויים אלו אינם שונו במערכת' });
    //             // console.log("לא ניתן לבצע שינויים על מפתחות זרים שינויים אלו אינם שונו במערכת");
    //             // Ensure foreign key values are not updated
    //             delete updateParams.category;
    //             delete updateParams.customer;
    //             delete updateParams.city;

    //             // Update the rest of the apartment details
    //             Object.assign(apartment, updateParams);
    //             apartment.save();
    //         })
    //         .catch((err) => {
    //             res.status(404).json({ message: error.message });

    //         })
    //     // if (!apartment) {
    //     //     return res.status(404).json({ message: 'Apartment not found' });
    //     // }

    //     }

}