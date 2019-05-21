export class BookingModel {
    constructor(public  id: string,
                public placeId: string,
                public userId: string,
                public placeTitle: string,
                public placeImage: string,
                public firstName: string,
                public lastName: string,
                public guessNumber: number,
                public availableFrom: Date,
                public availableTo: Date) {}
}