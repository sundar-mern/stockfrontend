import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var Purchase=()=>
{
	const [catid,setcatid] = useState("");
	const [suppid,setsuppid] = useState("");
	const [prodid,setprodid] = useState("");
    const [rate,setrate] = useState();
    const [qty,setqty] = useState();
    const [allcat,setallcat] = useState([]);
    const [allsupp,setallsupp] = useState([]);
    const [prodslist,setprodslist] = useState([]);
    const [itemstobuy,setitemstobuy] = useState([]);
    const [selcprod,setselcprod] = useState({});
    const [billamt,setbillamt] = useState();
    const [purchid,setpurchid] = useState();
    const [bdate,setbdate] = useState();
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

	var onadd=async()=>
	{
        var tc = parseInt(rate)*parseInt(qty);
        var prodinfo = {PurchID:purchid,pid:selcprod._id,pname:selcprod.ProdName,rate,qty,tc,pic:selcprod.Picture}
        setitemstobuy([...itemstobuy, prodinfo]);
	}

    useEffect(()=>
    {
        fetchcategories();
        fetchsuppliers();
    },[])

    useEffect(()=>
    {
        if(catid!=="")
        {
            fetchproductsbycat();
        }
        setprodslist([])
        setrate("");
        setqty("")
    },[catid])

    useEffect(()=>
    {
        fetchpurchid();
    },[])

    useEffect(()=>
    {
        fetchrate();
    },[prodid,prodslist])

    useEffect(()=>
    {
        var totcost=0;
        for(var x=0;x<itemstobuy.length;x++)
        {
            totcost = totcost + itemstobuy[x].tc;//2400+707.52
        }
        setbillamt(totcost);
    },[itemstobuy])

    var fetchrate=()=>
    {
        if (prodid) 
        {
            const selectedProduct = prodslist.find(product => product._id === prodid);
            if (selectedProduct) 
            {
                setrate(selectedProduct.PurchaseRate)
                setselcprod(selectedProduct);
                setqty("")
            }
        }
        else
        {
            setrate("")
            setselcprod({});
            setqty("")
        }
    }
    var fetchpurchid=async()=>
    {
        try
        {
           var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchPurchaseId`);

            if(resp.ok)
            {
                var result = await resp.json();
                   setpurchid(result.purchaseId);               
            }
		}
		catch(e)
		{
			toast.error("Error Occured");
		}
    }

    var fetchproductsbycat=async()=>
    {
        try
        {
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchproductsbycat/${catid}`);

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

    var ondel=async(index)=>
    {
        var uchoice = window.confirm("Are you sure to delete?");
        if (uchoice === true) 
        {
            const updatedItems = [...itemstobuy];
            updatedItems.splice(index, 1);
            setitemstobuy(updatedItems);  
        }
    }

    var savebill=async()=>
    {
        try{
            var apidata = {purchid,suppid,billamt,bdate}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/savepurchase`,
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
                    var apidata2 = {itemstobuy}
                    resp = await fetch(`${process.env.REACT_APP_APIURL}/savepurchitems`,
                    {
                        method: "post",
                        body: JSON.stringify(apidata2),
                        headers: { 'Content-type': 'application/json' }
                    })
                    if(resp.ok)
                    {
                        result = await resp.json();
                        if(result.statuscode===1)
                        {
                            toast.success("Purchase Bill saved successfully");
                            fetchpurchid();
                            setitemstobuy([]);
                            setsuppid("");
                            setcatid("");
                            setprodid("");
                            setprodslist([]);
                            setrate("")
                            setqty("")

                        }
                        else
                        {
                            toast.error("Bill not saved");
                        }
                    }
                    else
                    {
                        toast.error("Bill not saved");
                    }
                }
                else
                {
                    toast.error("Bill not saved");
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
				<li className="active">Purchase</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Purchase</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                Purchase ID:- {purchid}<br/><br/>
                <input type="date" name="bdate" value={bdate} onChange={(e)=>setbdate(e.target.value)} placeholder="Bill Date" required=" " className="form-control"/><br/>

                <select value={suppid} name="supp" className="form-control" onChange={(e)=>setsuppid(e.target.value)}>
                    <option value="">Choose Supplier</option>
                    {
                        allsupp.map((supp,i)=>
                            <option value={supp._id} key={i}>{supp.suppname}</option>
                        )
                    }
                </select><br/>
                <select value={catid} name="cat" className="form-control" onChange={(e)=>setcatid(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        allcat.map((cat,i)=>
                            <option value={cat._id} key={i}>{cat.catname}</option>
                        )
                    }
                </select><br/>

                <select value={prodid} name="prod" className="form-control" onChange={(e)=>setprodid(e.target.value)}>
                    <option value="">Choose Product</option>
                    {
                        prodslist.map((prod,i)=>
                            <option value={prod._id} key={i}>{prod.ProdName}</option>
                        )
                    }
                </select><br/>

				<input type="text" name="rate" value={rate} onChange={(e)=>setrate(e.target.value)} placeholder="Rate" required=" " /><br/>

				<input type="text" name="qty" value={qty} onChange={(e)=>setqty(e.target.value)} placeholder="Quantity bought" required=" " /><br/>

				<input type="submit" name="btn" value="Add" onClick={onadd}/>
			
			</div>
            {
			itemstobuy.length>0?
			<div>
				<h3>Added Items in Bill</h3><br/>
				<table className="timetable_sub">
					<tbody>
						<tr>
							<th>Picture</th>
							<th>Product Name</th>
							<th>Rate</th>
							<th>Quantity</th>
							<th>Total Cost</th>
							<th>Delete</th>
						</tr>
						{
							itemstobuy.map((data,i)=>
							<tr key={i}>
								<td><img height='75' alt="Product" src={`uploads/${data.pic}`}/></td>
								<td>{data.pname}</td>
								<td>{data.rate}</td>
								<td>{data.qty}</td>
								<td>{data.tc}</td>
								<td><button className="btn btn-danger" onClick={()=>ondel(i)}>Delete</button></td>
							</tr>
							)
						}
						
					</tbody>
				</table>
                Total Bill Amount is Rs.{billamt}/-<br/><br/>
                <button name="savebtn" className="btn btn-primary" onClick={savebill}>Save Bill</button>
			</div>:null
			}
		</div>
	</div> 
    </>)
}
export default Purchase;