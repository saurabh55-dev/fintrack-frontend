import React, {useEffect, useState} from 'react';
import DashboardCard from './DashboardCard';
import {listCategories} from "../services/CategoryService.js";
import {
    listTransactions,
    transactionSummary,
    transactionSummaryByCategory,
    transactionSummaryMonthly
} from "../services/TransactionService.js";

const Dashboard = () => {

    const [totalNumOfCategories, setTotalCategories] = useState(0);
    const [totalNumOfTransactions, setTotalTransactions] = useState(0);
    const [transactionSummaryData, setTransactionSummaryData] = useState(null);
    const [categorySummaryData, setCategorySummaryData] = useState([]);
    const [monthlySummaryData, setMonthlySummaryData] = useState([]);

    useEffect(() => {
        listCategories()
            .then(response => setTotalCategories(response.data.length))
            .catch(error => console.error(error));
        listTransactions()
            .then(response => setTotalTransactions(response.data.length))
            .catch(error => console.error(error));
        transactionSummary()
            .then(response => setTransactionSummaryData(response.data))
            .catch(error => console.error(error));
        transactionSummaryByCategory()
            .then(response => setCategorySummaryData(response.data))
            .catch(error => console.error(error));
        transactionSummaryMonthly()
            .then(response => setMonthlySummaryData(response.data))
            .catch(error => console.error(error));
    },[])

    // Sample data matching your API response exactly
    const dashboardData = {
        totalCategories: totalNumOfCategories,
        totalTransactions: totalNumOfTransactions,
        transactionSummary: transactionSummaryData,
        categorySummary: categorySummaryData,
        monthlySummary: monthlySummaryData
    };

    return (
        <div className="container-fluid">
            <h5>Welcome!</h5>
            <h1 className="text-center my-4">Finance Tracking System, FINTRACK</h1>
            <DashboardCard {...dashboardData} />
        </div>
    );
};

export default Dashboard;