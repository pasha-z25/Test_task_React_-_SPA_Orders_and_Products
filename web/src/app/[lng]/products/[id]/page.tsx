import { client } from '@/utils/helpers';
import type { IPageProps, Product } from '@/utils/types';

export default async function Product({ params }: IPageProps) {
  const { id } = await params;
  const product: Product = await client(`/products/${id}`);

  return (
    <section>
      Product page
      <p>{product.title}</p>
    </section>
  );
}
