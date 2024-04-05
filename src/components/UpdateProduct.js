import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
var UpdateProduct=()=>
{
	const [cat,setcat] = useState("");
	const [pname,setpname] = useState();
    const [prate,setprate] = useState();
    const [srate,setsrate] = useState();
	const [stock,setstock] = useState();
	const [pic,setpic] = useState(null);
	const [picname,setpicname] = useState(null);
    const [allcat,setallcat] = useState([]);
    const [params] = useSearchParams();
    const pid = params.get("prodid");


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
        fetchproddetails();
    },[])

    var fetchproddetails=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductbyprodid?prodid=${pid}`);

            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                {
                    setcat(result.proddata.CatID);
                    setpname(result.proddata.ProdName);
                    setprate(result.proddata.PurchaseRate);
                    setsrate(result.proddata.SellingRate);
                    setstock(result.proddata.Stock);
                    setpicname(result.proddata.Picture);                
                }
                else if(result.statuscode===0)
                {
                   toast.error("No details of product available");
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

	var onupdate=async()=>
	{
        const formData = new FormData();
        formData.append("catid",cat);
        formData.append("prodname",pname);
        formData.append("prate",prate);
        formData.append("srate",srate);
        formData.append("stock",stock);
        formData.append("oldpicname",picname);
        formData.append("pid",pid);
        if(pic!==null)
        {
            formData.append('prodpic', pic);
        }
		try
        {
			var resp = await fetch(`${process.env.REACT_APP_APIURL}/updateproduct`,
			{
				method:"put",
				body:formData
			})
			if(resp.ok)
			{
				var result = await resp.json();
				if(result.statuscode===1)
				{
					toast.success("Product updated successfully");
				}
				else if(result.statuscode===0)
				{
					toast.error("Product not updated");
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


    return(
    <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Update Product</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Update Product</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				
                <select name="cat" value={cat} className="form-control" onChange={(e)=>setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                </select><br/>

                 <input type="text" value={pname} name="pname" onChange={(e)=>setpname(e.target.value)} placeholder="Product Name" required=" " /><br/>

				<input type="text" name="prate" value={prate} onChange={(e)=>setprate(e.target.value)} placeholder="Purchase Rate" required=" " /><br/>

				<input type="text" name="srate" value={srate} onChange={(e)=>setsrate(e.target.value)} placeholder="Selling Rate" required=" " /><br/>

				<input type="text" name="stock" value={stock} onChange={(e)=>setstock(e.target.value)} placeholder="Stock" required=" " /><br/>
                
                <img src={`uploads/${picname}`} height='75'/><br/><br/>

                <input type="file" name="ppic" onChange={(e)=>setpic(e.target.files[0])} />

				<input type="submit" name="btn" value="Update" onClick={onupdate}/>
			
			</div>
		</div>
	</div> 
    </>)
}
export default UpdateProduct;