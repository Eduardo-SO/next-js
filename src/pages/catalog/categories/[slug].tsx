import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Container, Title } from '../../../styles/pages';

interface IProduct {
  id: number;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const route = useRouter();

  if (route.isFallback) {
    return (
      <p>Carregando...</p>
    )
  }
  
  return (
    <Container>
      <div>
        <Title>{route.query.slug}</Title>

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
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map((category: IProduct) => {
    return {
      params: { slug: category.id }
    }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}