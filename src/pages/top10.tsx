import { GetStaticProps } from 'next';

import { Container, Title } from '@/styles/pages';

interface IProducts {
  id: number;
  title: string;
}

interface Top10Props {
  products: IProducts[];
}

export default function Top10({ products }: Top10Props) {
  return (
    <Container>
      <div>
        <Title>Top 10</Title>

        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.id}</strong>
              <span> {product.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 5,
  }
}