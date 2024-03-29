import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Expose()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  abstract getName(): string;
}

export default GenericEntity;
