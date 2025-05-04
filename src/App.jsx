import './App.css';
import Categories from "./components/Categories.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import SaveCategory from "./components/SaveCategory.jsx";
import Transactions from "./components/Transactions.jsx";
import SaveTransaction from "./components/SaveTransaction.jsx";

function App() {

  return (
      <div className="d-flex flex-column min-vh-100">
          <BrowserRouter>
              <HeaderComponent />
              <main className="flex-grow-1">
                  <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/categories" element={<Categories />}/>
                      <Route path="/add-category" element={<SaveCategory />} />
                      <Route path="/update-category/:categoryId" element={<SaveCategory />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/add-transaction" element={<SaveTransaction />} />
                      <Route path="/update-transaction/:transactionId" element={<SaveTransaction />} />
                  </Routes>
              </main>
              <FooterComponent />
          </BrowserRouter>
      </div>
  )
}

export default App
