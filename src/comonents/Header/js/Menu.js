import React, { Component } from 'react';
import ReactDOM from'react-dom';

import { options } from '../../API/Context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ClearIcon from '@material-ui/icons/Clear';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import '../css/Menu.css';

export default class MenuContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username:'Pijush',
        }
    }
    hideMenuWindow = (event) => {
        if (event.target.classList.contains('menu_window') || event.target.classList.contains('cross') || event.target.parentElement.classList.contains('cross')) {
            document.getElementById("menu_window").removeAttribute('style');
            document.body.removeAttribute('style');
        }
    }
    render() {
        return (
            <div className="menu_window" id="menu_window" onClick={this.hideMenuWindow}>
                <div className="menu">
                    <div className="menu_banner"><AccountCircleIcon style={{ fontSize: '32px', color: 'white' }}/><div className="bannar_text">Hello, <span>{this.state.username}</span></div></div>
                    <div className="menu_container" id="menu_container">
                        <div id="menu_flim">
                            <div className="actual_menu" id="prev_menu"><div></div></div>
                            <div className="actual_menu" id="current_menu"><div><CurrentMenu back='' /></div></div>
                            <div className="actual_menu" id="upcomming_menu"><div></div></div>
                        </div>
                    </div>
                </div>
                <ClearIcon style={{ color: 'white', fontSize: '35px', margin: '10px 6px', 'cursor':'pointer'}} className="cross"/>
            </div>
        )
    }
}


class CurrentMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: options,
            back:this.props.back,
        }
    }
    backMenu = (event) => {
        // console.log('this is back-menu', event.target);
        let target = event.target;
        while (target.nodeName.toLowerCase() !== 'div')
            target = target.parentElement;
        let menu_film = document.getElementById('menu_flim');
        menu_film.style.transitionDuration = '0.3s';
        menu_film.style.left = '0px';
        setTimeout(backwordCleanUp, 300, target.getAttribute('data-back'));
        // backwordCleanUp(event.target.getAttribute('data - back'));
        // () => this.setState({ ...this.state, back: back_link })
    }
    upcommingMenu = (event) => {
        // console.log('this is in upcommingMenu', event.target);
        let target = event.target;
        while (target.nodeName.toLowerCase() !== 'div')
            target = target.parentElement;
        ReactDOM.render(<UpcommingMenu back={this.state.back+'.'+target.getAttribute('data-next')}/>, document.getElementById('upcomming_menu').firstElementChild);
    }
    // componentDidMount = () => {

    // }
    render(){
        let back = null;
        let arr = this.state.back.split('.');
        if (this.state.back !== '') {
            let back_name;
            if (arr.length > 2)  back_name = arr[arr.length-2];
            else back_name = 'Main Menu';
            back = (
                <div className="menu_back" onClick={this.backMenu} data-back={arr.slice(0, arr.length - 2).join('.')}>
                    <ArrowBackIcon className="menu_arrow" />
                    <p className="back_menu" > {back_name}</p>
                </div>
            );
        }
        let menus = this.state.options;
        for (let depth of arr) {
            menus = depth!==''?menus[depth]:menus;
        }
        // console.log('this is in CurrentMenu',menus, this.state.back);
        let options =()=> {
            return Object.entries(menus).map(([key, value]) => {
                if (value === true)
                    return (
                        <div className="menu_section" key={key}>
                            <hr className="section_separator" />
                            <p className="menu_option">{key}</p>
                        </div>
                    )
                else if (value === false) return <hr className="option_separator" key={key} />
                else if (typeof (value) === 'string')
                    return (
                        <div className="menu_option" key={key}>
                            <p> {key}</p>
                        </div>
                    )
                else if (typeof (value) === 'object')
                    return (
                        <div className="menu_option" key={key} onClick={this.upcommingMenu} data-next={key}>
                            <p> {key}</p>
                            < KeyboardArrowRightIcon className = "menu_arrow" / >
                        </div>
                    )
                else return null
            })
        };
        return (<>
            {back}
            {options()}
        </> );
    }
}

class UpcommingMenu extends CurrentMenu{
    componentDidMount = () => {
        // console.log('this is is after render upcomming mane');
        let menu_film = document.getElementById('menu_flim');
        menu_film.style.transitionDuration = '0.3s';
        menu_film.style.left = '-730px';
        setTimeout(upcommingCleanUp, 300);
    }
}

const backwordCleanUp = (back) => {
    // console.log('this is back',back);
    let menus = document.getElementById('menu_flim');
    menus.removeAttribute('style');
    menus.children[1].replaceChild(menus.children[0].firstElementChild, menus.children[1].firstElementChild);
    menus.children[0].appendChild(document.createElement('div'));
    if (typeof (back) == 'string') ReactDOM.render(<CurrentMenu back={back} />, menus.children[0].firstElementChild);
    // else menus.children[0].appendChild(document.createElement('div'));
    // menus.children[0].appendChild(<CurrentMenu back={back} />);
}
const upcommingCleanUp = () => {
    // console.log('this is in upcomming');
    let menus = document.getElementById('menu_flim');
    menus.removeAttribute('style');
    menus.children[0].replaceChild(menus.children[1].firstElementChild, menus.children[0].firstElementChild);
    menus.children[1].appendChild(menus.children[2].firstElementChild);
    menus.children[2].appendChild(document.createElement('div'));
}