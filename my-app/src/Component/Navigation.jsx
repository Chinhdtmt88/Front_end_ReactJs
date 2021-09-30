import React,{Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/">All Tour</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/login">Login</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/signup">Signup</NavLink>

            </Nav>
            </Navbar.Collapse>    
            </Navbar>
         );
    }
}
 
export default Navigation;