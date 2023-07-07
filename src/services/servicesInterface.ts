import { PremieresMain } from "../features/premiere/premieresInterface"; // экспортируем тип обьекта, который будет в массиве с сервера

export interface OptionsResponse  {
    method: string,
    headers: {
        'X-API-KEY' : 'CBZ6QAA-20C4NSF-NFB8QD3-7JGVMEP', 
        'accept':'application/json'
    }
}       
    
 

export interface Transform {
    docs: PremieresMain[];
    total: number;
    page: number;
    pages: number
}



export interface KinoBdLoading {
    data: TransformKinoLoading[];
    next_page_url: string;
}

export interface TransformKinoLoading {
    countries:{name_ru: string} [],
    description: string,
    genres: {name_ru: string}[],
    name_russian: string,
    persons: {name_russian: string, profession:{profession_id: string}}[],
    player: string,
    rating_imdb: number,
    rating_kp: number, 
    big_poster: string,
    year: number,
    kinopoisk_id: number
}


