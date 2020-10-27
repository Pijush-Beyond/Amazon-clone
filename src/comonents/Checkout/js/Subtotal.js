import React, { Component } from 'react';
import '../css/Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { ClassStateContext } from '../../API/StateProvider';


export default class Subtotal extends Component {
    constructor(props) {
        super(props);
        this.functiontocall = () => {
            this.updateprice();
        }
        this.state = {
            itemcount: 0,
            totalprice: 0,
        }
    }
    static contextType = ClassStateContext;
    updateprice() {
        this.setState({
            ...this.state,
            itemcount: this.context.totalcount,
            totalprice: this.context.totalcartvalue,
        });
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            itemcount: this.context.totalcount,
            totalprice: this.context.totalcartvalue,
        });
        this.context.allfuntion.Subtotal = this;
    }
    componentWillUnmount() {
        delete this.context.allfuntion.Subtotal;
    }
    render() {
        return (
            <div className="subtotal">
                <CurrencyFormat 
                    renderText={(value) => (
                        <>
                            <p>Subtotal ({this.state.itemcount} items): {/*<small>$</small>*/}<strong><big style={{'whiteSpace':'nowrap'}}>{value}</big></strong></p>
                            <small className="subtotal_gift">
                                <input type="checkbox" name="contain_gift" id="gift"/>
                                <label htmlFor="gift" className="subtotal_giftLabel">This order contains a gift</label>
                            </small>
                            <button className="subtotal_button">Proceed to checkout</button>
                        </>
                    )}
                    decimalScale={2}
                    value = {this.state.totalprice}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '}
                />
            </div>
        )
    }
}
