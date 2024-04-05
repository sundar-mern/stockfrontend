import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
var AvailStock=()=>
{
	const [cat,setcat] = useState("");

    const [allcat,setallcat] = useState([]);
    const [prodslist,setprodslist] = useState([]);

    var fetchcategories=async ()=>
    {
        try
        {
           var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchallcat`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setallcat(result.catdata);
                }
                else if(result.statuscode===0)
                {
                   toast.error("No Categories available");
                }
                else
                {
                    toast.error("Error Occured");
                }
                
            }
		}
		catch(e)
		{
			toast.error("Error Occured");
		}
    }


    useEffect(()=>
    {
        fetchcategories();
    },[])

    useEffect(()=>
    {
        if(cat!=="")
        {
            fetchproductsbycat();
        }
        else
        {
            setprodslist([]);
        }
    },[cat])



    var fetchproductsbycat=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductsbycat/${cat}`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    setprodslist([]);
                   setprodslist(result.prodsdata);
                }
                else if(result.statuscode===0)
                {
                   toast.error("No Products available");
                   setprodslist([])
                }
                else
                {
                    toast.error("Error Occured");
                }
                
            }
		}
		catch(e)
		{
			toast.error("Error Occured");
		}
    }
    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Stock Availability</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Stock Availability</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				
                <select name="cat" className="form-control" onChange={(e)=>setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                </select><br/>
			
			</div><br/>
            {
			prodslist.length>0?
			<div>
				<h2>Products</h2><br/>
				<table className="timetable_sub">
					<tbody>
						<tr>
							<th>Picture</th>
							<th>Product Name</th>
							<th>Purchase Rate</th>
							<th>Selling Rate</th>
							<th>Stock</th>
						</tr>
						{
							prodslist.map((data,i)=>
							<tr key={i}>
								<td><img height='75' alt="Product" src={`uploads/${data.Picture}`}/></td>
								<td>{data.ProdName}</td>
								<td>{data.PurchaseRate}</td>
								<td>{data.SellingRate}</td>
								<td>{data.Stock}</td>
							</tr>
							)
						}
						
					</tbody>
				</table>
			</div>:null
			}
		</div>
	</div> 
    </>)
}
export default AvailStock;