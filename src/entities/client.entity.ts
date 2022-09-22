import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Contact } from "./contact.entity";
import { Exclude } from "class-transformer"


@Entity("clients")
export class Client {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude()
    password: string

    @Column({length:13})
    telephone: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(type => Contact, contacts => contacts.client, {eager:true})
    contacts?: Contact[]
}