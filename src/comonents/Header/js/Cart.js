import React, { Component } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ClassStateContext } from '../../API/StateProvider';



export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.functiontocall = () => {
            this.updateCount();
        }
        this.state = {itemcount:0};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    static contextType = ClassStateContext;
    updateCount() {
        this.setState({
            ...this.state,
            itemcount: this.context.totalcount,
        });
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            itemcount: this.context.totalcount,
        });
        this.context.allfuntion.Cart = this;
    }
    componentWillUnmount() {
        delete this.context.allfuntion.Cart;
    }
    
    render() {
        return (            
            <div className = "header_optionBasket header_option" >
                <div className="header_optionChild" style={{ 'display': 'flex', 'alignItems':'center'}}>
                    <ShoppingCartIcon className="header_basket" style={{'fontSize':'42px'}}/>  
                    <div>
                        <div className="header_basketCount header_optionLineTwo">{this.state.itemcount}</div>
                        <div className="header_optionLineOne">cart</div>
                    </div>
                </div>
            </div>
        )
    }
}
