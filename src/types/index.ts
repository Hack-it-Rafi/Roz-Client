export interface IAttachment {
    url: string;
    contentType: string;
    title: string;
}

export interface Job {
    id: string;
    description: string;
    agent: string;
}