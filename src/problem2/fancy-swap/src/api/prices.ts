import axios from "axios";

export interface TokenPrice {
    currency: string; //BLUR
    price: number; //0.20811525423728813
    date: string; //2023-08-29T07:10:40.000Z
}

export async function fetchTokenPrices(): Promise<TokenPrice[]> {
    const url = "https://interview.switcheo.com/prices.json";
    const response = await axios.get(url);
    return response.data;
}
