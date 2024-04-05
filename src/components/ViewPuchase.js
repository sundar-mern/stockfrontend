import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
var ViewPuchase = () => {
    const [purchasedata, setpurchasedata] = useState([]);
    const [bdate1,setbdate1] = useState();
    const [bdate2,setbdate2] = useState();
    var fetchpurchases = async () => {
        try {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchpurchases?startdate=${bdate1}&enddate=${bdate2}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No purchases found");
                    setpurchasedata([]);
                }
                else if (result.statuscode === 1) 
                {
                    setpurchasedata(result.data)
                }
            }
        }
        catch (e) {
            toast.error("Error Occured");
        }
    }
    var delpurchase = async (id) => {
        var uchoice = window.confirm("Are you sure to delete?");
        if (uchoice === true) 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/deletepurchase/${id}`,
            {
                method: "delete"
            })
            if (resp.ok)
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    toast.success("Purchase bill deleted successfully");
                    fetchpurchases();
                }
                else if (result.statuscode === 0) 
                {
                    toast.info("Purchase not deleted");

                }
            }
            else {
                toast.error("Error Occured");
            }
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Purchase Report</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    
                            <div>
                            <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                                <h2>Purchase Report</h2><br />
                                Choose Start Date
                                <input type="date" name="bdate1" value={bdate1} onChange={(e)=>setbdate1(e.target.value)} placeholder="Bill Date" required=" " className="form-control"/><br/>

                                Choose End Date
                                <input type="date" name="bdate2" value={bdate2} onChange={(e)=>setbdate2(e.target.value)} placeholder="Bill Date" required=" " className="form-control"/><br/>
                                <button name="btn" onClick={fetchpurchases} className="btn btn-primary">View</button>
                            </div><br/><br/>
                                {
                                purchasedata.length>0?
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Purchase ID</th>
                                            <th>Date</th>
                                            <th>Supplier</th>
                                            <th>Amount</th>
                                            <th>Delete</th>
                                        </tr>
                                        {
                                            purchasedata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><Link to={`/purchitemdetails?purchid=${data._id}`}>{data._id}</Link></td>
                                                    <td>{data.PurchaseDate}</td>
                                                    <td>{data.SuppID.suppname}</td>
                                                    <td>{data.BillAmount}</td>
                                                    <td><button className="btn btn-danger" onClick={() => delpurchase(data._id)}>Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>: null
                                }
                            </div> 

                </div>
            </div>
        </>)
}
export default ViewPuchase;