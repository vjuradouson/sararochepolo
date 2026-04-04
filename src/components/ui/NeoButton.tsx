type NeoButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    size?: "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
};

export default function NeoButton({
    children,
    onClick,
    className = "",
    size = "md",
    type = "button",
}: NeoButtonProps) {
    const sizes = {
        sm: "px-6 py-3 text-sm gap-3",
        md: "px-10 py-5 text-base gap-4",
        lg: "px-12 py-6 text-lg gap-6",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`
        flex items-center
        rounded-full
        bg-[#e6e6e6]
        text-[#2f5d62]
        tracking-[0.3em]
        font-light
        
        shadow-[8px_8px_16px_#c5c5c5,0px_0px_0px_#ffffff]
        transition-all duration-200
        
        hover:shadow-[4px_4px_8px_#c5c5c5,0px_0px_0px_#ffffff]
        active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_#ffffff]

        cursor-pointer
        ${sizes[size]}
        ${className}
      `}
        >
            {children}
        </button>
    );
}