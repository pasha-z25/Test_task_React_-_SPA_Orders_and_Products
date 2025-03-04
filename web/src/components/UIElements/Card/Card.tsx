import classNames from 'classnames';

interface ICardProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  hasHover?: boolean;
}

export default function Card({
  children,
  className,
  disabled,
  hasHover,
}: ICardProps) {
  return (
    <div
      className={classNames(
        'ui-card rounded border bg-white px-4 py-3 shadow-md',
        className,
        { 'pointer-events-none grayscale': disabled },
        { 'hover:scale-[1.01] hover:shadow-xl': hasHover }
      )}
    >
      {children}
    </div>
  );
}
