import { GetServerSideProps } from 'next';
import Link from 'next/link';

import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

import { client } from '@/lib/prismic';
import SEO from '@/components/SEO';
import { Container, Title } from '@/styles/pages';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <Container>
      <SEO 
        title="DevCommerce, your best e-commerce" 
        shouldExcludeTitleSuffix={false} 
        image="boost.png" 
      />

      <div>
        <Title>Produtos recomendados</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  <strong>{recommendedProduct.id}</strong>
                  <span> {PrismicDOM.RichText.asText(recommendedProduct.data.title)}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  // const recommendedProducts = await response.json();

  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}
