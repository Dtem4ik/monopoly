export interface card {
    id: number,
    name: string,
    pay: string,
    group: string,
    pays?: pays[],
    price: number,
    sell: string,
    house?: string,
    zalog?: boolean
}

interface pays {
    name: string,
    price: string
}