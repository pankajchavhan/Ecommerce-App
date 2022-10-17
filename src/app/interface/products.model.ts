export interface FakestoreProductsModel {
        id: number;
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        rating?: {
            rate?: number,
            count?: number
        },
        quantity?:number,
        total?:number
}

export interface EsculaeJsProductsModel {
    id: number;
    title: string,
    price: number,
    description: string,
    category?: {
        id?: number,
        name?: string,
        image?: string
    },
    image?: string,
    images?: string[]
}
