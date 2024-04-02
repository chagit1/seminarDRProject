const city = require("../Models/city")
const axios = require('axios');
const CityControler = require('./city'); // Import the City module
const API_KEY = '96391dedb1d04b2d848132527242002'

module.exports = {
    //הוספת עיר
    createCity: (req, res) => {
        // שליפת הערכים מתוך גוף הבקשה
        const { nameCity, apartment: [] } = req.body
        const newCity = new city({
            nameCity,
            apartments: []
        })
        newCity.save()
            .then((city) => {
                res.status(200).send({ message: `create category ${city._id} succeed!` })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },

    //שליפת כל הערים 
    allCity: (req, res) => {
        city.find()
            // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
            .then((cities) => {
                res.status(200).send({ cities })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },

    //הפונקציה מקבלת קוד עיר ומספר ומחזירה את התחזית של אותה עיר בעוד מספר הימים כפי המספר שהתקבל 
    weatherForNextFewDays: (req, callback) => {
        const numOfDays = req.params.numOfDays

        city.findById({ _id: req.params._id })
            .then((newCity) => {
                //קבלת מזג אויר לפי שם עיר 
                axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${newCity.nameCity}&days=${numOfDays}`)
                    .then(response => {
                        const forecastData = response.data.forecast.forecastday[numOfDays - 1];
                        const date = forecastData.date;
                        const maxTempC = forecastData.day.maxtemp_c;
                        const minTempC = forecastData.day.mintemp_c;
                        const weatherInfo = `Date: ${date}, Max Temp: ${maxTempC}°C, Min Temp: ${minTempC}°C\n`;

                        callback(null, weatherInfo) // Send the weather data in the response
                    })
                    .catch(error => {
                        callback(error, null);
                    });
            })
            .catch((error) => {
                callback(error, null);
            });
    },

    weatherByIdCityFunc: (req, callback) => {
        console.log("ff");
        city.findById({ _id: req.params._id })
            .then((newCity) => {
                //קבלת מזג אויר לפי שם עיר 
                axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${newCity.nameCity}&days = 1`)
                    .then(response => {
                        const forecastData = response.data.forecast.forecastday[0]; // Get the forecast data for today
                        const date = forecastData.date;
                        const maxTempC = forecastData.day.maxtemp_c;
                        const minTempC = forecastData.day.mintemp_c;
                        const weatherInfo = `Date: ${date}, Max Temp: ${maxTempC}°C, Min Temp: ${minTempC}°C`;
                        callback(null, weatherInfo) // Send the weather data in the response
                    })
                    .catch(error => {
                        callback(error, null);
                    });
            })
            .catch((error) => {
                callback(error, null);
            });
    },


    // const aa = (_id) => {
    //     try {
    //         console.log("eee");
    //         const newCity = city.findById({ _id: req.params._id })
    //         // .then((newCity) => {
    //         //     console.log(newCity.nameCity);
    //         //קבלת מזג אויר לפי שם עיר 
    //         axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${newCity.nameCity}&days = 1`)
    //             .then(response => {
    //                 console.log("ccc");
    //                 const forecastData = response.data.forecast.forecastday[0]; // Get the forecast data for today
    //                 const date = forecastData.date;
    //                 const maxTempC = forecastData.day.maxtemp_c;
    //                 const minTempC = forecastData.day.mintemp_c;
    //                 console.log("ttt");
    //                 const weatherInfo = `Date: ${date}, Max Temp: ${maxTempC}°C, Min Temp: ${minTempC}°C`;
    //                 // console.log(weatherInfo.data);
    //                 return weatherInfo; // Send the weather data in the response
    //             })

    //     }
    //     catch (error) {
    //         throw new Error('Error fetching weather data');
    //     }

    //     //         .catch(error => {
    //     //           return  res.status(500).send({ error: 'Error fetching weather data' });
    //     //         });
    //     // })
    //     // .catch((err) => {
    //     //     res.status(404).send({ error: err.message }); // Send a 404 response if city is not found
    //     // });
    // }


    // weatherByIdCity: (req, res) => {
    //     // console.log("eee");
    //     aa({ _id: req.params._id })
    //     .then((succ) => {
    //         res.status(200).send(succ)
    //     })
    //     .catch((err) => {
    //         res.status(500).send({error:err.message})
    //     })
    //     // city.findById({ _id: req.params._id })
    //     //     .then((newCity) => {
    //     //         console.log(newCity.nameCity);
    //     //         //קבלת מזג אויר לפי שם עיר 
    //     //         axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${newCity.nameCity}&days = 1`)
    //     //             .then(response => {
    //     //                 console.log("ccc");
    //     //                 const forecastData = response.data.forecast.forecastday[0]; // Get the forecast data for today
    //     //                 const date = forecastData.date;
    //     //                 const maxTempC = forecastData.day.maxtemp_c;
    //     //                 const minTempC = forecastData.day.mintemp_c;
    //     //                 console.log("ttt");
    //     //                 const weatherInfo = `Date: ${date}, Max Temp: ${maxTempC}°C, Min Temp: ${minTempC}°C`;
    //     //                 // console.log(weatherInfo.data);
    //     //                return res.status(200).send(weatherInfo); // Send the weather data in the response
    //     //             })
    //     //             .catch(error => {
    //     //               return  res.status(500).send({ error: 'Error fetching weather data' });
    //     //             });
    //     //     })
    //     //     .catch((err) => {
    //     //         res.status(404).send({ error: err.message }); // Send a 404 response if city is not found
    //     //     });
    // },

    //הפונקציה מקבלת קוד עיר ומספר ומחזירה את התחזית של אותה עיר בעוד מספר הימים כפי המספר שהתקבל 
    //  weatherForNextFewDays: (req, res) => {
    //     const { id, numOfDays } = req.body
    //     //מוצא את העיר לפי הקוד שהתקבל 
    //     city.findById(id)
    //         .then((newCity) => {
    //             //מחזיר כמות של תחזיות ככמות שהתקבל 
    //             axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${newCity.nameCity}&days=${numOfDays}`)
    //                 .then(response => {
    //                     //בוחר רק את היום האחרון
    //                     const forecastData = response.data.forecast.forecastday[numOfDays - 1];
    //                     const date = forecastData.date;
    //                     const maxTempC = forecastData.day.maxtemp_c;
    //                     const minTempC = forecastData.day.mintemp_c;
    //                     const weatherInfo = `Date: ${date}, Max Temp: ${maxTempC}°C, Min Temp: ${minTempC}°C\n`;

    //                     //אם רוצים שיוצג כל התחזיות של כל הימים עד מס' היום שהתקבל יש להוריד את האינדקס ולעבור בלולאה על כל המערך 
    //                     //ואז הכתיבה תראה כך
    //                     //   const forecastData = response.data.forecast.forecastday;
    //                     //   let weatherInfo = '';

    //                     //   forecastData.forEach(day => {
    //                     //       const date = day.date;
    //                     //       const maxTempC = day.day.maxtemp_c;
    //                     //       const minTempC = day.day.mintemp_c;

    //                     //       weatherInfo += `Date: ${date}, Max Temp: ${maxTempC}°C, Min Temp: ${minTempC}°C\n`;
    //                     //   });

    //                     res.status(200).send(weatherInfo); // Send the weather forecast for the specified days in the response
    //                 })
    //                 .catch(error => {
    //                     res.status(500).send({ error: 'Error fetching weather data' });
    //                 });
    //         })
    //         .catch((err) => {
    //             res.status(404).send({ error: err.message }); // Send a 404 response if city is not found
    //         });
    // },   



}