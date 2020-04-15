// Data Transfer Object (dto) 
// how data will be posted from the application to the database

export class CreatePostDTO {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly author: string;
    readonly datePosted: string;
}