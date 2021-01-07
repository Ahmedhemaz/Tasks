import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tasks_type' })
export class TasksTypeDataModel {

    @Column({
        primary: true,
        type: 'uuid',
        unique: true,
        name: 'id'
    })
    id: string;

    @Column({
        nullable: false,
        name: 'name'
    })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}