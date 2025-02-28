import { RiShieldUserFill } from 'react-icons/ri';

export default async function Header() {
  return (
    <header className="py-4 shadow-lg">
      <div className="container mx-auto">
        <RiShieldUserFill size={100} color="green" />
      </div>
    </header>
  );
}
