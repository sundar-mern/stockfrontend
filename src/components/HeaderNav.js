import { Link } from "react-router-dom"

var HeaderNav = ()=>
{
    return(
        <>
             <div className="agileits_header">
		<div className="container">
			<div className="w3l_offers">
				
			</div>
			<div className="agile-login">
				<ul>
					<li></li>				
				</ul>
			</div>
			<div className="product_list_header">  
					 
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="logo_products">
		<div className="container">
		<div className="w3ls_logo_products_left1">
				<ul className="phone_email">
					<li></li>
					
				</ul>
			</div>
			<div className="w3ls_logo_products_left">
				<h1><Link to="/">Inventory Management</Link></h1>
			</div>
		<div className="w3l_search">
			
		</div>
			
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="navigation-agileits">
		<div className="container">
			<nav className="navbar navbar-default">
							
							<div className="navbar-header nav_2">
								<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
							</div> 
							<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
								<ul className="nav navbar-nav">
									<li className="active"><Link to="/">Home</Link></li>
									<li className="active"><Link to="/login">Login</Link></li>
							
									
								</ul>
							</div>
							</nav>
			</div>
		</div>
	  
        </>
    )
}
export default HeaderNav;