import { UniqueIdentity } from "../../../shared-kernal/value-object/uniqueIdentity";
import { ImageMimeType } from "../value-objects/image-mimetype";
import { ImageOriginalName } from "../value-objects/image-original-name";
import { ImageTempPath } from "../value-objects/image-temp-path";
import { ImageKeyName } from "../value-objects/image-key-name";

export class ImageDomainEntity {
    private readonly id: UniqueIdentity;
    private imageKeyName: ImageKeyName;
    private imageOriginalName: ImageOriginalName;
    private imageMimeType: ImageMimeType;
    private imageTempPath: ImageTempPath;

    constructor(imageTempPath: string, imageKeyName: string, imageOriginalName: string, imageMimeType: string, id?: string) {
        this.imageTempPath = new ImageTempPath(`${imageTempPath}/${imageKeyName}`);
        this.imageKeyName = new ImageKeyName(imageKeyName);
        this.imageMimeType = new ImageMimeType(imageMimeType);
        this.imageOriginalName = new ImageOriginalName(imageOriginalName);
        this.id = new UniqueIdentity(id);
    }

    public changeImageOriginalName(newImageOriginalName: string): void {
        this.imageOriginalName = new ImageOriginalName(newImageOriginalName);
    }

    public changeImageUrl(newImageUrl: string): void {
        this.imageKeyName = new ImageKeyName(newImageUrl);
    }

    public changeImageTempPath(newImageTempPath: string): void {
        this.imageTempPath = new ImageTempPath(newImageTempPath);
    }

    public getImageTempPath(): Readonly<string> {
        return this.imageTempPath.getImageTempPath();
    }

    public getImageKeyName(): Readonly<string> {
        return this.imageKeyName.getImageKeyName();
    }

    public getImageOriginalName(): Readonly<string> {
        return this.imageOriginalName.getImageOriginalName();
    }

    public getImageMimeType(): Readonly<string> {
        return this.imageMimeType.getImageMimeType();
    }

    public getImageId(): Readonly<string> {
        return this.id.getUniqueIdentity();
    }
}