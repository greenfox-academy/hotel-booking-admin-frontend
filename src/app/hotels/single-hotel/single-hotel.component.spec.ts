import { async, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { 
    HttpModule,
    XHRBackend,
    ConnectionBackend, 
    ResponseOptions,
    Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


// import { SingleHotelComponent } from './single-hotel.component';
import { HotelService } from '../hotel.service';
// import { GetHotelsService } from '../get-hotels.service';
import { HttpService } from '../../httprequest.service';

describe('HttpService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ 
                HttpModule, 
                ],
            providers: [
                HotelService, 
                HttpService,
                { provide: XHRBackend, useClass: MockBackend}
                ]
        })
        .compileComponents();
    }));

    describe('SingleHotel()', () => {
        it('should return an Observable<Comment[]> with chosen hotel details', inject([HttpService, XHRBackend], (HttpService, MockBackend) => {
            const mockRequest = {
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
                    hsa_gym: false,
                    name: '',
                    main_image_src: 'https://placebear.com/300/300',
                    meal_plan: '',
                    user_id: '1',
                    booking_id: '1',
                    amount: '5000',
                    currency: 'HUF',
                    status: 'pending',
                    stars: ''
                }                
            };
            
            const mockResponse = {
                links: {
                    self: 'https://two-ferns.glitch.me/hotels/1'
                },
                data: {
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
                        hsa_gym: false,
                        name: '',
                        main_image_src: 'https://placebear.com/300/300',
                        meal_plan: '',
                        user_id: '1',
                        booking_id: '1',
                        amount: '5000',
                        currency: 'HUF',
                        status: 'pending',
                        stars: ''
                    }
                }   
            };
            
            MockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            HttpService.httpRequest(mockRequest, '', 'get').subscribe((mockResponse) => {
                expect(mockResponse.data.type).toEqual('hotels');
                expect(mockResponse.data.id).toEqual('11');
                expect(mockResponse.data.attributes.status).toEqual('pending');
            });
        }));
    });
});
