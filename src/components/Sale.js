import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var Sale=()=>
{
	const [catid,setcatid] = useState("");
	const [custid,setcustid] = useState("");
	const [prodid,setprodid] = useState("");
    const [rate,setrate] = useState();
    const [qty,setqty] = useState();
    const [allcat,setallcat] = useState([]);
    const [allcust,setallcust] = useState([]);
    const [prodslist,setprodslist] = useState([]);
    const [itemstosell,setitemstosell] = useState([]);
    const [selcprod,setselcprod] = useState({});
    const [billamt,setbillamt] = useState();
    const [saleid,setsaleid] = useState();
    const [bdate,setbdate] = useState();
    const [stock,setstock] = useState();
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


    var fetchcusts=async ()=>
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

	var onadd=async()=>
	{
        if(qty<=stock)
        {
            var tc = parseInt(rate)*parseInt(qty);
            var prodinfo = {SaleID:saleid,pid:selcprod._id,pname:selcprod.ProdName,rate,qty,tc,pic:selcprod.Picture}
            var isProductAlreadyAdded = itemstosell.some(item => item.pid === selcprod._id);
            if (!isProductAlreadyAdded) 
            {
                setitemstosell([...itemstosell, prodinfo]);
            } 
            else {
                toast.error("Product is already added in bill. Please remove and then add again")
            }
        }
        else
        {
            toast.error("You cannot sell more than available stock")
        }
	}

    useEffect(()=>
    {
        fetchcategories();
        fetchcusts();
    },[])

    useEffect(()=>
    {
        if(catid!=="")
        {
            fetchproductsbycat();
        }
        setprodslist([])
        setrate("");
        setstock("")
        setqty("")
    },[catid])

    useEffect(()=>
    {
        fetchsaleid();
    },[])

    useEffect(()=>
    {
        fetchrate();
    },[prodid,prodslist])

    useEffect(()=>
    {
        var totcost=0;
        for(var x=0;x<itemstosell.length;x++)
        {
            totcost = totcost + itemstosell[x].tc;//2400+707.52
        }
        setbillamt(totcost);
    },[itemstosell])

    var fetchrate=()=>
    {
        if (prodid) 
        {
            const selectedProduct = prodslist.find(product => product._id === prodid);
            if (selectedProduct) 
            {
                setrate(selectedProduct.SellingRate)
                setstock(selectedProduct.Stock)
                setselcprod(selectedProduct);
                setqty("")
            }
        }
        else
        {
            setrate("")
            setselcprod({});
            setqty("")
            setstock("")
        }
    }
    var fetchsaleid=async()=>
    {
        try
        {
           var resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchSaleId`);

            if(resp.ok)
            {
                var result = await resp.json();
                   setsaleid(result.saleId);               
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
            const updatedItems = [...itemstosell];
            updatedItems.splice(index, 1);
            setitemstosell(updatedItems);  
        }
    }

    var savebill=async()=>
    {
        try{
            var apidata = {saleid,custid,billamt,bdate}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/savesale`,
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
                    var apidata2 = {itemstosell}
                    resp = await fetch(`${process.env.REACT_APP_APIURL}/savesaleitems`,
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
                            toast.success("Sale Bill saved successfully");
                            fetchsaleid();
                            setitemstosell([]);
                            setcustid("");
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
				<li className="active">Sale</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Sale</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                Sale ID:- {saleid}<br/><br/>
                <input type="date" name="bdate" value={bdate} onChange={(e)=>setbdate(e.target.value)} placeholder="Bill Date" required=" " className="form-control"/><br/>

                <select value={custid} name="cust" className="form-control" onChange={(e)=>setcustid(e.target.value)}>
                    <option value="">Choose Customer</option>
                    {
                        allcust.map((cust,i)=>
                            <option value={cust._id} key={i}>{cust.custname}</option>
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

				Stock Available :- {stock}<br/><br/>

				<input type="text" name="qty" value={qty} onChange={(e)=>setqty(e.target.value)} placeholder="Quantity Sold" required=" " /><br/>

				<input type="submit" name="btn" value="Add" onClick={onadd}/>
			
			</div>
            {
			itemstosell.length>0?
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
							itemstosell.map((data,i)=>
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
export default Sale;