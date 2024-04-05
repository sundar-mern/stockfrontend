import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
var CreateUser = () => {
    const [pname, setpname] = useState();
    const [phone, setphone] = useState();
    const [uname, setuname] = useState();
    const [pass, setpass] = useState();
    const [cpass, setcpass] = useState();
    var onsignup = async (e) => {
        try {
            e.preventDefault();
            if (cpass === pass) {
                var data = { pname, phone, uname, pass,utype:"normal"}
               var resp = await fetch(`${process.env.REACT_APP_APIURL}/createuser`,
                    {
                        method: "post",
                        body: JSON.stringify(data),
                        headers: { 'Content-type': 'application/json' }
                    })
                if (resp.ok) {
                    var result = await resp.json();
                    if (result.statuscode === 1) {
                        toast.success("User Created Successfully")
                    }
                    else 
                    {
                            toast.error("Error Occured while creating user");
                    }

                }
                else 
                {
                    toast.error("Error Occured");
                }
            }
            else {
                toast.warning("Password and confirm password doesn't match");
            }
        }
        catch(e)
        {
            toast.error(e);
        }
    }
    return (
        <>

            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/dashboard"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Create User</li>
                    </ol>
                </div>
            </div>
            <div className="register">
                <div className="container">
                    <h2>Create User</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={onsignup} >
                            <input type="text" name="pname" onChange={(e) => setpname(e.target.value)} placeholder="Name..." required=" " />
                            <input type="text" name="phone" onChange={(e) => setphone(e.target.value)} placeholder="Phone..." required=" " />

                            <h6>Login information</h6>
                            <input type="text" name="email" onChange={(e) => setuname(e.target.value)} placeholder="Username" required=" " />
                            <input type="password" name="pass" onChange={(e) => setpass(e.target.value)} placeholder="Password" required=" " />
                            <input type="password" name="cpass" onChange={(e) => setcpass(e.target.value)} placeholder="Password Confirmation" required=" " />

                            <input type="submit" value="Create" /><br /><br />
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
export default CreateUser;