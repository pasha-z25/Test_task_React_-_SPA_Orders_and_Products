import { Navigation, User } from './components';

export default function Aside() {
  return (
    <aside className="shadow-xs flex flex-col items-center justify-center gap-10 border-r p-8">
      <User />
      <Navigation />
    </aside>
  );
}
