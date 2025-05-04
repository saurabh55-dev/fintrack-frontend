import React from 'react';
import { Card, Row, Col, ProgressBar, Table } from 'react-bootstrap';

const DashboardCard = ({
                           totalCategories,
                           totalTransactions,
                           transactionSummary,
                           categorySummary,
                           monthlySummary
                       }) => {
    // Calculate percentages for category summary
    const totalAmount = categorySummary.reduce((sum, category) => sum + category.total, 0);
    const categorySummaryWithPercentage = categorySummary.map(category => ({
        ...category,
        percentage: totalAmount > 0 ? Math.round((category.total / totalAmount) * 100) : 0
    }));

    return (
        <div className="dashboard-container mt-4">
            <Row className="mb-4">
                {/* Total Categories Card */}
                <Col md={3} sm={6} className="mb-3">
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <Card.Title>Total Categories</Card.Title>
                            <h2 className="display-4 text-primary">{totalCategories}</h2>
                            <Card.Text className="text-muted">
                                All available categories
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Total Transactions Card */}
                <Col md={3} sm={6} className="mb-3">
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <Card.Title>Total Transactions</Card.Title>
                            <h2 className="display-4 text-success">{totalTransactions}</h2>
                            <Card.Text className="text-muted">
                                All recorded transactions
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Transaction Summary Card */}
                <Col md={6} sm={12} className="mb-3">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>Transaction Summary</Card.Title>
                            {transactionSummary ? (
                                <Row className="mt-3">
                                    <Col>
                                        <h5 className="text-success">Income</h5>
                                        <h4>NPR. {transactionSummary.totalIncome.toFixed(2)}</h4>
                                    </Col>
                                    <Col>
                                        <h5 className="text-danger">Expenses</h5>
                                        <h4>NPR. {transactionSummary.totalExpense.toFixed(2)}</h4>
                                    </Col>
                                    <Col>
                                        <h5>Balance</h5>
                                        <h4 className={
                                            transactionSummary.balance >= 0 ? 'text-success' : 'text-danger'
                                        }>
                                            NPR. {transactionSummary.balance.toFixed(2)}
                                        </h4>
                                    </Col>
                                </Row>
                            ): (
                                <p>Loading summary...</p> // or show a nice spinner here if you want
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                {/* Category Summary Card */}
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>Transactions by Category</Card.Title>
                            {categorySummary ? (
                                <div className="mt-3">
                                    {categorySummaryWithPercentage.map((category, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>{category.category}</span>
                                                <span>NPR. {category.total.toFixed(2)} ({category.percentage}%)</span>
                                            </div>
                                            <ProgressBar
                                                now={category.percentage}
                                                variant={getVariant(index)}
                                                className="mb-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Loading summary...</p> // or show a nice spinner here if you want
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Monthly Summary Card */}
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>Monthly Summary</Card.Title>
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Income</th>
                                    <th>Expenses</th>
                                    <th>Balance</th>
                                </tr>
                                </thead>
                                {monthlySummary ? (
                                    <tbody>
                                    {monthlySummary.map((month, index) => {
                                        const balance = month.income - month.expense;
                                        return (
                                            <tr key={index}>
                                                <td>{formatMonth(month.month)}</td>
                                                <td className="text-success">NPR. {month.income.toFixed(2)}</td>
                                                <td className="text-danger">NPR. {month.expense.toFixed(2)}</td>
                                                <td className={
                                                    balance >= 0 ? 'text-success' : 'text-danger'
                                                }>
                                                    NPR. {balance.toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                ) : (
                                    <p>Loading summary...</p> // or show a nice spinner here if you want
                                )}
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

// Helper function to get different Bootstrap variants for progress bars
const getVariant = (index) => {
    const variants = ['primary', 'success', 'info', 'warning', 'danger'];
    return variants[index % variants.length];
};

// Helper function to format YYYY-MM to Month YYYY
const formatMonth = (monthString) => {
    const [year, month] = monthString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export default DashboardCard;