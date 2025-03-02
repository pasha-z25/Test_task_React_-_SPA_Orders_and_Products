import classNames from 'classnames';

interface ICardProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Card({ children, className, disabled }: ICardProps) {
  return (
    <div
      className={classNames(
        'ui-card rounded border bg-white px-4 py-3 shadow-md hover:scale-[1.01] hover:shadow-xl',
        className,
        { 'pointer-events-none grayscale': disabled }
      )}
    >
      {children}
    </div>
  );
}
