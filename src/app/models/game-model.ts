export interface Game {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    type: "browser" | "downloadable";
    downloadUrl?: string;
    playUrl?: string;
    uploadDate: Date;
    
}

