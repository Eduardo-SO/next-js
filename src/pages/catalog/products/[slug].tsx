import { useCallback, useState } from 'react';;
import { useRouter } from 'next/router';
import dynamic  from 'next/dynamic';

import { Container, Title, Button } from '../../../styles/pages';

const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

export default function Product() {
  const route = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);
  
  const handleAddToCart = useCallback(() => {
    setIsAddToCartModalVisible(!isAddToCartModalVisible);
  }, []);

  return (
    <Container>
      <Title>{route.query.slug}</Title>

      <Button onClick={handleAddToCart}>Add to cart</Button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </Container>
  )
}