import { Exclude, Type } from "class-transformer";
import { IsDate, IsNumber, ValidateNested } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AvailabilityEntity } from "./availabilityEntity";
import GenericEntity from "./genericEntity";
import { TransactionEntity } from "./transactionEntity";
import { UserEntity } from "./userEntity";
//import { Provider } from './Provider';

@Entity({ name: "booking", schema: "rucores" })
export class BookingEntity extends GenericEntity {
  @Column()
  @IsDate()
  @Type(() => Date)
  startDateTime: Date;

  @Column()
  @IsDate()
  @Type(() => Date)
  endDateTime: Date;

  @Column()
  @IsNumber()
  cost: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.bookings)
  @JoinColumn({ name: "userId" }) //specify join name for instance if you already have a DB
  @ValidateNested()
  @Type(() => UserEntity)
  user: Promise<UserEntity>;

  @ManyToOne(
    () => AvailabilityEntity,
    (availability: AvailabilityEntity) => availability.bookings,
  )
  @JoinColumn({ name: "availabilityId" })
  @ValidateNested()
  @Type(() => AvailabilityEntity)
  availability: Promise<AvailabilityEntity>;

  // @ManyToOne(() => Provider, (provider: Provider) => provider.bookings)
  // @JoinColumn({ name: "userId"})
  // provider: Provider;

  @OneToMany(() => TransactionEntity, (transactions) => transactions.booking, {
    nullable: true,
  })
  transactions: TransactionEntity[];

  @Exclude()
  getName = () => "Booking";
}
