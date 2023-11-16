declare enum Theme {
    DEFAULT = 0,
    COMPANY_INTRO = 1,
    DROPLETON = 2
}
export declare class SetThemeBody {
    theme: Theme;
}
export declare class SetExpertBody {
    name: string;
}
export declare class UploadChunk {
    hash: string;
    hashName: string;
    filename: string;
}
export declare class MergeChunk {
    filename: string;
    hash: string;
    chunkSize: number;
    mimeType: string;
    size: number;
}
export declare class PreUploadChunk {
    filename: string;
    hash: string;
}
export declare class UploadTinyFile {
    hash: string;
}
export {};
