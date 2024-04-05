import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
var ManageProduct=()=>
{
	const [cat,setcat] = useState("");
	const [pname,setpname] = useState();
    const [prate,setprate] = useState();
    const [srate,setsrate] = useState();
	const [stock,setstock] = useState();
	const [pic,setpic] = useState(null);
    const [allcat,setallcat] = useState([]);
    const [prodslist,setprodslist] = useState([]);
    const navigate = useNavigate();

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

	var onadd=async()=>
	{
        const formData = new FormData();
        formData.append("catid",cat);
        formData.append("prodname",pname);
        formData.append("prate",prate);
        formData.append("srate",srate);
        formData.append("stock",stock);
        if(pic!==null)
        {
            formData.append('prodpic', pic);
        }

		try
        {
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/saveproduct`,
			{
				method:"post",
				body:formData
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===1)
				{
					toast.success("Product added successfully");
                    fetchproductsbycat();
				}
				else if(result.statuscode===0)
				{
					toast.error("Product not added");
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
        fetchproductsbycat();
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
    var onupdate=(pid)=>
    {
        navigate({
            pathname: '/updateproduct',
            search: `?prodid=${pid}`,
        });
    }
    var ondel=async(id)=>
    {
        var uchoice = window.confirm("Are you sure to delete?");
        if (uchoice === true) 
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/delproduct/${id}`,
            {
                method: "delete"
            })
            if (resp.ok)
            {
                var result = await resp.json();
                if (result.statuscode === 1) 
                {
                    toast.success("Product Deleted Successfully");
                    fetchproductsbycat();
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
    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Manage Product</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Product</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				
                <select name="cat" className="form-control" onChange={(e)=>setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                </select><br/>

                 <input type="text" name="pname" onChange={(e)=>setpname(e.target.value)} placeholder="Product Name" required=" " /><br/>

				<input type="text" name="prate" onChange={(e)=>setprate(e.target.value)} placeholder="Purchase Rate" required=" " /><br/>

				<input type="text" name="srate" onChange={(e)=>setsrate(e.target.value)} placeholder="Selling Rate" required=" " /><br/>

				<input type="text" name="stock" onChange={(e)=>setstock(e.target.value)} placeholder="Stock" required=" " /><br/>

                <input type="file" name="ppic" onChange={(e)=>setpic(e.target.files[0])} />

				<input type="submit" name="btn" value="Add" onClick={onadd}/>
			
			</div>
            {
			prodslist.length>0?
			<div>
				<h2>Added Products</h2><br/>
				<table className="timetable_sub">
					<tbody>
						<tr>
							<th>Picture</th>
							<th>Product Name</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
						{
							prodslist.map((data,i)=>
							<tr key={i}>
								<td><img height='75' alt="Product" src={`https://stockbackend-kne2.onrender.com/uploads/${data.Picture}`}/></td>
								<td>{data.ProdName}</td>
						<td><button className="btn btn-primary" onClick={()=>onupdate(data._id)}>Update</button></td>
								<td><button className="btn btn-danger" onClick={()=>ondel(data._id)}>Delete</button></td>
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
export default ManageProduct;