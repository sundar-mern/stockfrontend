import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var PurchItemDetails = () => {
    const [purchasedata, setpurchasedata] = useState([]);
    const [params] = useSearchParams();
    const puid=params.get("purchid");
    useEffect(()=>
    {   
        fetchpurchitems();
    },[])

    var fetchpurchitems = async () => {
        try 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchpurchaseitems?purchid=${puid}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No details found");
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
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Purchase Items Details</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                            <div>
                                {
                                purchasedata.length>0?
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Picture</th>
                                            <th>Item Name</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Total Cost</th>
                                        </tr>
                                        {
                                            purchasedata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><img src={`uploads/${data.pic}`} height='75'/></td>
                                                    <td>{data.pname}</td>
                                                    <td>{data.rate}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.tc}</td>

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
export default PurchItemDetails;