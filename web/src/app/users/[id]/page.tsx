import { client } from '@/utils/helpers';
import type { IPageProps, User } from '@/utils/types';

export default async function User({ params }: IPageProps) {
  const { id } = params;
  const user: User = await client(`/users/${id}`);

  return (
    <section>
      User page
      <p>{user.name}</p>
    </section>
  );
}
