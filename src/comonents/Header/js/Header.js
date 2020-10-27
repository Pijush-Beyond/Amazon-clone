import React,{Component} from 'react';

import '../css/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import Menu from './Menu';
class Header extends Component {
    showMenuWindow = (event) => {
        document.getElementById("menu_window").style.left = "0px";
        document.body.style.overflow='hidden';
    }
    render() {
        return (
            <>
                <div className="header">
                    <MenuIcon className="main_menu" style={{ fontSize: "38px" }} onClick={this.showMenuWindow} />
                    <Link to='/'>
                        <img src={require('../static/amazon_logo.png')} alt="amazon logo" className="header_amazon_logo" />
                    </Link>
                    <div className="header_search">
                        <input type="text" className="header_searchInput" />
                        <SearchIcon className="header_searchIcon" />
                    </div>
                    <div className="header_nav">
                        <Link Link to = "/login" className = "header_option withoutDecoration" >
                            <div className="header_optionChild">
                                <div className="hearder_optionLineOne">Hello, Guest</div>
                                <div className="header_optionLineTwo">Sign In</div>
                            </div>
                        </Link>
                        <div className="header_option">
                            <div className="header_optionChild">
                                <div className="hearder_optionLineOne">Returns</div>
                                <div className="header_optionLineTwo">& Orders</div>
                            </div>
                        </div>
                        <div className="header_option">
                            <div className="header_optionChild">
                                <div className="hearder_optionLineOne">Your</div>
                                <div className="header_optionLineTwo">Prime</div>
                            </div>
                        </div>
                        <Link Link to = '/checkout' className = "unreload_link withoutDecoration" >
                            <Cart />
                        </Link>
                    </div>
                </div>
                <Menu />
            </>
        )
    }
}

export default Header
