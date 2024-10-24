interface IButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  title,
  onClick,
  className = "",
  ...rest
}: IButtonProps) {
  return (
    <button
      className={`
      max-w-max px-2.5 py-1 rounded-md hover:brightness-90 font-semibold transition duration-150 outline-none text-sm
      sm:px-4 sm:py-1.5 sm:text-base
      ${className}
    `}
      {...rest}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
