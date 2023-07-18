import React, { useEffect, useState } from 'react';
import { data } from '../MockData'
import DataTable from 'react-data-table-component';


const CustomerTable = () => {

    const [customers, setCustomers] = useState(data);
    const [filteredCustomers, setFilteredCustomers] = useState(data);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectOption, setSelectOption] = useState('all');

    const handleChange =({selectedRows}) => {
        setSelectedRows(selectedRows);
        console.log(selectedRows.map((item) => item.id))
    }

    useEffect(() => {
        const filteredData = customers.filter((customer) => customer.first_name.toLowerCase().match(searchInput.toLowerCase()) || 
                                                            customer.last_name.toLowerCase().match(searchInput.toLowerCase() ))
        setFilteredCustomers(filteredData);

    }, [searchInput])

    useEffect(() => {
        if(selectOption == 'indian'){
            const result = customers.filter((customer) => customer.country === 'India')
            setFilteredCustomers(result);
        }else if(selectOption === 'non-indian'){
            const result = customers.filter((customer) => customer.country !== 'India')
            setFilteredCustomers(result);
        }else{
            setFilteredCustomers(customers);
        }
    },[selectOption])

    const customStyles = {
        cells: {
           style: {
            fontSize: '1rem',
           } 
        },
        headCells: {
            style: {
                fontSize: '1.2rem',
                fontWeight: 'bold',
            }
        },
        rows: {
            style: {
                minHeight: '50px',
            },
        },
    }

    const columns = [
        {
            name: 'S.No',
            selector: 'id',
            sortable: true
        }, {
            name: 'Name',
            selector: row => row.first_name + ' ' + row.last_name,
            sortable: true
        }, {
            name: 'Email',
            selector: row => row.email
        },{
            name: 'Sex',
            selector: row => row.gender
        },{
            name: 'Country',
            selector: row => row.country
        },{
            name: 'Age',
            selector: row => row.age
        }
    ]
    
  return (
    <div className="h-screen w-full p-4  m-2 ">
        <DataTable
            title="Customer Details"
            columns={columns}
            data={filteredCustomers}
            highlightOnHover
            selectableRows
            customStyles={customStyles}
            fixedHeader
            pagination
            onSelectedRowsChange={handleChange}
            responsive
            striped
            subHeader
            subHeaderComponent={
                <div className='flex gap-4 w-full justify-end'>
                <select className='px-2 py-1 border outline-none rounded-md' value={selectOption} onChange={(e) => setSelectOption(e.target.value)}>
                    <option value="all">All</option>
                    <option value="indian">Indians</option>
                    <option value="non-indian">Non-Indians</option>
                </select>
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" className='py-2 px-5 text-base shadow-lg w-[40%] focus:ring-2 focus:ring-slate-700 outline-none border rounded-lg' placeholder='Search here for a customer name....' />
                </div>
            }
            subHeaderAlign='center'
            
        />
    </div>
  )
}

export default CustomerTable