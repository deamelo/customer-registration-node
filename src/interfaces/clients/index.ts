export interface IClient {
    name: string
    email: string
    password: string
    telephone: string
}

export interface IClientLogin {
    email: string;
    password: string;
}

export interface IClientUpdate {
    name?: string
    email?: string
    password?: string
    telephone?: string
}