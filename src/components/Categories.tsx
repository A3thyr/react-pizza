import { FC, memo } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  useWhyDidYouUpdate('Categories', { value, onChangeCategory });
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryValue, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {categoryValue}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
