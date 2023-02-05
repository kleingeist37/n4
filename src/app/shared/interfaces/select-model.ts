export interface SelectModel {
    name : string;
    value: string;
    debugOptions?: string[];
    deepOptions?: {
        child:  { name: string, value: string }[],
        id?: ''
    },
}
