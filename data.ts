
type House = {
    id: number;
    adress: string;
    type: string;
    residentId: number;
}


export const housesData : House[] = [
    {
        id: 1,
        adress: 'Mihal Grameno',
        type: 'House',
        residentId: 2
    },
    {
        id: 2,
        adress: 'Tregu Elektrik',
        type: 'Flat',
        residentId: 1
    },
    {
        id: 3,
        adress: 'Ali Demi',
        type: 'Flat',
        residentId: 3
    },
    {
        id: 4,
        adress: 'Allias',
        type: 'Farm',
        residentId: 2
    },
    {
        id: 5,
        adress: 'Laprake',
        type: 'Farm',
        residentId: 3
    }
]


type Resident = {
    id: number;
    name: string;
    age: number;
    gender: string; 
}

export const residentsData : Resident[] = [
    {
        id: 1,
        name: "Redi",
        age: 25,
        gender: "Male",
    },
    {
        id: 2,
        name: "Igli",
        age: 27,
        gender: "Male",
    },
    {
        id: 3,
        name: "Era",
        age: 20,
        gender: "Female",
    }
]