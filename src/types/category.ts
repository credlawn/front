export type Category = {
    category_name:string;
    parent_category:string | null;
    sequence:number;
    slug:string;
    attributes:string;
    category_image:string;
}