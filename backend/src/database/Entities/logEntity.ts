import { Exclude, Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  TableInheritance,
} from "typeorm";
import LogType from "../../types/LogType";
import { AvailabilityEntity } from "./availabilityEntity";
import { BookingEntity } from "./bookingEntity";
import { FacilityEntity } from "./facilityEntity";
import GenericEntity from "./genericEntity";
import { UserEntity } from "./userEntity";

export enum modificatonType {
  create = "create",
  update = "update",
  delete = "delete",
  default = "default",
}

export enum modificationEntity {
  user = "user",
  facility = "facility",
  booking = "booking",
  availability = "availability",
  default = "default",
}

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class LogEntity extends GenericEntity {
  @Column({
    default: LogType.ModificationEvent,
  })
  LogType: LogType; //discriminator column

  @Column()
  @IsString()
  @IsOptional()
  message?: string;

  @Type(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @IsOptional()
  user?: UserEntity; //This is just a foreign key reference, it will update as user changes

  //   @Column({ nullable: true })
  //   @IsString()
  //   @IsOptional()
  //   userJSON?: string; //Using the instanceToPlain decorator, we can preserve current state

  //Do not need to use IsOptional() because it is for class validator, not typeORM. The database
  //rules and the nullable true + syncronization will handle the null value
  @ValidateNested()
  @Type(() => FacilityEntity)
  @ManyToOne(() => FacilityEntity, (facility) => facility.id, {
    nullable: true,
  })
  facility?: FacilityEntity;
}

@ChildEntity()
export class BookingEvent extends LogEntity {
  @IsNumber()
  @ManyToOne(() => BookingEntity, (booking) => booking.id, { nullable: true })
  @JoinColumn()
  booking?: BookingEntity;

  @Column()
  @IsNumber()
  balance: number;

  @Exclude()
  getName = () => "BookingEvent";
}

@ChildEntity()
export class AvailabilityEvent extends LogEntity {
  @IsNumber()
  @ManyToOne(() => AvailabilityEntity, (availability) => availability.id, {
    nullable: true,
  })
  availability?: AvailabilityEntity;

  @Exclude()
  getName = () => "AvailabilityEvent";
}

@ChildEntity()
export class ModificationEvent extends LogEntity {
  @Column({
    default: modificatonType.default,
  })
  modificationType: modificatonType;

  @Column({
    default: modificationEntity.default,
  })
  modificationEntity: modificationEntity;

  @Column()
  @IsOptional()
  @IsString()
  modificationEntityJSON: string;

  @Exclude()
  getName = () => "InfoEvent";
}
