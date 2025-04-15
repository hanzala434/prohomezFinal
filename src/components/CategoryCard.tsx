import { Link } from 'react-router-dom';
import styles from '../style/CategoryCard.module.css'
import { Category } from './types';

interface CategoryCardProps {
    category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={category.src || "#"} className="text-decoration-none">
        <div className={`${styles.categoryCard} d-flex justify-content-center align-items-center`}>
            <div className={`${styles.categoryImgBox}`}>
                <img src={category.img} alt={category.buttonText} />
            </div>
            <div className={`${styles.categoryContentBox} d-flex flex-column align-items-center`}>
                <h4 className={`${styles.categoryContentHeading} mb-0`}>{category.buttonText}</h4>
            </div>
        </div>
    </Link>
  )
}

export default CategoryCard