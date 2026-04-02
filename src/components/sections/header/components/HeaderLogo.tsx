import { Link } from '@/i18n/navigation'

interface LogoProps {
    ownerName: string;
}

export function HeaderLogo({ ownerName }: LogoProps) {
    return (
        <Link
            href="/"
            className="font-thin text-body-lg leading-none tracking-normal hover:opacity-75 transition-opacity"
        >
            {ownerName}
        </Link>
    );
}