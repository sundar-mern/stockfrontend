import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var ManageSupplier=()=>
{
	const [suppname,setsuppname] = useState();
    const [phone,setphone] = useState();
    const [address,setaddress] = useState();
	const [allsupp,setallsupp] = useState([]);
	const [editmode,seteditmode] = useState(false);
	const [suppid,setsuppid] = useState();

	var btnclick=async()=>
	{
		if(editmode===false)
		{
			try{
				var apidata = {suppname,phone,address}
				var resp = await fetch(`${process.env.REACT_APP_APIURL}/savesupplier`,
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
						toast.success("Supplier added successfully");
						setsuppname("");
						setphone("");
						setaddress("");
						fetchsuppliers();
					}
					else
					{
						toast.error("Supplier not added");
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
				apidata = {suppname,suppid,address,phone }
				resp = await fetch(`${process.env.REACT_APP_APIURL}/updatesupp`,
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
						toast.success("Supplier Updated successfully");
						fetchsuppliers();
						oncancel();
					}
					else
					{
						toast.error("Supplier not updated");
					}
				}

			}
			catch(e)
			{
				toast.error("Error Occured");
			}
		}
        
	}
	var fetchsuppliers=async ()=>
    {
        try
        {
           var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchallsupp`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                   setallsupp(result.data);
                }
                else if(result.statuscode===0)
                {
                   toast.error("No Suppliers available");
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
		fetchsuppliers();
	},[])

	var delsupp=async(id)=>
	{
		var uchoice = window.confirm("Are you sure to delete? It will also delete all the purchases made from this supplier");
        if (uchoice === true) 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/delsupp/${id}`,
            {
                method: "delete"
            })
            if (resp.ok)
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    toast.success("Supplier Deleted Successfully");
                    fetchsuppliers();
                }
                else if (result.statuscode === 0) 
                {
                    toast.info("Suppplier not deleted");

                }
            }
            else 
			{
                toast.error("Error Occured");
            }
        }
	}

	var onupdate=(data)=>
	{
		seteditmode(true);
		setsuppname(data.suppname)
		setphone(data.phone)
		setaddress(data.address)
		setsuppid(data._id);
	}
	var oncancel=()=>
	{
		seteditmode(false);
		setsuppname("");
        setphone("");
        setaddress("");
	}

    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Manage Supplier</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Supplier</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				

	<input type="text" name="suppname" value={suppname} onChange={(e)=>setsuppname(e.target.value)} placeholder="Name" required=" " />
	<input type="text" name="phone" value={phone} onChange={(e)=>setphone(e.target.value)} placeholder="Phone" required=" " />
	<input type="text" name="address" value={address} onChange={(e)=>setaddress(e.target.value)} placeholder="Address" required=" " />
				<input type="submit" name="btn" value={editmode?"Update":"Add"} onClick={btnclick}/>
				{editmode?<input type="submit" name="btn" value="Cancel" onClick={oncancel}/>:null}
			
			</div><br/>
			{
			allsupp.length>0?
			<div>
				<h2>Added Supppliers</h2><br/>
				<table className="timetable_sub">
					<tbody>
						<tr>
							<th>Name</th>
							<th>Phone</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
						{
							allsupp.map((data,i)=>
							<tr key={i}>
								<td>{data.suppname}</td>
								<td>{data.phone}</td>
							    <td><button className="btn btn-primary" onClick={()=>onupdate(data)}>Update</button></td>
								<td><button className="btn btn-danger" onClick={()=>delsupp(data._id)}>Delete</button></td>
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
export default ManageSupplier;