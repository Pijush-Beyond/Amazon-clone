import React, { Component } from 'react';
import '../css/Home.css';
import Product from './Product';

export class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home_container">
                    < img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/september/GWbanners/DesktopHero_1500x600._CB403958842_.jpg"
                        alt=""
                        className="home_image" />
                </div>
                <div className="home_row">
                    < Product id={1}
                        info="this is product info of product one"
                        price={5}
                        rating={2}
                        img="https://m.media-amazon.com/images/I/71HXR1mNdYL._AC_UY218_.jpg"
                        alt="product image one"
                        maxquantity={5}
                    />
                    < Product id = {2}
                        info = "this is product info of product one"
                        price={5}
                        rating={4}
                        img="https://m.media-amazon.com/images/I/71HXR1mNdYL._AC_UY218_.jpg"
                        alt="product image one"
                        maxquantity={5}
                    />
                </div>
                <div className="home_row">
                    < Product id = {3}
                        info = "this is product info of product one"
                        price={5}
                        rating={4}
                        img="https://m.media-amazon.com/images/I/71HXR1mNdYL._AC_UY218_.jpg"
                        alt="product image one"
                        maxquantity={5}
                    />
                    < Product
                        id = {4}
                        info="this is product info of product one"
                        price={5}
                        rating={4}
                        img="https://m.media-amazon.com/images/I/71HXR1mNdYL._AC_UY218_.jpg"
                        alt="product image one"
                        maxquantity={5}
                    />
                    < Product id = {5}
                        info = "this is product info of product one"
                        price={5}
                        rating={4}
                        img="https://m.media-amazon.com/images/I/71HXR1mNdYL._AC_UY218_.jpg"
                        alt="product image one"
                        maxquantity={5}
                    />
                </div>
                <div className="home_row">
                    < Product id = {6}
                        info = "this is product info of product one"
                        price={5}
                        rating={4}
                        img="https://m.media-amazon.com/images/I/71HXR1mNdYL._AC_UY218_.jpg"
                        alt="product image one"
                        maxquantity={5}
                    />
                </div>
            </div>
        )
    }
}

export default Home
