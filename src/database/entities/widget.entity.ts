import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('widgets')
export class WidgetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  type: string;

  @Column({ length: 255 })
  label: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ length: 100, default: 'Контент' })
  category: string;

  @Column({ name: 'default_config', type: 'jsonb', default: {} })
  defaultConfig: Record<string, unknown>;

  @Column({ name: 'config_schema', type: 'jsonb', nullable: true })
  configSchema: Record<string, unknown> | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
