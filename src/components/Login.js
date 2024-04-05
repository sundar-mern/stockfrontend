import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

var Login = () => {
    const [uname,setuname] = useState();
	const [pass,setpass] = useState();
	const navigate = useNavigate();
    const {  setuserdata,setisloggedIn} = useContext(UserContext);
	var onlogin=async(e)=>
	{
		e.preventDefault();
			try
			{
				var logindata = {uname,pass};
				var resp = await fetch(`${process.env.REACT_APP_APIURL}/login`,
				{
					method:"post",
					body:JSON.stringify(logindata),
					headers: {'Content-type': 'application/json'}
				})
				if(resp.ok)
				{
					var result = await resp.json();
					if(result.statuscode===0)
					{
						toast.error("Incorrect Username/Password");
					}
					else if(result.statuscode===1)
					{
                        setuserdata(result.udata);
                        setisloggedIn(true);
                        sessionStorage.setItem("udata",JSON.stringify(result.udata));
						navigate("/dashboard");
					}
				}
			}
			catch(e)
			{
				toast.error("Error Occured");
			}
		
	}
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><a href="index.html"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</a></li>
                        <li className="active">Login Page</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Login Form</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onlogin}>
                            <input type="text" name="un" placeholder="Username" required=" " onChange={(e)=>setuname(e.target.value)}/>
                            <input type="password" name="pass" placeholder="Password" required=" " onChange={(e)=>setpass(e.target.value)} />
                           
                            <input type="submit" name="btn" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;