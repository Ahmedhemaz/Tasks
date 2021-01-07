import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity({ name: 'image_meta_data' })
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
        name: 'original_name'
    })
    originalName: string;

    @Column({
        nullable: false,
        name: 'url'
    })
    url: string;

    @Column({
        nullable: false,
        name: 'mime_type'
    })
    mimeType: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}