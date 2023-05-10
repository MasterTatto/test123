export interface Server {
    id: number;
    title: string;
    type: number;
}
export interface IServerData {
    data:Server[]
}

export interface Graph {
    uv: number;
    pv: number;
}

export interface Gain {
    value: number;
    percent: number;
}

export interface IBalance {
    graph: Graph[];
    value: number;
    gain: Gain;
    deposit_load: string | number;
}

export interface Stats {
    balance: IBalance;
}

export interface ProductData {
    id:number;
    title: string;
    sub_title: string;
    slug: string;
}

export interface Product {
    assigned: boolean;
    product_data: ProductData;
}

export interface IUserAccounts {
    id: number;
    name?: any;
    login: string | undefined;
    password: string;
    reject_reason?: any;
    server: Server;
    stats: Stats;
    product: Product;
    status: number;
}
export interface IUserAccountsData {
    data: IUserAccounts[];
    meta:any
}


//Products
export interface IAccountData{
    login:string;
    name:string;
}
export interface IForexAccount{
    assigned:boolean;
    accountData:IAccountData
}
export interface IProducts{
    id: string;
    object?: string;
    title?: string;
    sub_title?: string;
    slug?: string;
    valid_to?: string | null;
    status?:number;
    forexAccount?:IForexAccount;

}
export interface IProductsData{
    data:IProducts[];
    meta:any;
}