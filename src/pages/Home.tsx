import { FC, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { Pagination } from '../components/Pagination';
import { Categories } from '../components/Categories';
import { SortPopup, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

import { setCategoriesIndex, setCurrentPage, setFilters } from '../redux/filter/slice';
import { SearchPizzaParams } from '../redux/pizzas/slice';
import { fetchPizza } from '../redux/pizzas/asyncActions';
import { selectPizzaItem } from '../redux/pizzas/selectors';
import { RootState, useAppDispatch } from '../redux/store';

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoriesIndex = useSelector((state: RootState) => state.filter.categoriesIndex);
  const sortId = useSelector((state: RootState) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state: RootState) => state.filter.currentPage);
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);

  const { items, status } = useSelector(selectPizzaItem);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoriesIndex(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = async () => {
    const sortBy = sortId.replace('-', '');
    const order = sortId.includes('-') ? 'asc' : 'desc';
    const category = categoriesIndex > 0 ? `category=${categoriesIndex}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizza({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  //  Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoriesIndex: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем лист айтемов
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoriesIndex, sortId, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortId,
        categoriesIndex,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoriesIndex, sortId, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoriesIndex} onChangeCategory={onChangeCategory} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="cart cart--empty">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы.
            <br />
            Попробуйте попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
