export class Hotel {
    data = {
        type: 'hotels',
        id: '11',
        attributes: {
                has_wifi: false,
                has_parking: false,
                has_pets: false,
                has_restaurant: false,
                has_bar: false,
                has_swimming_pool: false,
                has_air_conditioning: false,
                has_gym: false,
                name: '',
                main_image_src: 'https://placebear.com/300/300',
                meal_plan: '',
                user_id: '1',
                booking_id: '1',
                amount: '5000',
                currency: 'HUF',
                status: 'pending',
                stars: '',
                location: ''
        }
    };

    hotelList: any = [];
    hotelWithId;
}
