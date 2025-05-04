import {useEffect, useState} from "react";
import {createCategory, editCategory, getCategoryById} from "../services/CategoryService.js";
import {useNavigate, useParams} from "react-router-dom";

const SaveCategory = () => {
    const [name, setName] = useState('');
    const navigator = useNavigate();
    const [error, setError] = useState({name: ''});
    const {categoryId} = useParams();

    useEffect(() => {
        if(categoryId){
            getCategoryById(categoryId)
                .then((response) => setName(response.data.name))
                .catch(error => console.error(error))
        }
    }, [])

    function saveCategory(event){
        event.preventDefault();

        if(validateForm()){
            const category = {name};

            if(categoryId){
                editCategory(categoryId, category)
                    .then(() => navigator('/categories'))
                    .catch(error => console.error(error))
            }else{
                createCategory(category)
                    .then(() => navigator('/categories'))
                    .catch(error => console.error(error))
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {...error};
        if(name.trim()){
            errorsCopy.name = '';
        }else{
            errorsCopy.name = 'Category Name is required';
            valid = false;
        }
        setError(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(categoryId) return <h2 className="text-center">Update Category</h2>;
        else return <h2 className="text-center">Add New Category</h2>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 mt-5">
                    {pageTitle()}
                    <div className="card-body">
                        <form >
                            <div className="form-group mb-2">
                                <label className="form-label">Category Name</label>
                                <input className={`form-control ${error.name ? 'is-invalid' : ''}`}
                                       type="text" placeholder="Enter Category Name" name="categoryName" value={name}
                                       onChange={(e) => setName(e.target.value)}
                                />
                                {error.name && <div className="invalid-feedback">{error.name}</div> }
                            </div>
                            <button className="btn btn-success" onClick={saveCategory}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SaveCategory