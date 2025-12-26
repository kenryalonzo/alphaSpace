export type Article = {
    id: number;
    title: string;
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: string;
    updated_at: string;
}

export type NewsResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Article[];
}

export type ApodResponse = {
    copyright?: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: "image" | "video";
    service_version: string;
    title: string;
    url: string;
}

export type Launch = {
    id: string;
    name: string;
    date_utc: string;
    details: string | null;
    links: {
        patch: {
            small: string | null;
            large: string | null;
        };
        webcast: string | null;
        article: string | null;
    };
    rocket: string;
    success: boolean | null;
}

export type TelescopeImage = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
}