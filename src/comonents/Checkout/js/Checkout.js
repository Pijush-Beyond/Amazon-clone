import React, { Component } from 'react';
import { ClassStateContext } from '../../API/StateProvider';
import '../css/Checkout.css';
import CheckoutProductList from './CheckoutProductList';
import Subtotal from './Subtotal';
import YourItems from './YourItems';

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.functiontocall = () => {
            this.changePosition();
        }
        this.state = {
            resize: false,
            showsubtotal: true,
        }
        this.yourItemRef = React.createRef();
    }
    static contextType = ClassStateContext;
    changePosition = () => {
        if (window.innerWidth < 550) this.setState({
            ...this.state,
            resize: true,
            showsubtotal: this.context.totalcount>=0?true:false,
        });
        else this.setState({
            ...this.state,
            resize: false,
            showsubtotal: this.context.totalcount>=0?true:false,
        });
    }
    componentWillUnmount() {
        delete this.context.allfuntion.Checkout;
        window.removeEventListener('resize',this.changePosition);
    }
    componentDidMount() {
        this.changePosition();
        this.context.allfuntion.Checkout = this;
        window.addEventListener('resize', this.changePosition);
    }
    activeYourItemOption = (event) => {
        for(let i of event.target.parentElement.children) i.classList.remove("your_ItemActiveOption");
        event.target.classList.add("your_ItemActiveOption");
        this.yourItemRef.current.changeView(Array.prototype.indexOf.call(event.target.parentElement.children, event.target) + 1);
    }
    render() {
        return (
            <div className="checkout">
                <div className="checkout_left">
                    < img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungBAU/A51/PD/D17925016_IN_WLME_SamsungGalaxy_A51_A71_PD_A51--A71_tallhero_1500x600_1._CB404294340_.jpg"
                        alt="Checkout Image" className="checkout_img" />
                    {
                        this.state.resize?
                            (<div className="checkout_right">
                                {this.context.totalcount>0?<Subtotal />:null}
                            </div>):''
                    }
                    <h2>Your Shopping Cart</h2>
                    <div className="checkout_cartList">
                        <CheckoutProductList />
                    </div>
                    <div className="checkout_yourItem checkout_left">
                        <h2>Your Items</h2>
                        {/* <hr className="checkout_productSeperator"/> */}
                        <div className="checkout_yourItemOptions">
                            <div className="checkout_yourItemOption your_ItemActiveOption" onClick={this.activeYourItemOption}>Saved for later ({this.context.saveForLaterList.list.length} items)</div>
                            {/* <div className="checkout_yourItemOption" onClick={this.activeYourItemOption}>Saved for later</div> */}
                        </div>
                        <hr className="checkout_productSeperator your_itemSeperator"/>
                        <YourItems ref={this.yourItemRef}/>
                    </div>
                </div>
                {
                    !this.state.resize?
                    (<div className="checkout_right">
                        {this.context.totalcount>0?<Subtotal />:null}
                    </div>):''
                }
            </div>
        )
    }
}
