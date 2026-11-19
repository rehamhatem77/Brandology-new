import type { Lang } from '@/types/site';

// Extra home-page copy for the blended sections (straps, about intro, service cards). EN / AR.
export const HOME_EXTRA: Record<
    Lang,
    {
        ticker: string[];
        ticker2: string[];
        about: {
            eyebrow: string;
            title: string;
            text: string[];
            cta: string;
            cta2: string;
            note: string;
            captions: [string, string, string];
        };
        serviceText: Record<'digital' | 'print' | 'signs', string>;
        owner: string;
        ownerRole: Record<'digital' | 'print' | 'signs', string>;
    }
> = {
    en: {
        ticker: [
            'Brand identity',
            'Social media',
            'Websites',
            'Packaging',
            'Brochures',
            'POS displays',
            'Safety signs',
            'Photography',
        ],
        ticker2: ['Idea', 'Design', 'Print', 'Install'],
        about: {
            eyebrow: 'Who we are',
            title: 'A Cairo agency that makes what it designs',
            text: [
                'Brandology started in 2008 with corporate identity and print. Today one team covers the brand, the screen and the site, including the safety signs on an offshore rig.',
                'We work close to our clients and keep every step in-house, so what you approve is exactly what arrives.',
            ],
            cta: 'Our story',
            cta2: 'What we make',
            note: 'Since 2008, still hands-on',
            captions: ['Idea meeting', 'Press check', 'On site'],
        },
        serviceText: {
            digital:
                'Identity, social media and websites that make a brand easy to remember.',
            print: 'Brochures, packaging and retail displays, printed and finished by us.',
            signs: 'ISO 7010 signs made to last in heat, salt and dust, installed on site.',
        },
        owner: 'Led by',
        ownerRole: {
            digital: 'Digital lead',
            print: 'Production manager',
            signs: 'Signs team',
        },
    },
    ar: {
        ticker: [
            'هوية بصرية',
            'سوشيال ميديا',
            'مواقع',
            'عبوات',
            'بروشورات',
            'نقاط بيع',
            'لافتات سلامة',
            'تصوير',
        ],
        ticker2: ['فكرة', 'تصميم', 'طباعة', 'تركيب'],
        about: {
            eyebrow: 'من نحن',
            title: 'وكالة قاهرية بتصنع اللي بتصممه',
            text: [
                'بدأت براندولوجي في 2008 بالهوية المؤسسية والطباعة. النهاردة فريق واحد بيغطي العلامة والشاشة والموقع، ولحد لافتات السلامة على منصة بحرية.',
                'بنشتغل قريب من عملائنا وبنعمل كل خطوة جوّه الشركة، فاللي بتوافق عليه هو بالظبط اللي بيوصلك.',
            ],
            cta: 'حكايتنا',
            cta2: 'ماذا نصنع',
            note: 'من 2008 وإيدينا لسه في الشغل',
            captions: ['اجتماع الفكرة', 'فحص الطباعة', 'في الموقع'],
        },
        serviceText: {
            digital: 'هوية وسوشيال ميديا ومواقع تخلّي علامتك سهلة التذكّر.',
            print: 'بروشورات وعبوات ونقاط بيع، بنطبعها ونجهزها بنفسنا.',
            signs: 'لافتات ISO 7010 تتحمل الحر والملح والتراب، ونركّبها في الموقع.',
        },
        owner: 'بقيادة',
        ownerRole: {
            digital: 'مسؤول الرقمي',
            print: 'مدير الإنتاج',
            signs: 'فريق اللافتات',
        },
    },
};
