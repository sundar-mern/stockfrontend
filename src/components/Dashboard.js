import { Link } from "react-router-dom";
var Dashboard = () => {
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Dashboard</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Welcome to Inventory Management</h2>
                </div>
            </div>
        </>
    )
}
export default Dashboard;