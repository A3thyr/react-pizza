import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Fullpizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://659d95dd47ae28b0bd34a20f.mockapi.io/pizzas/' + id,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="asdfa">
      <img src={pizza.imageUrl} alt="sdfasf" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default Fullpizza;
