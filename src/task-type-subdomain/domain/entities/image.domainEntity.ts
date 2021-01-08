import { UniqueIdentity } from "../../../shared-kernal/value-object/uniqueIdentity";
import { ImageMimeType } from "../value-objects/image-mimetype";
import { ImageOriginalName } from "../value-objects/image-original-name";
import { ImageURL } from "../value-objects/image-url";

export class ImageDomainEntity {
    private readonly id: UniqueIdentity;
    private imageUrl: ImageURL;
    private imageOriginalName: ImageOriginalName;
    private imageMimeType: ImageMimeType;

    constructor(imageUrl: string, imageOriginalName: string, imageMimeType: string, id?: string) {
        this.id = new UniqueIdentity(id);
        this.imageOriginalName = new ImageOriginalName(imageOriginalName);
        this.imageUrl = new ImageURL(imageUrl);
        this.imageMimeType = new ImageMimeType(imageMimeType);
        this.id = new UniqueIdentity(id);
    }

    public changeImageOriginalName(newImageOriginalName: string): void {
        this.imageOriginalName = new ImageOriginalName(newImageOriginalName);
    }

    public changeImageUrl(newImageUrl: string): void {
        this.imageUrl = new ImageURL(newImageUrl);
    }

    public getImageUrl(): Readonly<string> {
        return this.imageUrl.getImageURL();
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