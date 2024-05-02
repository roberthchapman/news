import { INewsItemData } from "../models/newsItemData";

export interface IAppState {
    page: number;
    uiMode: string;
    displayMode: string;
    data: IData;
}

export interface IData{
    data: INewsItemData[];
    starred: string[];
    page: number;
    uiMode: string;
    displayMode: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
}


