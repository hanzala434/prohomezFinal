import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  
};
type Props = {
  isAdmin: boolean;
};
const Customer: React.FC<Props> = ({ isAdmin }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchCustomers = async () => {
      try {
        const res = await axios.get<Customer[]>(`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/customersdata`);
        console.log(res);

        setCustomers(res.data.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();

  }, []);


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      <ul className="space-y-2">
        {customers.map((customer) => (
          <li key={customer.id} className="border p-4 rounded shadow-sm">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Address:</strong> {customer.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customer;
