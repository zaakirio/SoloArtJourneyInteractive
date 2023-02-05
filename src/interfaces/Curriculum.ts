export interface Video {
    title: string;
    url: string;
}

export interface Reading {
    title: string;
    url: string;
}

export interface Challenge {
    title: string;
    url: string;
}

export interface Body {
    video: Video;
    reading: Reading;
    challenge: Challenge;
}

export interface Course {
    title: string;
    body: Body[];
    term: number;
}