import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

import { client } from '@/lib/prismic';
import { Container, Title } from '../../../styles/pages';

interface CategoryProps {
  category: Document;
  products: Document[];
}

export default function Category({ category, products }: CategoryProps) {
  const route = useRouter();

  if (route.isFallback) {
    return (
      <p>Carregando...</p>
    )
  }
  
  return (
    <Container>
      <div>
        <Title>
          {PrismicDOM.RichText.asText(category.data.title)}
        </Title>

        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link href={`/catalog/products/${product.uid}`}>
                <a>
                  <strong>{product.id}</strong>
                  <span> {PrismicDOM.RichText.asText(product.data.title)}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);

  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category')
  ]);

  const paths = categories.results.map((category) => {
    return {
      params: { slug: category.uid }
    }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;

  const category = await client().getByUID('category', String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id),
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  }
}