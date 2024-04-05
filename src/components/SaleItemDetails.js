import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var SaleItemDetails = () => {
    const [salesdata, setsalesdata] = useState([]);
    const [params] = useSearchParams();
    const sid=params.get("saleid");
    useEffect(()=>
    {   
        fetchsalesitems();
    },[])

    var fetchsalesitems = async () => {
        try 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchsalesitems?saleid=${sid}`)
            if (resp.ok) 
            {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No details found");
                    setsalesdata([]);
                }
                else if (result.statuscode === 1) 
                {
                    setsalesdata(result.data)
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
                        <li className="active">Sales Items Details</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                            <div>
                                {
                                salesdata.length>0?
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
                                            salesdata.map((data, i) =>
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
export default SaleItemDetails;