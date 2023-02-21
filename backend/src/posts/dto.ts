export class CreatePostDto {
  title: string;
  description: string;
  image?: string;
  categoryId: number;
}

export class UpdatePostDto {
  title?: string;
  description?: string;
  image?: string;
  categoryId?: number;
}
