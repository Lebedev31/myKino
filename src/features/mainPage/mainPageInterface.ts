import { PremieresMain } from "../premiere/premieresInterface";

export interface InitialMainPage{
    mainBlockArray: PremieresMain [],
    mainBlockLoadingStatus: 'idle' | 'loading' | 'error';
    id: number;
    caterories: string;
  
}


export interface MainBlockSelector{
    mainBlock: InitialMainPage;
}
