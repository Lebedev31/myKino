export interface  PremieresMain {
   id: number,
   name: string,
   poster: {
      url: string
   }
   year: number,
   description?: string
}


export interface Inital {
    premieres:  PremieresMain[];
    premieresLoadingStatus: 'idle' | 'loading' | 'error';
}

export interface IPremierArr {
    premiere: Inital
  }