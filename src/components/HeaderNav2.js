import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App";

var HeaderNav2 = () => {
    const { userdata, setuserdata, isloggedIn, setisloggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    var logout = () => {
        setuserdata(null);
        setisloggedIn(false);
        sessionStorage.clear();
        navigate("/login");
    }
    return (
        <>
            <div className="agileits_header">
                <div className="container">
                    <div className="w3l_offers">
                        <p>Welcome &nbsp;
                            {
                                isloggedIn ? userdata.name : "Guest"
                            }
                        </p>
                    </div>
                    <div className="agile-login">
                        <ul>
                            {
                                isloggedIn ?
                                    <li><button name="lgbtn" className="btn btn-primary" onClick={logout}>Logout</button></li> : null
                            }
                        </ul>
                    </div>
                    <div className="product_list_header">

                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="logo_products">
                <div className="container">
                    <div className="w3ls_logo_products_left1">
                        <ul className="phone_email">
                            <li></li>

                        </ul>
                    </div>
                    <div className="w3ls_logo_products_left">
                        <h1><Link to="/dashboard">Inventory Management</Link></h1>
                    </div>
                    <div className="w3l_search">

                    </div>

                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="navigation-agileits">
                <div className="container">
                    <nav className="navbar navbar-default">

                        <div className="navbar-header nav_2">
                            <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul className="nav navbar-nav">
                                <li className="active"><Link to="/dashboard">Home</Link></li>
                                <li className="active"><Link to="/sale">Sale</Link></li>
                                <li className="active"><Link to="/purchase">Purchase</Link></li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Manage<b class="caret"></b></a>
                                    <ul class="dropdown-menu multi-column columns-3">
                                        <div class="row">
                                            <div class="multi-gd-img">
                                                <ul class="multi-column-dropdown">
                                                    <h6>Manage All</h6>
                                                    <li><Link to="/managecategory">Category</Link></li>
                                                    <li><Link to="/managesupplier">Supplier</Link></li>
                                                    <li><Link to="/managecustomer">Customer</Link></li>
                                                    <li><Link to="/manageproduct">Product</Link></li>
                                                    <li><Link to="/createuser">Create User</Link></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </ul>
                                </li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Report<b class="caret"></b></a>
                                    <ul class="dropdown-menu multi-column columns-3">
                                        <div class="row">
                                            <div class="multi-gd-img">
                                                <ul class="multi-column-dropdown">
                                                    <li><Link to="/purchasereport">Purchase</Link></li>
                                                    <li><Link to="/salesreport">Sale</Link></li>
                                                    <li><Link to="/stockavailability">Stock</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}
export default HeaderNav2;