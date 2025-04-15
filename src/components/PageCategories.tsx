import { useRef, useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import styles from '../style/PageCategories.module.css';
import { categories } from './data';
import CategoryCard from './CategoryCard';

function PageCategories({ category }: { category: string }) {
  const filteredCategories = category === "All"
    ? categories
    : categories.filter(item => item.category === category);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(300);

  // Adjust scroll distance based on screen width
  useEffect(() => {
    const handleResize = () => {
      setScrollAmount(window.innerWidth <= 600 ? 440 : 300);
    };
    handleResize(); // Set on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="container ">
      <div className="row ">
        <div className="col-md-12">
          <h3 className={`${styles.pageCategoriesHeading} mb-0 text-center`}>
            Which of the following products best matches your style?
          </h3>
        </div>
        <div className="col-md-12 py-4 position-relative">
        <div 
          ref={sliderRef} 
          className="row flex-nowrap justify-content-center overflow-hidden py-3"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredCategories.map((item, index) => (
            <div className="col-md-3" key={index} style={{ minWidth: '250px' }}>
              <CategoryCard category={item} />
            </div>
          ))}
        </div>

          <div className={`${styles.sliderBtnContainer} position-absolute`}>
            <button onClick={scrollLeft} className={`${styles.sliderBtn}`}>
              <MdArrowBackIosNew />
            </button>
            <button onClick={scrollRight} className={`${styles.sliderBtn}`}>
              <MdArrowForwardIos />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageCategories;
