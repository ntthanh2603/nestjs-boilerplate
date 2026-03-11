import { BaseEntity } from '@/commons/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('jwks')
export class Jwks extends BaseEntity {
  @Column('text')
  publicKey: string;

  @Column('text')
  privateKey: string;

  @Column('timestamp', { nullable: true })
  expiresAt?: Date;
}
