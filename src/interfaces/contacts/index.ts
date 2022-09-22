export interface IContact {
    name: string
    email: string
    telephone: string
    clientId: string
}

export interface IContactUpdate {
    name?: string
    email?: string
    telephone?: string
}