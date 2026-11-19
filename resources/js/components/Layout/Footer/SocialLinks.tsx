import { Icon } from '@/components/site/ui';
import { CONFIG } from '@/Data/config';

const link =
    'grid h-11 w-11 place-items-center rounded-full border border-ink-2 transition-colors hover:border-orange hover:bg-orange hover:text-black';

export default function SocialLinks() {
    return (
        <div className="mt-5 flex gap-2.5">
            <a
                className={link}
                href={CONFIG.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
            >
                <Icon.Facebook />
            </a>
            <a
                className={link}
                href={CONFIG.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
            >
                <Icon.Instagram />
            </a>
            <a
                className={link}
                href={CONFIG.social.linkedin}
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
            >
                <Icon.LinkedIn />
            </a>
        </div>
    );
}
