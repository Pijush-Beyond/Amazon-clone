import React, { Component } from 'react';
// import { saveForLaterList } from '../../API/Context';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
// import firebase from '../../../firebase.js';
import { saveForLaterContext } from '../../API/StateProvider';
import { ClassStateContext } from '../../API/StateProvider';

export default class YourItems extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            option: 1,
        }
    }
    changeView = (option) =>this.setState({ ...this.state, option: option });
    render() {
        switch (this.state.option) {
            case 1: return <SaveForLater />;
            // case 2: return <div>this is try</div>;
            default: return null;
        }
    }
}

class SaveForLater extends Component {
    constructor(props) {
        super(props)
        this.functiontocall = () => {
            this.update();
        }
        this.update = () =>  this.setState({ ...this.state,items:this.context.list });
        this.state = {
            items: []
        }
    }
    static contextType = saveForLaterContext;
    componentWillUnmount = () => delete this.context.allfuntion.SFL;
    componentDidMount = () => {
        this.setState({
            ...this.state,
            items:this.context.list
        });
        this.context.allfuntion.SFL = this;
    };
    render() {
        return (
            <>
                {
                    this.state.items.length > 0 ?
                        this.state.items.map(value => <OptionProduct key={value.id} item={value} />) :
                        <div className="empty_savedForLater">No Item Is Saved For Later</div>
                }
            </>
        )
    }
}

class OptionProduct extends Component {
    constructor(props) {
        super(props);
        // console.log('this is in optionproduct',props);
        this.state = {item:this.props.item}
    }
    static contextType = saveForLaterContext;

    render() {
        return (
            <>
                <div className="checkout_product">
                    <div className="checkout_productList">
                        <img src={this.state.item.img} alt={this.state.item.alt} className="checkout_productImg" />
                        <div className="checkout_productInfo">
                            <h3><Link to='#'>{this.state.item.info}</Link></h3>
                            <div className="product_rating">
                                {
                                    new Array(this.state.item.rating).fill(0).map((value, key) => <StarIcon key={key}/>)
                                }
                            </div>
                            <div className="checkout_productAction">
                                <button className = "product_action" onClick={()=> this.context.moveToCart(this.state.item)} > Add To Cart </button>
                                <button className = "product_action" onClick={()=> this.context.moveToWhishList(this.state.item)}> Move To Wish List </button>
                                <button className = "product_action" onClick={()=> this.context.delete(this.state.item)}> Delete </button>
                            </div>
                        </div>
                    </div>
                    <div className="checkout_productPrice">
                        <div style={{ 'whiteSpace': 'nowrap' }}>
                            <small>$ </small>
                            <big><strong>{this.state.item.price}</strong></big>
                        </div>
                    </div>
                </div>
                <hr className="checkout_productSeperator"/>
            </>
        )
    }
}


