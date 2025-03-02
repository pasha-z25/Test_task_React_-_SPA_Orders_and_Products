import { client } from '@/utils/helpers';
import type { Product } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function Products() {
  const products: Product[] = await client.get('/products');

  return (
    <section>
      <ul>
        {!!products.length &&
          products.map((product: Product) => (
            <li key={product.id}>
              <Image
                src={product.photo}
                alt={product.title}
                width="250"
                height="250"
                unoptimized={true}
              />
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
