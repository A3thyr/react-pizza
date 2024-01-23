import { FC } from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
};

export default Categories;
