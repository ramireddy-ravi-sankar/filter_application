
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFilterStore } from '@/store/useFilterStore';
import FilterControls from './FilterControls';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


interface Product {
    id: number;
    productName: string;
    email: string;
    phoneNo: string;
    address: string;
    createdAt:string;
}

const UserTable = () => {
    const [data, setData] = useState<Product[]>([]);
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const filters = useFilterStore((state) => state.filters); // Use Zustand store
    const appliedFilters = useFilterStore((state) => state.appliedFilters); // Use applied filters
    const setTableFields = useFilterStore((state) => state.setTableFields); // Zustand action to set fields

    useEffect(() => {
        axios
            .get<Product[]>('https://66a119337053166bcabdfe60.mockapi.io/products')
            .then((res) => {
                setData(res.data);
                setFilteredData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // Set the table fields into Zustand
        setTableFields([
            { value: 'id', label: 'ID' },
            { value: 'productName', label: 'Product Name' },
            { value: 'email', label: 'Email' },
            { value: 'phoneNo', label: 'Phone' },
            { value: 'address', label: 'City' },
            { value: 'createdAt', label: 'Date' },
        ]);
    }, [setTableFields]);

    useEffect(() => {
        applyFilters(filters); // Apply filters on filter change
    }, [appliedFilters]);

    const applyFilters = (filters: any[]) => {
        let filtered = [...data];
        filters.forEach((filter) => {
            if (filter.field && filter.condition && filter.value) {
                filtered = filtered.filter((product) => {
                    let fieldValue: string;
                    if (filter.field in product) {
                        fieldValue = String(product[filter.field as keyof Product] || '').toLowerCase();
                    } else {
                        return true;
                    }

                    const filterValue = filter.value.toLowerCase();
                    switch (filter.condition) {
                        case 'equals':
                            return fieldValue === filterValue;
                        case 'contains':
                            return fieldValue.includes(filterValue);
                        case 'greater than':
                            return +fieldValue > +filterValue;
                        case 'less than':
                            return +fieldValue < +filterValue;
                        case 'between':
                            const [min, max] = filterValue.split(',').map((v: string) => +v.trim());
                            return +fieldValue >= min && +fieldValue <= max;
                        default:
                            return true;
                    }
                });
            }
        });
        setFilteredData(filtered);
    };

    return (
        <div className="w-screen px-4 pt-10">
            <div className="flex justify-start mb-4">
                <FilterControls />
            </div>
            <div className="overflow-x-auto">
                <div className="bg-white shadow-md rounded-lg">
                    <Table className="w-full table-auto">
                        <TableCaption>A list of products fetched from the API.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left px-4 py-2">ID</TableHead>
                                <TableHead className="text-left px-4 py-2">Product Name</TableHead>
                                <TableHead className="text-left px-4 py-2">Email</TableHead>
                                <TableHead className="text-left px-4 py-2">Phone</TableHead>
                                <TableHead className="text-left px-4 py-2">City</TableHead>
                                <TableHead className="text-left px-4 py-2">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="px-4 py-2 font-medium">{product.id}</TableCell>
                                    <TableCell className="px-4 py-2">{product.productName}</TableCell>
                                    <TableCell className="px-4 py-2">{product.email}</TableCell>
                                    <TableCell className="px-4 py-2">{product.phoneNo}</TableCell>
                                    <TableCell className="px-4 py-2">{product.address}</TableCell>
                                    <TableCell className="px-4 py-2">{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default UserTable;
