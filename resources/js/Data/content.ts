// Brandology site content — bilingual (en / ar).
// Edit text here; service, sign and blog pages render from these lists.

export const img = (seed: string, w = 900, h = 680) =>
    `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ---------- Services ---------- */
export const SERVICES = [
    {
        id: 'social',
        line: 'digital',
        img: 'svc-social',
        title: { en: 'Social Media', ar: 'إدارة السوشيال ميديا' },
        intro: {
            en: 'Content calendars, design, community management and paid campaigns on Facebook, Instagram, LinkedIn and TikTok.',
            ar: 'خطط محتوى وتصميمات وإدارة مجتمع وحملات ممولة على فيسبوك وإنستجرام ولينكدإن وتيك توك.',
        },
        features: {
            en: [
                'Monthly content plans',
                'Post & reel design',
                'Community management',
                'Media buying',
                'Influencer coordination',
                'Monthly reporting',
            ],
            ar: [
                'خطط محتوى شهرية',
                'تصميم البوستات والريلز',
                'إدارة التعليقات والرسائل',
                'شراء المساحات الإعلانية',
                'التنسيق مع المؤثرين',
                'تقارير أداء شهرية',
            ],
        },
        deliverables: {
            en: [
                '12–30 posts per month',
                '4–8 reels per month',
                'Ad campaign setup',
                'Performance report',
            ],
            ar: [
                'من 12 إلى 30 بوست شهرياً',
                'من 4 إلى 8 ريلز شهرياً',
                'إعداد الحملات الإعلانية',
                'تقرير أداء',
            ],
        },
        faq: [
            {
                q: {
                    en: 'Which platforms do you manage?',
                    ar: 'ما المنصات التي تديرونها؟',
                },
                a: {
                    en: 'Facebook, Instagram, LinkedIn, TikTok and X, in Arabic and English.',
                    ar: 'فيسبوك وإنستجرام ولينكدإن وتيك توك وإكس، باللغتين العربية والإنجليزية.',
                },
            },
            {
                q: {
                    en: 'Is the ad budget included?',
                    ar: 'هل ميزانية الإعلانات مشمولة؟',
                },
                a: {
                    en: 'No. Media spend is paid separately and agreed with you each month.',
                    ar: 'لا، ميزانية الإعلانات منفصلة ويتم الاتفاق عليها معك كل شهر.',
                },
            },
        ],
    },

    {
        id: 'identity',
        line: 'digital',
        img: 'svc-identity',
        title: { en: 'Brand Identity', ar: 'الهوية البصرية' },
        intro: {
            en: 'Naming, logo, colour, typography and brand guidelines, delivered as a full system your team can use.',
            ar: 'اسم العلامة والشعار والألوان والخطوط ودليل الهوية، في نظام متكامل يستطيع فريقك استخدامه.',
        },
        features: {
            en: [
                'Brand strategy workshop',
                'Logo design',
                'Colour & typography',
                'Brand guidelines',
                'Stationery system',
                'Company profile',
            ],
            ar: [
                'ورشة استراتيجية العلامة',
                'تصميم الشعار',
                'الألوان والخطوط',
                'دليل الهوية البصرية',
                'المطبوعات المكتبية',
                'بروفايل الشركة',
            ],
        },
        deliverables: {
            en: [
                '3 logo concepts',
                'Brand guidelines PDF',
                'Source files (AI, SVG, PNG)',
                'Stationery templates',
            ],
            ar: [
                '3 مقترحات للشعار',
                'دليل الهوية PDF',
                'ملفات المصدر (AI و SVG و PNG)',
                'قوالب المطبوعات',
            ],
        },
        faq: [
            {
                q: {
                    en: 'How long does an identity take?',
                    ar: 'كم يستغرق تصميم الهوية؟',
                },
                a: {
                    en: 'Usually 3 to 6 weeks, depending on the number of applications.',
                    ar: 'عادة من 3 إلى 6 أسابيع حسب عدد التطبيقات المطلوبة.',
                },
            },
            {
                q: {
                    en: 'Do I own the final files?',
                    ar: 'هل أمتلك الملفات النهائية؟',
                },
                a: {
                    en: 'Yes. You receive all source files and full usage rights.',
                    ar: 'نعم، تستلم جميع ملفات المصدر وحقوق الاستخدام الكاملة.',
                },
            },
        ],
    },

    {
        id: 'web',
        line: 'digital',
        img: 'svc-web',
        title: { en: 'Websites & Apps', ar: 'المواقع والتطبيقات' },
        intro: {
            en: 'Corporate websites, e-commerce and mobile apps that are fast, bilingual and easy to update.',
            ar: 'مواقع شركات ومتاجر إلكترونية وتطبيقات موبايل سريعة وثنائية اللغة وسهلة التحديث.',
        },
        features: {
            en: [
                'UX/UI design',
                'Arabic & English',
                'Content management',
                'E-commerce',
                'iOS & Android apps',
                'SEO setup',
            ],
            ar: [
                'تصميم تجربة وواجهة المستخدم',
                'عربي وإنجليزي',
                'لوحة تحكم للمحتوى',
                'متاجر إلكترونية',
                'تطبيقات iOS وأندرويد',
                'تهيئة لمحركات البحث',
            ],
        },
        deliverables: {
            en: [
                'Sitemap & wireframes',
                'Responsive website',
                'Admin training',
                '3 months support',
            ],
            ar: [
                'خريطة الموقع والهيكل',
                'موقع متجاوب',
                'تدريب على لوحة التحكم',
                'دعم فني 3 أشهر',
            ],
        },
        faq: [
            {
                q: {
                    en: 'Do you host the website?',
                    ar: 'هل تقومون باستضافة الموقع؟',
                },
                a: {
                    en: 'We can set up hosting and a domain for you, or deploy to your own server.',
                    ar: 'يمكننا تجهيز الاستضافة والدومين لك، أو رفع الموقع على السيرفر الخاص بك.',
                },
            },
            {
                q: {
                    en: 'Can I edit the content myself?',
                    ar: 'هل يمكنني تعديل المحتوى بنفسي؟',
                },
                a: {
                    en: 'Yes. Every site comes with an easy admin panel and training.',
                    ar: 'نعم، كل موقع يأتي بلوحة تحكم سهلة مع تدريب عليها.',
                },
            },
        ],
    },

    {
        id: 'photo',
        line: 'digital',
        img: 'svc-photo',
        title: { en: 'Photography & Content', ar: 'التصوير وصناعة المحتوى' },
        intro: {
            en: 'Product, corporate and industrial photography and video, shot in our studio or on your site.',
            ar: 'تصوير منتجات وتصوير مؤسسي وصناعي وفيديو، في الاستوديو الخاص بنا أو في موقعك.',
        },
        features: {
            en: [
                'Product photography',
                'Corporate portraits',
                'Industrial site shoots',
                'Short-form video',
                'Copywriting',
                'Retouching',
            ],
            ar: [
                'تصوير المنتجات',
                'صور الفريق والإدارة',
                'تصوير المواقع الصناعية',
                'فيديوهات قصيرة',
                'كتابة المحتوى',
                'معالجة الصور',
            ],
        },
        deliverables: {
            en: [
                'Edited high-res photos',
                'Web-ready versions',
                'Video edits',
                'Usage licence',
            ],
            ar: [
                'صور عالية الدقة معدلة',
                'نسخ مجهزة للويب',
                'مونتاج الفيديو',
                'ترخيص الاستخدام',
            ],
        },
        faq: [
            {
                q: {
                    en: 'Can you shoot on oil & gas sites?',
                    ar: 'هل تصورون داخل مواقع البترول؟',
                },
                a: {
                    en: 'Yes. Our crew follows site HSE rules and permit-to-work procedures.',
                    ar: 'نعم، فريقنا يلتزم بقواعد السلامة وتصاريح العمل في الموقع.',
                },
            },
        ],
    },

    {
        id: 'print',
        line: 'print',
        img: 'svc-brochure',
        title: { en: 'Brochures & Catalogues', ar: 'البروشورات والكتالوجات' },
        intro: {
            en: 'Offset and digital printing for brochures, catalogues, annual reports and company profiles.',
            ar: 'طباعة أوفست وديجيتال للبروشورات والكتالوجات والتقارير السنوية وبروفايلات الشركات.',
        },
        features: {
            en: [
                'Offset & digital print',
                'Special finishes (UV, foil)',
                'Saddle, perfect & wire binding',
                'Paper consultation',
                'Bulk runs',
                'Delivery across Egypt',
            ],
            ar: [
                'طباعة أوفست وديجيتال',
                'تشطيبات خاصة (يو في وفويل)',
                'تدبيس وتجليد حراري وسلك',
                'استشارة في أنواع الورق',
                'كميات كبيرة',
                'توصيل لكل محافظات مصر',
            ],
        },
        deliverables: {
            en: [
                'Print-ready artwork',
                'Printed proof',
                'Final print run',
                'Packed delivery',
            ],
            ar: [
                'ملفات جاهزة للطباعة',
                'بروفة مطبوعة',
                'الطباعة النهائية',
                'تغليف وتوصيل',
            ],
        },
        faq: [
            {
                q: {
                    en: 'What is the minimum quantity?',
                    ar: 'ما هو الحد الأدنى للكمية؟',
                },
                a: {
                    en: 'Digital print starts from 50 copies; offset is best from 500 copies.',
                    ar: 'الطباعة الديجيتال تبدأ من 50 نسخة، والأوفست الأنسب من 500 نسخة.',
                },
            },
        ],
    },

    {
        id: 'packaging',
        line: 'print',
        img: 'svc-pos',
        title: { en: 'Packaging & POS', ar: 'التغليف ومواد نقاط البيع' },
        intro: {
            en: 'Packaging design and print, shelf talkers, standees and display units for retail and FMCG brands.',
            ar: 'تصميم وطباعة التغليف، وشلف توكر، واستاندات، ووحدات عرض لعلامات التجزئة والسلع الاستهلاكية.',
        },
        features: {
            en: [
                'Packaging design',
                'Dielines & mock-ups',
                'Shelf talkers & wobblers',
                'Floor standees',
                'Roll-ups & banners',
                'In-store branding',
            ],
            ar: [
                'تصميم العبوات',
                'الفورمة والنماذج',
                'شلف توكر ووبلر',
                'استاندات أرضية',
                'رول أب وبانرات',
                'تجهيز الفروع بالهوية',
            ],
        },
        deliverables: {
            en: [
                'Packaging artwork',
                'Physical prototype',
                'Production run',
                'Store installation',
            ],
            ar: [
                'تصميمات العبوات',
                'نموذج فعلي',
                'التنفيذ والإنتاج',
                'التركيب في الفروع',
            ],
        },
        faq: [
            {
                q: {
                    en: 'Do you install POS in stores?',
                    ar: 'هل تقومون بتركيب المواد في الفروع؟',
                },
                a: {
                    en: 'Yes. Our team installs across Greater Cairo and ships nationwide.',
                    ar: 'نعم، فريقنا يركب في القاهرة الكبرى ونشحن لكل المحافظات.',
                },
            },
        ],
    },

    {
        id: 'signs',
        line: 'signs',
        img: 'svc-safety',
        title: { en: 'Industrial Safety Signs', ar: 'لافتات السلامة الصناعية' },
        intro: {
            en: 'ISO 7010 signage for oil & gas, offshore, marine and renewable energy sites, including site surveys and installation.',
            ar: 'لافتات سلامة طبقاً لمعيار ISO 7010 لمواقع البترول والغاز والمنصات البحرية والموانئ والطاقة المتجددة، شاملة المعاينة والتركيب.',
        },
        features: {
            en: [
                'Site surveys & sign schedules',
                'ISO 7010 & IMO symbols',
                'Photoluminescent escape routes',
                'Custom bilingual signs',
                'Marine-grade materials',
                'Installation crews',
            ],
            ar: [
                'معاينة الموقع وجدول اللافتات',
                'رموز ISO 7010 و IMO',
                'مسارات هروب فسفورية',
                'لافتات مخصصة ثنائية اللغة',
                'خامات مقاومة للبيئة البحرية',
                'فرق تركيب متخصصة',
            ],
        },
        deliverables: {
            en: [
                'Survey report',
                'Sign schedule & layout',
                'Produced signs',
                'Installation & handover',
            ],
            ar: [
                'تقرير المعاينة',
                'جدول وأماكن اللافتات',
                'تصنيع اللافتات',
                'التركيب والتسليم',
            ],
        },
        faq: [
            {
                q: {
                    en: 'Do you work offshore?',
                    ar: 'هل تعملون في المنصات البحرية؟',
                },
                a: {
                    en: 'Yes. Our crews are trained for offshore work and hold the required certificates.',
                    ar: 'نعم، فرقنا مدربة على العمل البحري وتحمل الشهادات المطلوبة.',
                },
            },
            {
                q: {
                    en: 'Can you add our logo and Arabic text?',
                    ar: 'هل يمكن إضافة شعارنا ونص عربي؟',
                },
                a: {
                    en: 'Yes. Every sign can carry your logo, site codes and bilingual text.',
                    ar: 'نعم، يمكن إضافة شعارك وأكواد الموقع ونص باللغتين على أي لافتة.',
                },
            },
        ],
    },
];

/* ---------- Safety signs ---------- */
export const SIGN_TYPES: Record<string, any> = {
    warning: {
        en: 'Warning',
        ar: 'تحذير',
        shape: {
            en: 'Yellow triangle with black border',
            ar: 'مثلث أصفر بإطار أسود',
        },
    },
    prohibition: {
        en: 'Prohibition',
        ar: 'ممنوع',
        shape: {
            en: 'Red circle with diagonal bar',
            ar: 'دائرة حمراء بخط مائل',
        },
    },
    mandatory: {
        en: 'Mandatory',
        ar: 'إلزامي',
        shape: {
            en: 'Blue circle with white symbol',
            ar: 'دائرة زرقاء برمز أبيض',
        },
    },
    emergency: {
        en: 'Emergency',
        ar: 'طوارئ',
        shape: {
            en: 'Green square with white symbol',
            ar: 'مربع أخضر برمز أبيض',
        },
    },
    fire: {
        en: 'Fire equipment',
        ar: 'معدات الحريق',
        shape: {
            en: 'Red square with white symbol',
            ar: 'مربع أحمر برمز أبيض',
        },
    },
};
export const MATERIALS: Record<string, any> = {
    Photoluminescent: {
        en: 'Photoluminescent',
        ar: 'فسفوري مضيء',
        note: {
            en: 'Glows for hours after a power cut',
            ar: 'يضيء لساعات عند انقطاع الكهرباء',
        },
    },
    Aluminium: {
        en: 'Aluminium',
        ar: 'ألومنيوم',
        note: {
            en: 'Rust-proof, for outdoor and heavy industry',
            ar: 'لا يصدأ، للأماكن المفتوحة والصناعات الثقيلة',
        },
    },
    Acrylic: {
        en: 'Acrylic',
        ar: 'أكريليك',
        note: {
            en: 'Clean finish for indoor areas',
            ar: 'تشطيب أنيق للأماكن الداخلية',
        },
    },
    Reflective: {
        en: 'Reflective',
        ar: 'عاكس',
        note: {
            en: 'Visible in vehicle headlights',
            ar: 'يظهر بوضوح مع أضواء السيارات',
        },
    },
};
export const SECTORS: Record<string, any> = {
    oil: { en: 'Oil & Gas', ar: 'البترول والغاز' },
    offshore: { en: 'Offshore', ar: 'المنصات البحرية' },
    marine: { en: 'Marine', ar: 'الموانئ والسفن' },
    renew: { en: 'Renewables', ar: 'الطاقة المتجددة' },
};
export const SIZES = ['200×200 mm', '300×300 mm', '450×450 mm', '600×600 mm'];

export const SIGNS = [
    {
        code: 'W001',
        type: 'warning',
        sym: 'excl',
        mats: ['Aluminium', 'Reflective'],
        sec: ['oil', 'offshore', 'marine', 'renew'],
        name: { en: 'General warning', ar: 'تحذير عام' },
        use: {
            en: 'Marks a general hazard. Use it with a text panel that names the hazard.',
            ar: 'يشير إلى خطر عام، ويُستخدم مع لوحة نصية توضح نوع الخطر.',
        },
    },
    {
        code: 'W012',
        type: 'warning',
        sym: 'bolt',
        mats: ['Aluminium', 'Reflective'],
        sec: ['oil', 'renew'],
        name: { en: 'Electricity hazard', ar: 'خطر كهرباء' },
        use: {
            en: 'For switch rooms, transformers, panels and solar inverters.',
            ar: 'لغرف المفاتيح والمحولات واللوحات الكهربائية وانفرترات الطاقة الشمسية.',
        },
    },
    {
        code: 'W021',
        type: 'warning',
        sym: 'flame',
        mats: ['Aluminium'],
        sec: ['oil', 'offshore', 'marine'],
        name: { en: 'Flammable material', ar: 'مواد قابلة للاشتعال' },
        use: {
            en: 'For fuel stores, tank farms and chemical storage.',
            ar: 'لمخازن الوقود ومستودعات الخزانات وتخزين الكيماويات.',
        },
    },
    {
        code: 'W016',
        type: 'warning',
        sym: 'toxic',
        mats: ['Aluminium', 'Reflective'],
        sec: ['oil', 'offshore'],
        name: { en: 'Toxic material (H₂S)', ar: 'مواد سامة (H₂S)' },
        use: {
            en: 'For wellheads and process areas where hydrogen sulphide may be present.',
            ar: 'لرؤوس الآبار ومناطق التشغيل المحتمل وجود كبريتيد الهيدروجين بها.',
        },
    },
    {
        code: 'P002',
        type: 'prohibition',
        sym: 'smoke',
        mats: ['Acrylic', 'Aluminium'],
        sec: ['oil', 'offshore', 'marine', 'renew'],
        name: { en: 'No smoking', ar: 'ممنوع التدخين' },
        use: {
            en: 'For all hazardous zones, stores and enclosed workplaces.',
            ar: 'لكل المناطق الخطرة والمخازن وأماكن العمل المغلقة.',
        },
    },
    {
        code: 'P013',
        type: 'prohibition',
        sym: 'phone',
        mats: ['Acrylic', 'Aluminium'],
        sec: ['oil', 'offshore'],
        name: { en: 'No mobile phones', ar: 'ممنوع استخدام الهاتف المحمول' },
        use: {
            en: 'For gas zones and areas where phones can be an ignition source.',
            ar: 'لمناطق الغاز والأماكن التي قد يكون الهاتف فيها مصدر اشتعال.',
        },
    },
    {
        code: 'M014',
        type: 'mandatory',
        sym: 'helmet',
        mats: ['Aluminium', 'Acrylic'],
        sec: ['oil', 'offshore', 'renew'],
        name: { en: 'Wear safety helmet', ar: 'يجب ارتداء خوذة السلامة' },
        use: {
            en: 'For site entrances, workshops and lifting areas.',
            ar: 'لمداخل المواقع والورش ومناطق الرفع.',
        },
    },
    {
        code: 'M004',
        type: 'mandatory',
        sym: 'goggles',
        mats: ['Aluminium', 'Acrylic'],
        sec: ['oil', 'offshore', 'marine', 'renew'],
        name: { en: 'Wear eye protection', ar: 'يجب ارتداء نظارات الوقاية' },
        use: {
            en: 'For workshops, grinding, welding and chemical handling.',
            ar: 'للورش وأعمال الجلخ واللحام والتعامل مع الكيماويات.',
        },
    },
    {
        code: 'M015',
        type: 'mandatory',
        sym: 'vest',
        mats: ['Aluminium'],
        sec: ['oil', 'renew'],
        name: {
            en: 'Wear high-visibility vest',
            ar: 'يجب ارتداء السترة العاكسة',
        },
        use: {
            en: 'For yards, roads and areas with moving vehicles.',
            ar: 'للساحات والطرق والمناطق التي بها حركة مركبات.',
        },
    },
    {
        code: 'E001',
        type: 'emergency',
        sym: 'exit',
        mats: ['Photoluminescent'],
        sec: ['oil', 'offshore', 'marine', 'renew'],
        name: { en: 'Emergency exit', ar: 'مخرج طوارئ' },
        use: {
            en: 'Marks escape routes and final exits. Stays visible during a blackout.',
            ar: 'يحدد مسارات الهروب والمخارج النهائية، ويظل واضحاً عند انقطاع الكهرباء.',
        },
    },
    {
        code: 'E007',
        type: 'emergency',
        sym: 'muster',
        mats: ['Photoluminescent', 'Reflective'],
        sec: ['oil', 'offshore', 'marine'],
        name: { en: 'Muster / assembly point', ar: 'نقطة التجمع' },
        use: {
            en: 'Marks where people gather during an evacuation.',
            ar: 'يحدد مكان تجمع الأفراد أثناء الإخلاء.',
        },
    },
    {
        code: 'E003',
        type: 'emergency',
        sym: 'firstaid',
        mats: ['Photoluminescent', 'Acrylic'],
        sec: ['oil', 'offshore', 'marine', 'renew'],
        name: { en: 'First aid', ar: 'إسعافات أولية' },
        use: {
            en: 'Marks first aid kits, rooms and stations.',
            ar: 'يحدد مكان حقائب وغرف ونقاط الإسعافات الأولية.',
        },
    },
    {
        code: 'F001',
        type: 'fire',
        sym: 'ext',
        mats: ['Photoluminescent'],
        sec: ['oil', 'offshore', 'marine', 'renew'],
        name: { en: 'Fire extinguisher', ar: 'طفاية حريق' },
        use: {
            en: 'Mounted above each extinguisher so it can be found in smoke.',
            ar: 'يُركب فوق كل طفاية ليسهل الوصول إليها وسط الدخان.',
        },
    },
    {
        code: 'F002',
        type: 'fire',
        sym: 'hose',
        mats: ['Photoluminescent'],
        sec: ['oil', 'offshore', 'marine'],
        name: { en: 'Fire hose reel', ar: 'بكرة خرطوم الحريق' },
        use: {
            en: 'Marks hose reels and fire cabinets.',
            ar: 'يحدد أماكن بكرات الخراطيم وكبائن الحريق.',
        },
    },
    {
        code: 'F005',
        type: 'fire',
        sym: 'alarm',
        mats: ['Photoluminescent', 'Acrylic'],
        sec: ['oil', 'offshore', 'renew'],
        name: { en: 'Fire alarm call point', ar: 'نقطة إنذار الحريق' },
        use: {
            en: 'Marks manual call points on escape routes.',
            ar: 'يحدد نقاط الإنذار اليدوية على مسارات الهروب.',
        },
    },
];

export const SIGN_ART: Record<string, any> = {
    warning: (s: any) =>
        `<svg viewBox="0 0 100 90" role="img"><path d="M50 4 96 86H4Z" fill="#fdca0f" stroke="#16171c" stroke-width="7" stroke-linejoin="round"/>${s}</svg>`,
    prohibition: (s: any) =>
        `<svg viewBox="0 0 100 100" role="img"><circle cx="50" cy="50" r="44" fill="#fff" stroke="#c0362c" stroke-width="10"/>${s}<path d="M19 19 81 81" stroke="#c0362c" stroke-width="10"/></svg>`,
    mandatory: (s: any) =>
        `<svg viewBox="0 0 100 100" role="img"><circle cx="50" cy="50" r="46" fill="#1d5fb4"/>${s}</svg>`,
    emergency: (s: any) =>
        `<svg viewBox="0 0 100 100" role="img"><rect x="4" y="4" width="92" height="92" rx="6" fill="#13804f"/>${s}</svg>`,
    fire: (s: any) =>
        `<svg viewBox="0 0 100 100" role="img"><rect x="4" y="4" width="92" height="92" rx="6" fill="#c0362c"/>${s}</svg>`,
};
export const SIGN_SYM: Record<string, any> = {
    excl: '<rect x="45" y="30" width="10" height="32" rx="3" fill="#16171c"/><circle cx="50" cy="72" r="6" fill="#16171c"/>',
    bolt: '<path d="M54 26 36 58h14l-6 22 20-34H50Z" fill="#16171c"/>',
    flame: '<path d="M50 28c8 12 16 18 16 30a16 16 0 0 1-32 0c0-8 6-12 8-20 2 6 6 8 8 10 2-6 0-12 0-20Z" fill="#16171c"/>',
    toxic: '<circle cx="50" cy="52" r="12" fill="#16171c"/><path d="M34 74 66 40M34 40l32 34" stroke="#16171c" stroke-width="6"/>',
    smoke: '<rect x="24" y="46" width="44" height="10" fill="#16171c"/><path d="M72 46v10M76 40c0-6 4-6 4-12" stroke="#16171c" stroke-width="4" fill="none"/>',
    phone: '<rect x="38" y="24" width="24" height="44" rx="4" fill="#16171c"/>',
    helmet: '<path d="M26 60a24 22 0 0 1 48 0Z" fill="#fff"/><rect x="22" y="60" width="56" height="8" rx="3" fill="#fff"/>',
    goggles:
        '<rect x="22" y="42" width="56" height="18" rx="9" fill="#fff"/><circle cx="37" cy="51" r="6" fill="#1d5fb4"/><circle cx="63" cy="51" r="6" fill="#1d5fb4"/>',
    vest: '<path d="M36 26h8l6 10 6-10h8l8 16-6 4v28H34V46l-6-4Z" fill="#fff"/>',
    exit: '<circle cx="40" cy="28" r="7" fill="#fff"/><path d="M36 38 30 58l10 2 4-10 8 8-4 18h8l4-22-10-10 2-6 8 8h10v-6h-8l-10-10Z" fill="#fff"/><rect x="66" y="22" width="20" height="56" fill="none" stroke="#fff" stroke-width="5"/>',
    muster: '<circle cx="35" cy="40" r="7" fill="#fff"/><circle cx="65" cy="40" r="7" fill="#fff"/><circle cx="50" cy="30" r="7" fill="#fff"/><path d="M26 74V56h18v18M56 74V56h18v18M41 64V44h18v20" fill="#fff"/>',
    firstaid:
        '<path d="M42 22h16v20h20v16H58v20H42V58H22V42h20Z" fill="#fff"/>',
    ext: '<rect x="40" y="36" width="20" height="44" rx="6" fill="#fff"/><path d="M50 22v14M50 26h14l4 8" stroke="#fff" stroke-width="5" fill="none"/>',
    hose: '<circle cx="50" cy="52" r="24" fill="none" stroke="#fff" stroke-width="7"/><circle cx="50" cy="52" r="8" fill="#fff"/>',
    alarm: '<rect x="30" y="30" width="40" height="40" rx="4" fill="#fff"/><circle cx="50" cy="50" r="9" fill="#c0362c"/>',
};
export const signArt = (s: any) => SIGN_ART[s.type](SIGN_SYM[s.sym]);

/* ---------- Blog ---------- */
export const POSTS = [
    {
        id: 'iso-7010',
        cat: 'safety',
        date: '2026-10-12',
        img: 'b1',
        title: {
            en: 'ISO 7010 explained: what every site manager should know',
            ar: 'شرح معيار ISO 7010: ما يجب أن يعرفه كل مدير موقع',
        },
        excerpt: {
            en: 'The international standard behind safety signs, and how to apply it on your site.',
            ar: 'المعيار الدولي وراء لافتات السلامة، وكيف تطبقه في موقعك.',
        },
        body: {
            en: [
                [
                    'p',
                    'ISO 7010 is the international standard for safety sign symbols. It defines the shapes, colours and pictograms that workers recognise in any country and language.',
                ],
                ['h', 'The five sign families'],
                [
                    'ul',
                    [
                        'Warning: yellow triangle',
                        'Prohibition: red circle with a bar',
                        'Mandatory: blue circle',
                        'Safe condition: green square',
                        'Fire equipment: red square',
                    ],
                ],
                ['h', 'Why it matters on oil & gas sites'],
                [
                    'p',
                    "International operators audit against ISO 7010. Signs that don't match the standard can become audit findings, even if they look clear.",
                ],
                ['h', 'How to start'],
                [
                    'p',
                    'Begin with a site survey. Map every hazard, escape route and piece of fire equipment, then build a sign schedule before anything is produced.',
                ],
            ],
            ar: [
                [
                    'p',
                    'معيار ISO 7010 هو المعيار الدولي لرموز لافتات السلامة. يحدد الأشكال والألوان والرموز التي يفهمها العاملون في أي بلد وبأي لغة.',
                ],
                ['h', 'العائلات الخمس للافتات'],
                [
                    'ul',
                    [
                        'التحذير: مثلث أصفر',
                        'المنع: دائرة حمراء بخط مائل',
                        'الإلزام: دائرة زرقاء',
                        'السلامة والطوارئ: مربع أخضر',
                        'معدات الحريق: مربع أحمر',
                    ],
                ],
                ['h', 'لماذا يهم في مواقع البترول والغاز'],
                [
                    'p',
                    'الشركات العالمية تراجع مواقعها وفقاً لهذا المعيار، واللافتات غير المطابقة قد تُسجل كملاحظات تدقيق حتى لو كانت واضحة.',
                ],
                ['h', 'كيف تبدأ'],
                [
                    'p',
                    'ابدأ بمعاينة الموقع. حدد كل خطر ومسار هروب ومعدة حريق، ثم جهز جدول اللافتات قبل بدء التصنيع.',
                ],
            ],
        },
    },

    {
        id: 'brand-refresh',
        cat: 'brand',
        date: '2026-09-28',
        img: 'b2',
        title: {
            en: 'Five signs your brand identity needs a refresh',
            ar: 'خمس علامات تدل على أن هويتك البصرية تحتاج إلى تجديد',
        },
        excerpt: {
            en: "If your logo looks different on every channel, it's time to talk.",
            ar: 'إذا كان شعارك يظهر بشكل مختلف في كل قناة، فقد حان وقت التجديد.',
        },
        body: {
            en: [
                [
                    'p',
                    'A brand identity should work everywhere, from a business card to a billboard. These are the signs it has stopped doing its job.',
                ],
                [
                    'ul',
                    [
                        "Your logo doesn't read well on mobile",
                        'Each department uses different colours',
                        'Competitors look more modern',
                        "You've added services the brand doesn't reflect",
                        "You're expanding to new markets",
                    ],
                ],
                ['h', 'Refresh or rebrand?'],
                [
                    'p',
                    'A refresh keeps your recognition and modernises the details. A full rebrand is for when your business itself has changed.',
                ],
            ],
            ar: [
                [
                    'p',
                    'الهوية البصرية يجب أن تعمل في كل مكان، من الكارت الشخصي حتى اللوحة الإعلانية. هذه علامات أنها توقفت عن أداء دورها.',
                ],
                [
                    'ul',
                    [
                        'الشعار غير واضح على الموبايل',
                        'كل قسم يستخدم ألواناً مختلفة',
                        'المنافسون يبدون أكثر حداثة',
                        'أضفت خدمات لا تعكسها الهوية',
                        'تتوسع في أسواق جديدة',
                    ],
                ],
                ['h', 'تجديد أم هوية جديدة؟'],
                [
                    'p',
                    'التجديد يحافظ على تعرّف العملاء عليك ويحدّث التفاصيل، أما الهوية الجديدة فتكون عندما يتغير نشاطك نفسه.',
                ],
            ],
        },
    },

    {
        id: 'offset-digital',
        cat: 'print',
        date: '2026-09-09',
        img: 'b3',
        title: {
            en: 'Offset or digital print: choosing for your next catalogue',
            ar: 'طباعة أوفست أم ديجيتال: كيف تختار لكتالوجك القادم',
        },
        excerpt: {
            en: 'Quantity, colour and deadline decide which press is right.',
            ar: 'الكمية والألوان والموعد النهائي هي ما يحدد نوع الطباعة المناسب.',
        },
        body: {
            en: [
                [
                    'p',
                    'Both methods give excellent results. The right choice depends on three things.',
                ],
                ['h', 'Quantity'],
                [
                    'p',
                    'Digital is cheaper below about 500 copies. Offset becomes cheaper per copy as the run grows.',
                ],
                ['h', 'Colour accuracy'],
                [
                    'p',
                    'Offset can print exact Pantone colours, which matters for strict brand guidelines.',
                ],
                ['h', 'Deadline'],
                [
                    'p',
                    'Digital can be ready in one or two days. Offset needs plates and drying time.',
                ],
            ],
            ar: [
                [
                    'p',
                    'الطريقتان تعطيان نتائج ممتازة، والاختيار الصحيح يعتمد على ثلاثة أمور.',
                ],
                ['h', 'الكمية'],
                [
                    'p',
                    'الديجيتال أوفر في الكميات الأقل من 500 نسخة تقريباً، والأوفست يصبح أرخص للنسخة كلما زادت الكمية.',
                ],
                ['h', 'دقة الألوان'],
                [
                    'p',
                    'الأوفست يطبع ألوان بانتون بدقة، وهذا مهم عند وجود دليل هوية صارم.',
                ],
                ['h', 'الموعد النهائي'],
                [
                    'p',
                    'الديجيتال قد يكون جاهزاً في يوم أو يومين، بينما يحتاج الأوفست إلى تجهيز الزنكات ووقت للتجفيف.',
                ],
            ],
        },
    },

    {
        id: 'photoluminescent',
        cat: 'safety',
        date: '2026-08-21',
        img: 'b4',
        title: {
            en: 'Photoluminescent vs illuminated exit signs offshore',
            ar: 'لافتات المخارج الفسفورية مقابل المضيئة كهربائياً في المنصات البحرية',
        },
        excerpt: {
            en: 'Why most offshore operators now choose glow-in-the-dark signs.',
            ar: 'لماذا تختار معظم الشركات البحرية الآن اللافتات المضيئة ذاتياً.',
        },
        body: {
            en: [
                [
                    'p',
                    'Exit signs must stay visible when the power fails. There are two ways to do that.',
                ],
                ['h', 'Photoluminescent'],
                [
                    'p',
                    'These signs absorb light and glow for hours. They need no wiring, batteries or maintenance.',
                ],
                ['h', 'Illuminated'],
                [
                    'p',
                    'Electric signs are bright but need power, backup batteries and regular testing, which is costly offshore.',
                ],
                [
                    'p',
                    'For most platforms, photoluminescent signs and low-level escape strips are the more reliable option.',
                ],
            ],
            ar: [
                [
                    'p',
                    'لافتات المخارج يجب أن تظل مرئية عند انقطاع الكهرباء، وهناك طريقتان لتحقيق ذلك.',
                ],
                ['h', 'الفسفورية'],
                [
                    'p',
                    'تمتص الضوء وتضيء لساعات، ولا تحتاج إلى أسلاك أو بطاريات أو صيانة.',
                ],
                ['h', 'المضيئة كهربائياً'],
                [
                    'p',
                    'ساطعة لكنها تحتاج إلى كهرباء وبطاريات احتياطية واختبار دوري، وهذا مكلف في البحر.',
                ],
                [
                    'p',
                    'في معظم المنصات، اللافتات الفسفورية مع شرائط الهروب المنخفضة هي الخيار الأكثر اعتمادية.',
                ],
            ],
        },
    },

    {
        id: 'ramadan-social',
        cat: 'brand',
        date: '2026-08-02',
        img: 'b5',
        title: {
            en: 'Planning a Ramadan social media calendar that converts',
            ar: 'كيف تخطط محتوى رمضان على السوشيال ميديا ليحقق مبيعات',
        },
        excerpt: {
            en: 'Start early, plan around iftar and suhoor, and keep the tone right.',
            ar: 'ابدأ مبكراً، وخطط حول مواعيد الإفطار والسحور، وحافظ على النبرة المناسبة.',
        },
        body: {
            en: [
                [
                    'p',
                    'Ramadan is the busiest season for social media in Egypt. Brands that plan early get the best results.',
                ],
                [
                    'ul',
                    [
                        'Book content and ads 6 weeks ahead',
                        'Post around iftar and late at night',
                        'Mix emotional stories with offers',
                        'Plan Eid content in advance',
                    ],
                ],
                [
                    'p',
                    'Track results weekly and move budget to the posts that perform.',
                ],
            ],
            ar: [
                [
                    'p',
                    'رمضان هو أكثر مواسم السوشيال ميديا نشاطاً في مصر، والعلامات التي تخطط مبكراً تحقق أفضل النتائج.',
                ],
                [
                    'ul',
                    [
                        'جهز المحتوى والإعلانات قبلها بستة أسابيع',
                        'انشر قرب الإفطار وفي وقت متأخر من الليل',
                        'امزج القصص المؤثرة مع العروض',
                        'خطط لمحتوى العيد مسبقاً',
                    ],
                ],
                [
                    'p',
                    'تابع النتائج أسبوعياً وحوّل الميزانية إلى البوستات الأفضل أداءً.',
                ],
            ],
        },
    },

    {
        id: 'pos-fmcg',
        cat: 'print',
        date: '2026-07-15',
        img: 'b6',
        title: {
            en: 'How in-store POS lifts FMCG shelf sales',
            ar: 'كيف ترفع مواد نقاط البيع مبيعات السلع الاستهلاكية',
        },
        excerpt: {
            en: 'Most buying decisions happen at the shelf. POS is how you win them.',
            ar: 'معظم قرارات الشراء تحدث أمام الرف، ومواد نقاط البيع هي طريقك للفوز بها.',
        },
        body: {
            en: [
                [
                    'p',
                    'Shoppers decide quickly. Clear, branded POS helps your product get noticed in a crowded aisle.',
                ],
                [
                    'ul',
                    [
                        'Shelf talkers highlight offers',
                        'Floor standees create a second location',
                        'Wobblers catch the eye at eye level',
                    ],
                ],
                [
                    'p',
                    'Good POS is designed for the store, printed to last, and installed correctly.',
                ],
            ],
            ar: [
                [
                    'p',
                    'المتسوق يقرر بسرعة، ومواد نقاط البيع الواضحة تساعد منتجك على الظهور وسط الرفوف المزدحمة.',
                ],
                [
                    'ul',
                    [
                        'الشلف توكر يبرز العروض',
                        'الاستاندات الأرضية تخلق مكان عرض إضافي',
                        'الوبلر يجذب العين في مستوى النظر',
                    ],
                ],
                [
                    'p',
                    'مواد نقاط البيع الجيدة تُصمم للفرع وتُطبع لتدوم وتُركب بشكل صحيح.',
                ],
            ],
        },
    },
];
export const POST_CATS: Record<string, any> = {
    safety: { en: 'Safety', ar: 'السلامة', tag: 'signs' },
    brand: { en: 'Branding', ar: 'الهوية والسوشيال', tag: 'digital' },
    print: { en: 'Print', ar: 'الطباعة', tag: 'print' },
};
