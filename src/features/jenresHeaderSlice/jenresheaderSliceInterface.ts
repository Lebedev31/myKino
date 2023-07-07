import { PremieresMain } from "../premiere/premieresInterface";


export interface JenresHeader {
    jenresData: PremieresMain[];
    jenresLoading: 'idle' | 'loading' | 'error'
    total: number;
    pages: number;
    url: string;
    page: number;
}