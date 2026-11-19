export type Lang = 'en' | 'ar';
export type Bilingual = { en: string; ar: string };
export type Line = 'digital' | 'print' | 'signs';
export type Pair = [string, string];

export interface PlateData {
    line: Line;
    title: string;
    items?: string[];
    link: string;
    cta: string;
}
