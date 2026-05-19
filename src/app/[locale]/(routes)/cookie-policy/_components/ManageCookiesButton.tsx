'use client';

type Props = {
    label: string;
};

export default function ManageCookiesButton({ label }: Props) {
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
            className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white"
        >
            {label}
        </button>
    );
}
