import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {listTransactions, removeTransaction} from "../services/TransactionService.js";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [typeFilter, setTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [categories, setCategories] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllTransactions();
    }, []);

    function addNewTransaction(){
        navigator('/add-transaction')
    }

    function getAllTransactions(){
        listTransactions()
            .then(response => {
                setTransactions(response.data);
                const uniqueCategories = [...new Set(response.data.map(transaction => transaction.category.name))];
                setCategories(uniqueCategories);
            }).catch(error => console.error(error))
    }

    function updateTransaction(transactionId){
        navigator(`/update-transaction/${transactionId}`);
    }
    function deleteTransaction(transactionId){
        removeTransaction(transactionId)
            .then(() => getAllTransactions())
            .catch(error => console.error(error))
    }

    function clearFilters(){
        setTypeFilter('');
        setCategoryFilter('');

    }

    const filteredTransactions = transactions.filter(transaction => {
        const matchesType = typeFilter ? transaction.type.toUpperCase() === typeFilter.toUpperCase() : true;
        const matchesCategory = categoryFilter ? transaction.category.name === categoryFilter : true;
        return matchesType && matchesCategory;
    })

    return (
        <div className="container">
            <h1 className="text-center">All Transactions</h1>
            <div className="mb-3 d-flex align-items-center gap-2">
                <button className="btn btn-primary" onClick={addNewTransaction}>Add New Transaction</button>
                <select
                    className="form-select"
                    style={{ width: '200px' }}
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="">Filter by Type</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <select
                    className="form-select"
                    style={{ width: '200px' }}
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Filter by Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                <button className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Transaction Id</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {filteredTransactions.map((transaction, index) => (
                    <tr key={transaction.transactionId}>
                        <td>{index + 1}</td>
                        <td>{transaction.transactionId}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.category.name}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.description}</td>
                        <td>
                            <button className="btn btn-info"
                                    onClick={() => updateTransaction(transaction.transactionId)}
                            >Update</button>
                            <button className="btn btn-danger"
                                    onClick={() => deleteTransaction(transaction.transactionId)}
                                    style={{marginLeft: '10px'}}
                            >Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default Transactions