import { client } from '@/utils/helpers';
import type { IPageProps, Order } from '@/utils/types';

export default async function Order({ params }: IPageProps) {
  const { id } = params;
  const order: Order = await client(`/orders/${id}`);

  return (
    <section>
      Order page
      <p>{order.title}</p>
    </section>
  );
}
