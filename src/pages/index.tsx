import { useCallback } from 'react';
import { GetServerSideProps } from 'next';

import { Container, Title, Button } from '../styles/pages';

interface IProducts {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProducts[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  const handleSum = useCallback(async () => {
    const math = (await import('../lib/sum')).default;

    console.log(process.env.NEXT_PUBLIC_API_URL);

    alert(math.sum(5, 4));
  }, []);

  return (
    <Container>
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

        <Button onClick={handleSum}>Somar</Button>
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
