import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { TasksTypeDataModel } from "./type-name.dataModel";

@Entity({ name: 'task_type_images' })
export class ImageDataModel {

    @Column({
        primary: true,
        type: 'uuid',
        unique: true,
        name: 'id'
    })
    id: string;

    @Column({
        nullable: false,
        name: 'temp_path'
    })
    tempPath: string;

    @Column({
        nullable: false,
        name: 'original_name'
    })
    originalName: string;

    @Column({
        nullable: false,
        name: 'key_name'
    })
    keyName: string;

    @Column({
        nullable: false,
        name: 'mime_type'
    })
    mimeType: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;


    @OneToOne(type => TasksTypeDataModel)
    @JoinColumn({ name: 'task_type_id', referencedColumnName: 'id' })
    tasksType: TasksTypeDataModel;

}