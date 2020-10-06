import { GetServerSideProps } from 'next';

import { Container, Title } from '../styles/pages/Home';

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
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
