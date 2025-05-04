import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {listCategories, removeCategory} from "../services/CategoryService.js";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllCategories();
    }, [])

    function addNewCategory(){
        navigator('/add-category')
    }

    function getAllCategories(){
        listCategories()
            .then((response) => setCategories(response.data))
            .catch(error => console.error(error))
    }

    function updateCategory(categoryId){
        navigator(`/update-category/${categoryId}`);
    }

    function deleteCategory(categoryId){
        removeCategory(categoryId)
            .then(() => getAllCategories())
            .catch(error => console.error(error))
    }

    return (
        <div className="container">
            <h1 className="text-center">All Categories</h1>
            <button className="btn btn-primary mb-2" onClick={addNewCategory}>Add New Category</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.categoryId}>
                            <td>{index + 1}</td>
                            <td>{category.categoryId}</td>
                            <td>{category.name}</td>
                            <td>
                                <button className="btn btn-info"
                                        onClick={() => updateCategory(category.categoryId)}
                                >Update</button>
                                <button className="btn btn-danger"
                                        onClick={() => deleteCategory(category.categoryId)}
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

export default Categories
