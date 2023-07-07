import { TransformKinoLoading } from "../../services/servicesInterface";



export interface HeaderInfoSearch {
    headerData: TransformKinoLoading[];
    headerLoader: 'idle' | 'loading' | 'error';
}

export interface HeaderInfoSelector{
    headerSearch: HeaderInfoSearch;
}