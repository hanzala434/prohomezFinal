import { Link, useLocation } from 'react-router-dom';
import styles from '../style/VendorDashboardProducts.module.css';
import VendorProducts from './VendorProducts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import { fetchVendorProducts } from '../features/products/productSlice';

interface VendorSidebarMainProps {
  isAdmin: boolean;
}

function  VendorDashboardProducts({ isAdmin }: VendorSidebarMainProps) {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');

  // Use vendorItems from the Redux state
  const vendorProducts = useSelector((state: RootState) => state.products.vendorItems);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  // Fetch vendor-specific products
  useEffect(() => {
    dispatch(fetchVendorProducts());
  }, [location.pathname, dispatch]);

  // Handle success messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`${styles.vendorDashboard}`}>
      {message && (
        <div className={`alert alert-success alert-dismissible fade show`} role="alert">
          <strong>Success!</strong> {message}
        </div>
      )}
      {
        !isAdmin && 
        <div className={`${styles.addNewButtonBox}`}>
          <Link
            to="/vendor-dashboard/products/create"
            className={`${styles.vendorDashboardLink} text-decoration-none btn`}
          >
            Add New
          </Link>
        </div>
      }
      <div className={`${styles.allProducts}`}>
        <h3 className={`${styles.allProductHeading}`}>All Products</h3>
        <div className={`${styles.vendorProductBox}`}>
          {status === 'loading' && <p>Loading products...</p>}
          {status === 'succeeded' && vendorProducts.length > 0 && (
            <VendorProducts products={vendorProducts} />
          )}
          {status === 'succeeded' && vendorProducts.length === 0 && (
            <p>No products available.</p>
          )}
          {status === 'failed' && <p>Failed to load products: {error}</p>}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboardProducts;
