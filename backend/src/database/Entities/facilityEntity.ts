import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./userEntity";
import { Availability } from "./availabilityEntity";

@Entity()
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @ManyToOne(() => User, (provider: User) => provider.managedFacilities, {
    onDelete: "SET NULL",
  })
  provider: User;

  // @ManyToMany(() => User, (user: User) => user.facilities, {onDelete: 'SET NULL'})
  // users: User[];

  // @OneToMany(() => Booking, (booking: Booking) => booking.facility, {onDelete: 'SET NULL'})
  // bookings: Booking[];

  @OneToMany(
    () => Availability,
    (availability: Availability) => availability.facility,
    { nullable: true, cascade: true, onDelete: "CASCADE" },
  )
  availabilities: Availability[];
}
