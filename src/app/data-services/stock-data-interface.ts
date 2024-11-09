// Stock details json to follow below data format
export interface StockDetail {
code: string,
stockName: string,
price: number,
currency: string
}

// Exchange details json to follow below data format
export interface IStockData {
    code: string,
    stockExchange: string,
    topStocks: StockDetail []
}

// Static title for Exchange and Stock types
export enum Titles {
    Exchange = "Please select an Exchange",
    Stock = "Please select a Stock",
}

// Classification of Menu types
export enum MenuType {
    Exchange,
    Stock,
    End
}

// Submenu type of End menu
export enum EndMenuType {
    Main = "Main menu",
    GoBack = "Go back",
}