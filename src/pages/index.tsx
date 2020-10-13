import { GetServerSideProps } from 'next';

import SEO from '@/components/SEO';
import { Container, Title } from '@/styles/pages';

interface IProducts {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProducts[];
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
              <strong>{recommendedProduct.id}</strong>
              <span> {recommendedProduct.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
