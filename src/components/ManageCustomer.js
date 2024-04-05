import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var ManageCustomer=()=>
{
	const [custname,setcustname] = useState();
    const [phone,setphone] = useState();
    const [address,setaddress] = useState();
	const [allcust,setallcust] = useState([]);
	const [editmode,seteditmode] = useState(false);
	const [custid,setcustid] = useState();

	var btnclick=async()=>
	{
		if(editmode===false)
		{
			try{
				var apidata = {custname,phone,address}
				var resp = await fetch(`${process.env.REACT_APP_APIURL}/savecustomer`,
				{
					method: "post",
					body: JSON.stringify(apidata),
					headers: { 'Content-type': 'application/json' }
				})
				if(resp.ok)
				{
					var result = await resp.json();
					if(result.statuscode===1)
					{
						toast.success("Customer added successfully");
                        setcustname("");
                        setphone("");
                        setaddress("");
						fetchcustomers();
					}
					else
					{
						toast.error("Customer not added");
					}
				}

			}
			catch(e)
			{
				toast.error("Error Occured");
			}
		}
		else
		{
			try{
				apidata = {custname,custid,address,phone }
				resp = await fetch(`${process.env.REACT_APP_APIURL}/updatecust`,
				{
					method: "put",
					body: JSON.stringify(apidata),
					headers: { 'Content-type': 'application/json' }
				})
				if(resp.ok)
				{
					result = await resp.json();
					if(result.statuscode===1)
					{
						toast.success("Customer Updated successfully");
						fetchcustomers();
						oncancel();
					}
					else
					{
						toast.error("customer not updated");
					}
				}

			}
			catch(e)
			{
				toast.error("Error Occured");
			}
		}
        
	}
	var fetchcustomers=async ()=>
    {
        try
        {
           var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchallcust`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setallcust(result.data);
                }
                else if(result.statuscode===0)
                {
                   toast.error("No customers available");
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
		fetchcustomers();
	},[])

	var delcust=async(id)=>
	{
		var uchoice = window.confirm("Are you sure to delete? It will also delete all the sales made to this customer");
        if (uchoice === true) 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/delcust/${id}`,
            {
                method: "delete"
            })
            if (resp.ok)
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    toast.success("Customer Deleted Successfully");
                    fetchcustomers();
                }
                else if (result.statuscode === 0) 
                {
                    toast.info("Customer not deleted");

                }
            }
            else {
                toast.error("Error Occured");
            }
        }
	}

	var onupdate=(data)=>
	{
		seteditmode(true);
		setcustname(data.custname)
		setphone(data.phone)
		setaddress(data.address)
		setcustid(data._id);
	}
	var oncancel=()=>
	{
		seteditmode(false);
		setcustname("");
        setphone("");
        setaddress("");
	}

    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Manage Customer</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Customer</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				

	<input type="text" name="custname" value={custname} onChange={(e)=>setcustname(e.target.value)} placeholder="Name" required=" " />
	<input type="text" name="phone" value={phone} onChange={(e)=>setphone(e.target.value)} placeholder="Phone" required=" " />
	<input type="text" name="address" value={address} onChange={(e)=>setaddress(e.target.value)} placeholder="Address" required=" " />
				<input type="submit" name="btn" value={editmode?"Update":"Add"} onClick={btnclick}/>
				{editmode?<input type="submit" name="btn" value="Cancel" onClick={oncancel}/>:null}
			
			</div><br/>
			{
			allcust.length>0?
			<div>
				<h2>Added Customer</h2><br/>
				<table className="timetable_sub">
					<tbody>
						<tr>
							<th>Name</th>
							<th>Phone</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
						{
							allcust.map((data,i)=>
							<tr key={i}>
								<td>{data.custname}</td>
								<td>{data.phone}</td>
							    <td><button className="btn btn-primary" onClick={()=>onupdate(data)}>Update</button></td>
								<td><button className="btn btn-danger" onClick={()=>delcust(data._id)}>Delete</button></td>
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
export default ManageCustomer;