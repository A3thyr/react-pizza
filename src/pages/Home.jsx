import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../App';

import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesIndex, setCategoriesIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortId, setSortId] = useState({
    name: 'популяронсти',
    sort: 'rating',
  });

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortId.sort.replace('-', '');
    const order = sortId.sort.includes('-') ? 'asc' : 'desc';
    const category = categoriesIndex > 0 ? `category=${categoriesIndex}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://659d95dd47ae28b0bd34a20f.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((response) => response.json())
      .then((array) => {
        setItems(array);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoriesIndex, sortId, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoriesIndex}
          onClickCategory={(index) => setCategoriesIndex(index)}
        />
        <Sort value={sortId} onClickSort={(index) => setSortId(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
