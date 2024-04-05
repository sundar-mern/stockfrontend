import { Link } from "react-router-dom";

var Home = () => {
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">HomePage</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <p>Welcome to our Stock Management System, your one-stop solution for efficiently managing your inventory, customers, and suppliers. Our platform provides comprehensive features to streamline your business operations and optimize your stock management process.

With our system, you can easily manage your inventory by adding, updating, and deleting items as needed. You have full control over your stock levels, ensuring that you always have the right products on hand to meet customer demand.

In addition to managing items, our system allows you to keep track of your customers and suppliers. You can maintain detailed records of transactions and build strong relationships with your business partners.

One of the key features of our system is the ability to handle sales and purchases seamlessly. Whether you're selling products to customers or purchasing items from suppliers, our platform automates the process and updates your stock levels in real-time, ensuring accuracy and efficiency.

Furthermore, our reporting functionality provides valuable insights into your business performance. You can generate reports based on sales and purchases.

With our Stock Management System, you can take control of your inventory, streamline your operations, and make smarter business decisions. Experience the power of efficient stock management with our user-friendly and feature-rich platform.</p>

                    
                </div>
            </div>
        </>
    )
}
export default Home;