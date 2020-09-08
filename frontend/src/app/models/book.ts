export class book {
    title: string; 
    published:  string; 
    author_detail:{
        id:string,   
        name:string
    };
    details?:{
        description?:string,
        rating?:number,
        total_rated?:number
    };
    tag: string[];
    content:string;
    _id:string;
    img:string;
    latest_chapter:number;
    status:string;
    chapters :string[];
    __v:number;
}