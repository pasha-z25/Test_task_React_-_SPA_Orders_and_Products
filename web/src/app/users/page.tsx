import { client } from '@/utils/helpers';
import type { User } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function Users() {
  const users: User[] = await client('/users');

  return (
    <section>
      <ul>
        {!!users.length &&
          users.map((user: User) => (
            <li key={user.id}>
              <Image
                src={user.avatar}
                alt={user.name}
                width="250"
                height="250"
                unoptimized={true}
              />
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
