import { useLocation } from 'react-router-dom';
import styles from '../style/VendorDashboardVendors.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import { fetchAllVendors } from '../features/products/productSlice';
import DashboardVendors from './DashboardVendors.tsx';

function VendorDashboardVendors() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  // Use vendorItems from the Redux state
  const vendors = useSelector((state: RootState) => state.products.vendors);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  // Fetch vendor-specific products
  useEffect(() => {
    dispatch(fetchAllVendors());
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
      <div className={`${styles.allProducts}`}>
        {
          message && 
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> {message}
          </div>
        }
        <h3 className={`${styles.allProductHeading}`}>All Vendors</h3>
        <div className={`${styles.vendorProductBox}`}>
          {status === 'loading' && <p>Loading Vendors...</p>}
          {status === 'succeeded' && vendors.length > 0 && (
            
            <DashboardVendors vendors={vendors} setMessage={setMessage} />
          )}
          {status === 'succeeded' && vendors.length === 0 && (
            <p>No Vendors available.</p>
          )}
          {status === 'failed' && <p>Failed to load products: {error}</p>}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboardVendors;
