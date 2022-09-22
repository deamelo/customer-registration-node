import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Client } from "./client.entity";


@Entity("contacts")
export class Contact {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({length:13})
    telephone: string

    @ManyToOne(type => Client, client => client.contacts, {eager:true})
    client: Client

}


