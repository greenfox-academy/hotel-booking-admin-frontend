'use strict';

const createHotels = require('./hotel-generator')

const MockServer = function(app) {

    const setHotel = createHotels()
    const hotel1 = setHotel.setAttributes()
    const hotel2 = setHotel.setAttributes()
    const hotel3 = setHotel.setAttributes()
    const hotel4 = setHotel.setAttributes()
    const hotel5 = setHotel.setAttributes()
    const hotel6 = setHotel.setAttributes()
    const hotel7 = setHotel.setAttributes()

    const path = require('path');

    const user = {
        data: {
            type: 'user',
            attributes: {
                email: 'test@example.com',
                password: '1234'
            }
        }
    };

    let user2 = {
          data: {
            type: 'user',
            attributes: {
                email: '',
                password: ''
            }
        }
    };

    const validResponse = {
        data: {
           type: "user",
           attributes: {
             id: "1",
             email: "john.doe@example.org",
             admin: false,
             token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3RBZG1pbiIsImFkbWluIjp0cnVlfQ.nhC1EDI5xLGM4yZL2VMZyvHcbcWiXM2RVS7Y8Pt0Zuk'
           }
       }
    };

    const invalidResponse = {
        errors: [{
            status: 400,
            title: 'Bad Request',
            detail: 'Mismatched email and password'
        }]
    };

    let regResponse = {
        data: {
            type: '',
            attributes: {
                id: 2,
                email: '',
                admin: 'false',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUub3JnIiwiYWRtaW4iOmZhbHNlfQ.UK8Z1BNeHWvaFElWrrSxhO6oxTRaMW_66DO5yjkqOhM'
            }
        }
    };

    let hotelResponse = {
        links: {
            self: 'https://two-ferns.glitch.me/hotels/'
        },
        data: [{
            type: 'hotels',
            id: '1',
            attributes: {
                location: 'Bone City',
                name: 'Dog Heaven',
                main_image_src: 'http://placebacon.net/300/300?image=1',
                has_wifi: true,
                has_parking: false,
                has_pets: true,
                has_restaurant: false,
                has_bar: false,
                has_swimming_pool: false,
                has_air_conditioning: false,
                has_gym: true,
                meal_plan: 'american plan',
                user_id: '1',
                booking_id: '1',
                amount: '50',
                currency: 'USD',
                status: 'pending',
                stars: '3'
            }
        }, {
            type: 'hotels',
            id: '2',
            attributes: {
                location: 'near Sirius',
                name: 'Space Hotel',
                main_image_src: 'https://placebear.com/300/300',
                has_wifi: true,
                has_parking: true,
                has_pets: true,
                has_restaurant: true,
                has_bar: true,
                has_swimming_pool: false,
                has_air_conditioning: true,
                has_gym: true,
                meal_plan: 'continental plan',
                user_id: '2',
                booking_id: '1',
                amount: '50',
                currency: 'USD',
                status: 'pending',
                stars: '5'
            }
        }, {
            type: 'hotels',
            id: '3',
            attributes: {
                location: 'Berlin',
                name: 'Hotel Kaiser Wilhelm II.',
                main_image_src: 'http://placebacon.net/300/300?image=1',
                has_wifi: false,
                has_parking: true,
                has_pets: false,
                has_restaurant: true,
                has_bar: false,
                has_swimming_pool: false,
                has_air_conditioning: false,
                has_gym: true,
                meal_plan: '',
                user_id: '2',
                booking_id: '1',
                amount: '50',
                currency: 'USD',
                status: 'pending',
                stars: '2'
            }
        }, {
            type: 'hotels',
            id: '4',
            attributes: hotel1
        }, {
            type: 'hotels',
            id: '5',
            attributes: hotel2
        }, {
            type: 'hotels',
            id: '6',
            attributes: hotel3
        }, {
            type: 'hotels',
            id: '7',
            attributes: hotel4
        }, {
            type: 'hotels',
            id: '8',
            attributes: hotel5
        }, {
            type: 'hotels',
            id: '9',
            attributes: hotel6
        }, {
            type: 'hotels',
            id: '10',
            attributes: hotel7
        }]
    };

    let rowHotel = {
      links: {
            self: 'https://two-ferns.glitch.me/hotels/'
      }
    }

    const hotelError = {
        errors: [{
            status: '404',
            title: 'Not Found',
            detail: 'No hotels found by id: 1'
        }]
    }

    app.post('/api/login/', (req, res) => {
        const email = req.body.data.attributes.email;
        const password = req.body.data.attributes.password;
        if ((email === user.data.attributes.email && password === user.data.attributes.password) || (email === user2.data.attributes.email && password === user2.data.attributes.password)) {
            res.send(validResponse);
        } else {
            res.status(400).send(invalidResponse);
        }
    });

    app.post('/api/register/', (req, res) => {
        regResponse.data.type = req.body.data.type;
        regResponse.data.attributes.email = req.body.data.attributes.email;
        user2.data.attributes.email = req.body.data.attributes.email;
        user2.data.attributes.password = req.body.data.attributes.password;
        res.status(201).send(regResponse);
    });

    app.get('/api/hotels/', (req, res) => {
        res.send(hotelResponse);
    });

    app.post('/api/hotels/', (req, res) => {
          let newHotel = Object.assign(rowHotel, req.body);
          newHotel.data.id = 11;
          hotelResponse.data.push(newHotel.data);
          res.status(201).send(newHotel);
    });

      app.post('/api/hotels2/', (req, res) => {
        if (req.body[0].adults) {
         res.status(201).send(hotelResponse);
        }
    });

    app.get('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        hotelResponse.data.forEach((hotel) => {
            if (hotelID === hotel.id) {
                let oneHotel = {
                    links: {
                        self: 'https://two-ferns.glitch.me/hotels/1'
                    },
                    data: hotel
                }
                res.status(200).send(oneHotel);
            }
        });
        res.status(404).send(hotelError);
    });

     app.delete('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        hotelResponse.data.forEach((hotel, index) => {
            if (hotelID === hotel.id) {
                hotelResponse.data = hotelResponse.data.filter(e => e !== hotel)
                res.status(200).send(hotelResponse.links);
            }
        });
        res.status(404).send(hotelError);
    });

    app.patch('/api/hotels/:id', (req, res) => {
        const hotelID = req.params.id;
        hotelResponse.data.forEach((hotel, index) => {
            if (hotelID === hotel.id) {
                let oneHotel = {
                    links: {
                        self: 'https://two-ferns.glitch.me/hotels/1'
                    },
                    data: req.body
                };
                hotelResponse.data.splice(index, 1, req.body);
                res.status(200).send(oneHotel);
            }
        });
        res.status(404).send(hotelError);
    });
};

module.exports = MockServer;
