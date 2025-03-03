import type { IPageProps } from '@/utils/types';
import { OneUser } from '@/views';

export default async function User({ params }: IPageProps) {
  const { id } = await params;

  if (!id) return null;

  return <OneUser userId={id} />;
}
