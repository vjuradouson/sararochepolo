'use client';

import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { trackCtaClick } from '@/lib/gtm';

type FooterSocialsProps = {
    linkedinHref: string;
    linkedinLabel: string;
    instagramHref: string;
    instagramLabel: string;
};

const NETWORKS = [
    {
        id: 'linkedin',
        hoverColor: 'group-hover:text-[#0A66C2]',
        Icon: FaLinkedin,
    },
    {
        id: 'instagram',
        hoverColor: 'group-hover:text-pink-500',
        Icon: FaInstagram,
    },
] as const;

export default function FooterSocials({
    linkedinHref,
    linkedinLabel,
    instagramHref,
    instagramLabel,
}: FooterSocialsProps) {
    const items = [
        { ...NETWORKS[0], href: linkedinHref, label: linkedinLabel },
        { ...NETWORKS[1], href: instagramHref, label: instagramLabel },
    ];

    return (
        <div className="flex gap-6 text-lg">
            {items.map(({ id, hoverColor, Icon, href, label }) => (
                <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                        trackCtaClick({
                            cta_id: `footer_social_${id}`,
                            cta_location: 'footer',
                            cta_label: label,
                            cta_destination: href,
                        })
                    }
                    className="group flex items-center gap-2"
                >
                    <Icon
                        className={`w-4 h-4 text-dark-blue/60 ${hoverColor} transition-colors duration-300`}
                    />
                    <span>{label}</span>
                </a>
            ))}
        </div>
    );
}
