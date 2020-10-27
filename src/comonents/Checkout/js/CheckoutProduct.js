import React, { Component } from 'react'
// import StarIcon from '@material-ui/icons/Star';
import '../css/CheckoutProduct.css';
import { ClassStateContext } from '../../API/StateProvider';
import { Link } from 'react-router-dom';

export default class CheckoutProduct extends Component {
    constructor(props) {
        super(props)

        this.updateProduct = () => {
            let index = this.context.cartIndex.indexOf(this.state.item_id);
            this.setState({
                ...this.state,
                item: this.context.cart[index],
                ...this.context.cart[index],
                quantity: this.context.itemcounts[this.state.item_id],
            });
        }
        this.state = {
            item_id:this.props.item,
        };
    }
    static contextType = ClassStateContext;
    changeQuantity=(event)=> {
        if (!this.context.addItem(this.state.item, event.target.value))
            event.target.value = this.state.quantity;
    }
    componentDidMount = () => {
        this.setState({
            ...this.state,
            item: this.context.cart[this.props.index],
            ...this.context.cart[this.props.index],
            quantity: this.context.itemcounts[this.props.item],
        });
        this.props.updateFuntion.push(this);
    }
    componentWillUnmount = () => {
        let index = this.props.updateFuntion.indexOf(this);
        if (index >= 0) this.props.updateFuntion.splice(index, 1);
    }
    render() {
        return (
            <>
                <div className="checkout_product">
                    <div className="checkout_productList">
                        <img src={this.state.img} alt={this.state.alt} className="checkout_productImg" />
                        <div className="checkout_productInfo">
                            <h3><Link to='#'>{this.state.info}</Link></h3>
                            <div className="product_gift">
                                <input type="checkbox" name={this.state.id + '_gift'} id={this.state.id + '_gift'} />
                                <label htmlFor={this.state.id + '_gift'}>This will be a gift <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ord_cart_shr?pop-up=1&nodeId=200507630">Learn more</a> </label>
                            </div>
                            <div className="checkout_productAction">
                                <select name={this.state.id+'_quantity'} id="" value={this.state.quantity} className="product_quantity" onChange={this.changeQuantity}>
                                    {
                                        new Array(this.state.maxquantity).fill(0).map((value, id) => <option value={id + 1} key={id+1} >Qyt: {id+1}</option>)
                                    }
                                </select>
                                <button className = "product_action" onClick={()=> this.context.saveForLater(this.state.item)} > Save For Later </button>
                                <button className = "product_action" onClick={()=> this.context.moveToWishList(this.state.item)}> Move To Wish List </button>
                                <button className = "product_action" onClick={()=> this.context.delete(this.state.item)}> Delete </button>
                            </div>
                        </div>
                    </div>
                    <div className="checkout_productPrice">
                        <div style={{ 'whiteSpace': 'nowrap' }}>
                            <small>$ </small>
                            <big><strong>{this.state.price}</strong></big>
                        </div>
                    </div>
                </div>
                <hr className="checkout_productSeperator"/>
            </>
        )
    }
}
