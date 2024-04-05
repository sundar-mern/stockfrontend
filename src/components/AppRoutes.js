import { Route, Routes} from "react-router-dom";
import Login from "./Login";
import ManageCategory from "./ManageCategory";
import ManageSupplier from "./ManageSupplier";
import ManageCustomer from "./ManageCustomer";
import ManageProduct from "./ManageProduct";
import Purchase from "./Purchase";
import Sale from "./Sale";
import Home from "./Home";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import ViewPuchase from "./ViewPuchase";
import PurchItemDetails from "./PurchItemDetails";
import ViewSale from "./ViewSale";
import SaleItemDetails from "./SaleItemDetails";
import AvailStock from "./AvailStock";
import UpdateProduct from "./UpdateProduct";

var AppRoutes=()=>
{
    return(
    <Routes>
        <Route path="/" element={<Home/>}/>       
        <Route path="/login" element={<Login/>}/>       
        <Route path="/managecategory" element={<ManageCategory/>}/>       
        <Route path="/managesupplier" element={<ManageSupplier/>}/>       
        <Route path="/managecustomer" element={<ManageCustomer/>}/>       
        <Route path="/manageproduct" element={<ManageProduct/>}/>       
        <Route path="/purchase" element={<Purchase/>}/>       
        <Route path="/sale" element={<Sale/>}/>       
        <Route path="/createuser" element={<CreateUser/>}/>       
        <Route path="/dashboard" element={<Dashboard/>}/>       
        <Route path="/purchasereport" element={<ViewPuchase/>}/>       
        <Route path="/purchitemdetails" element={<PurchItemDetails/>}/>       
        <Route path="/salesreport" element={<ViewSale/>}/>       
        <Route path="/saleitemdetails" element={<SaleItemDetails/>}/>       
        <Route path="/stockavailability" element={<AvailStock/>}/>       
        <Route path="/updateproduct" element={<UpdateProduct/>}/>       
    </Routes>)
}
export default AppRoutes;