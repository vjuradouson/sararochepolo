import { BASE_URL } from "@/lib/config";

export const DEFAULT_OG_IMAGE = {
    url: `${BASE_URL}/media/portfolio-preview.jpeg`,
    width: 1200,
    height: 627,
    type: 'image/jpeg',
} as const;
