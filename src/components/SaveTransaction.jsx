import {useEffect, useState} from "react";
import {listCategories} from "../services/CategoryService.js";
import {createTransaction, editTransaction, getTransactionById} from "../services/TransactionService.js";
import {useNavigate, useParams} from "react-router-dom";

const SaveTransaction = () => {
    const [categories, setCategories] = useState([]);
    const [type, setType] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const {transactionId} = useParams();

    const [error, setError] = useState({
        type: '',
        category: '',
        date: '',
        amount: '',
        description: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        getCategories();

        if(transactionId){
            getTransactionById(transactionId)
                .then((response) => {
                    const {type, category, date, amount, description} = response.data;
                    setType(type.toUpperCase());
                    setCategoryId(category.categoryId);
                    setDate(date);
                    setAmount(amount);
                    setDescription(description);
                })
                .catch(error => console.error(error))
        }
    }, []);

    function getCategories(){
        listCategories()
            .then((response) => setCategories(response.data))
            .catch(error => console.error(error))
    }

    function saveTransaction(event){
        event.preventDefault();

        if(validateForm()){
            const transaction = {type, categoryId, date, amount, description};

            if(transactionId){
                editTransaction(transactionId, transaction)
                    .then(() => navigator('/transactions'))
                    .catch(error => console.error(error))
            }else{
                createTransaction(categoryId, transaction)
                    .then(() => navigator('/transactions'))
                    .catch(error => console.error(error))
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {...error};

        if(type.trim()){
            errorsCopy.type = '';
        }else{
            errorsCopy.type = 'Transaction Type is required';
            valid = false;
        }

        if(categoryId){
            errorsCopy.category = '';
        }else{
            errorsCopy.category = 'Category is required';
            valid = false;
        }

        if(date.trim()){
            errorsCopy.date = '';
        }else{
            errorsCopy.date = 'Date is required';
            valid = false;
        }

        if(amount && amount > 0){
            errorsCopy.amount = '';
        }else{
            errorsCopy.amount = 'Amount is required and must be greater than 0';
            valid = false;
        }

        if(description.trim()){
            errorsCopy.description = '';
        }else{
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        setError(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(transactionId) return <h2 className="text-center">Update Transaction</h2>;
        else return <h2 className="text-center">Add New Transaction</h2>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 mt-5">
                    {pageTitle()}
                    <div className="card-body">
                        <form >
                            <div className="form-group mb-2">
                                <label className="form-label">Transaction Type</label>
                                <select className={`form-control ${error.type ? 'is-invalid' : ''}`}
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}>
                                    <option value ="">--Select--</option>
                                    <option value="INCOME">Income</option>
                                    <option value="EXPENSE">Expense</option>
                                </select>
                                {error.type && <div className="invalid-feedback">{error.type}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Category</label>
                                <select className={`form-control ${error.category ? 'is-invalid' : ''}`}
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value="">--Select--</option>
                                    {categories.map((category) => (
                                         <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                                    ))}
                                </select>
                                {error.category && <div className="invalid-feedback">{error.category}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Date</label>
                                <input className={`form-control ${error.date ? 'is-invalid' : ''}`} type="date" placeholder="Enter Date" name="date" value={date}
                                       onChange={(e) => setDate(e.target.value)}
                                />
                                {error.date && <div className="invalid-feedback">{error.date}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Amount</label>
                                <input className={`form-control ${error.amount ? 'is-invalid' : ''}`} type="number" placeholder="Enter Amount" name="amount" value={amount}
                                       onChange={(e) => setAmount(e.target.value)}
                                />
                                {error.amount && <div className="invalid-feedback">{error.amount}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Description</label>
                                <input className={`form-control ${error.description ? 'is-invalid' : ''}`} type="text" placeholder="Enter Description" name="description" value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                />
                                {error.description && <div className="invalid-feedback">{error.description}</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveTransaction}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SaveTransaction