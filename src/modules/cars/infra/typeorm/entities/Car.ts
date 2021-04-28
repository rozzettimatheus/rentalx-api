import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
export class Car {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column('boolean')
  available: boolean

  @Column('numeric')
  daily_rate: number

  @Column()
  license_plate: string

  @Column('numeric')
  fine_amount: number

  @Column()
  brand: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[]

  @Column()
  category_id: string

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
      this.available = true
    }
  }
}
