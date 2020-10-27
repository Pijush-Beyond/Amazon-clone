import React, { Component } from 'react'
import CheckoutProduct from './CheckoutProduct';
import { ClassStateContext } from '../../API/StateProvider';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';


export default class CheckoutProductList extends Component {
    constructor(props) {
        super(props);
        this.functiontocall = () => {
            this.updatelist();
            this.updateCheckOutProducts.map(product => product.updateProduct());
        }
        this.state = {
            items: [],
            itemcounts: {},
            totalcount: 0,
            totalprice: 0,
        }
        this.updateCheckOutProducts = [];
    }
    static contextType = ClassStateContext;
    updatelist() {
        this.setState({
            ...this.state,
            items: this.context.cartIndex,
            totalcount: this.context.totalcount,
            totalprice: this.context.totalcartvalue,
        });
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            items: this.context.cartIndex,
            totalcount: this.context.totalcount,
            totalprice: this.context.totalcartvalue,
        });
        this.context.allfuntion.CheckoutProductList = this;
    }
    componentWillUnmount(){
        delete this.context.allfuntion.CheckoutProductList;
    }
    emptyCart = () => (
        <div key="empty_cart" style={{'width':'95%','paddingBottom':'10px ','fontSize':'13px'}} >
            <p>Your Cart is Empty</p>
            <Link to="/">Continue Shoping</Link>
        </div>
    )
    render() {
        let price= (
            <div className="checkout_product" key="price_head">
                <div className="checkout_productList"></div>
                <div className="checkout_productPrice"><small>Price</small></div>
            </div>
        )
        let subtotal = <CurrencyFormat
            renderText={
                (value) => (
                    <div className="checkout_product" key="price_head" style={{ 'whiteSpace': 'nowrap','paddingBottom':'10px' }}>
                        <div className="checkout_productList"></div>
                        <div className="checkout_productPrice">Subtotal ({this.state.totalcount} items): <big><strong>{value}</strong></big></div>
                    </div>
                )
            }
            decimalScale={2}
            value={this.state.totalprice}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
            key="cart_listSubtotal"
        />
        return [
            this.state.totalcount>0? price:null,
            <hr className="checkout_productSeperator" key="first_sectionBreakLine" />,
            this.state.totalcount > 0 ?
                this.state.items.map((item,index )=> (<CheckoutProduct key={item} index={index} item={item}  updateFuntion={this.updateCheckOutProducts}/>)): this.emptyCart(),
            this.state.totalcount > 0 ?  subtotal : null
        ];
    }
}
