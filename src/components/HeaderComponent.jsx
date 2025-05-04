import {NavLink} from "react-router-dom";

const HeaderComponent = () => {

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#2c3e50'}}>
                    <a className="navbar-brand" href="/">FinTrack</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to='/'>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink className='nav-link' to='/categories'>Categories</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink className='nav-link' to='/transactions'>Transactions</NavLink>
                                </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export default HeaderComponent