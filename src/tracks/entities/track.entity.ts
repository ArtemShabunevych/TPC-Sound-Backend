import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  genre: string;

  @Column()
  audioUrl: string;

  @Column()
  coverUrl: string;

  @Column({ nullable: true })
  dominantColor: string;

  @CreateDateColumn()
  createdAt: Date;
}