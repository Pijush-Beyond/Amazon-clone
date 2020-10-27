import React, { Component } from 'react'
import '../CSS/Login.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { PhoneNumberCredintial } from '../../API/Context';
import { phoneVerification } from '../../API/Authentications';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            warningMessage: null,
            forgotPassword: false,
            newUser: false,
        }
    }
    setUserName = username => this.setState({ ...this.state, username: username, warningMessage:null});
    showWaring = message => this.setState({ ...this.state, warningMessage: message });
    forgotPassword = () => this.setState({ ...this.state, forgotPassword: true,warningMessage: null });
    newUser = (value) => this.setState({ ...this.state, newUser: value, warningMessage: null });
    render() {
        return (
            <div className="login">
                <div className="login_shadow"></div>
                <div className="amazon_logoContainer">
                    <img src={require('../static/Amazon_logo.png')} alt="Amazon Logo" className='login_logo' />
                </div>
                {
                    this.state.warningMessage !== null ? <Warning message={this.state.warningMessage} />:null
                }
                {   
                    this.state.newUser ?
                        <NewAccount login={this}/>:
                        (this.state.forgotPassword ?
                        <ForgotPassword username={this.state.username} login={this} />:
                        (this.state.username === null ? <FirstLogin login={this} username={this.state.username}/> :
                            <SecondLogin login={this} password={this.state.password} username={this.state.username}/>))
                }
            </div>
        )
    }
}
class FirstLogin extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
            username: this.props.username,
            parent: this.props.login,
        }
    }
    validedUsername = (event) => {
        event.preventDefault();
        const num_reg = /^\d{10,12}$/g;
        const mail_reg = /^\w+@\w+\.\w+$/g;
        // console.log(this.state, Object.keys(this.state.parent.setuse));
        if (this.state.username.search(num_reg) >= 0 || this.state.username.search(mail_reg)>=0)
            this.state.parent.setUserName(this.state.username);
        else this.state.parent.showWaring('Please Enter Email or Modile Phone Number.');
    }
    render() {
        return(
            <>
                <div className="login_container">
                    <p style={{ fontSize: '28px' }}>Login</p>
                    <form onSubmit={this.validedUsername}>
                        <div className="username_container">
                            <label htmlFor="username">Email or mobile phone number</label>
                            <input type="text" name="email_or_phone" id="username" value={this.state.username ? this.state.username : ''} onChange={(event) => this.setState({ ...this.state, username: event.target.value })}  autoFocus/>
                        </div>
                        <button type="submit"className="login_submit subtotal_button">Continue</button>
                    </form>
                    <div className="login_conditions" > By continuing, you agree to Amazon's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940" className="link">Conditions of Use</a>
                        and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380"
                            className="link" > Privacy Notice </a>.
                    </div>
                    <div>
                        <div className="login_needHelp link" onClick={(event) => {
                            let tag = event.target;
                            while (tag.nodeName.toLowerCase() !== 'div') tag = tag.parentElement;
                            if (!tag.firstElementChild.getAttribute('style')) {
                                tag.firstElementChild.style.transform = 'rotateZ(90deg)';
                                tag.nextElementSibling.style.height = 'fit-content';
                            } else {
                                tag.firstElementChild.removeAttribute('style');
                                tag.nextElementSibling.removeAttribute('style');
                            }
                        }}><ArrowRightIcon className="arrow" />Need Help?</div>
                        <div className="login_collapsable">
                            <a href="#" onClick={()=>this.state.parent.forgotPassword()} className="link">Forgot Password</a>
                            <a href="#" className="link">Other issues with Sign-In</a>
                        </div>
                    </div>
                </div>
                <div className="login_new"><span>New To Amazon?</span></div>
                <button className="login_newUser product_quantity" onClick={()=>this.state.parent.newUser(true)}>Create Your Amazon account</button>
            </>
        )
    }
}

class Warning extends Component {
    render() {
        return (
            <div className="login_warning">
                <img src={require('../static/Amazon_smallpngs.png')} alt="wraning" className="warning" />
                <div className="warning_message">
                    <div className="warning_label">There is A Problem</div>
                    <div className="actual_message">{this.props.message}</div>
                </div>
            </div>
        )
    }
}

class SecondLogin extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            parent: this.props.login,
            username:this.props.username,
            password:this.props.password,
        }
    }
    
    render() {
        return (
            <>
                <div className="login_container">
                    <p style={{ fontSize: '28px' }}>Login</p>
                    <div className="username_display">
                        {this.props.username}
                        <a href="#" onClick={()=>this.state.parent.setUserName(null)}> Change</a>
                    </div>
                    <form >
                        <div className="username_container">
                            <div><span>Password</span><a href="#" onClick={() => this.state.parent.forgotPassword()}>Forgot Password</a> </div>
                            <input type="password" autoComplete='true' name="email_or_phone" id="username" value={this.state.password ? this.state.password : ''} onChange={(event) => this.setState({ ...this.state, password: event.target.value })} autoFocus />
                        </div>
                        <button className="login_submit subtotal_button">Login</button>
                    </form>
                    <div className="stay_login">
                        <input type="checkbox" id="stayLogin"/>
                        <label htmlFor="stayLogin">Keep me signed in.</label>
                        <span className="link">&nbsp;Details<ArrowRightIcon className="arrow" /></span>
                    </div>
                </div>
            </>
        )
    }
}

class ForgotPassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: this.props.username,
            parent: this.props.login,
        }
    }
    
    render() {
        return (
            <>
                <div className="login_container">
                    <p style={{ fontSize: '28px' }}>Password assitance</p>
                    <p className="username_display">
                        Enter the email address or mobile phone number associated with your Amazon account.
                    </p>
                    <form>
                        <div className="username_container">
                            <div>Email or mobile phone number</div>
                            <input type="password" autoComplete='true' name="email_or_phone" id="username" value={this.state.password ? this.state.password : ''} onChange={(event) => this.setState({ ...this.state, password: event.target.value })} autoFocus/>
                        </div>
                        <button className="login_submit subtotal_button">Continue</button>
                    </form>
                </div>
                <div className="login_container" style={{padding:'0',margin:'10px 0 20px 0',border:'none'}}>
                    <div><big>Has your email address or mobile phone number changed?</big></div>
                    <small>If you no longer use the e-mail address associated with your Amazon account, you may contact <a href="https://www.amazon.in/gp/help/customer/account-issues/ref=ap_cs_forgot_pwd?ie=UTF8">Customer Service</a> for help restoring access to your account.</small>
                </div>
            </>
        )
    }
}

class NewAccount extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
            prePhone: '+91',
            parent: this.props.login,
            next: false,
            disabled: true,
        }
    }
    validedUsername = (event) => {
        event.preventDefault();
        let phone = this.state.prePhone + (this.state.phone[0] === '+' ?
            this.state.phone.slice(0, this.state.prePhone.length) : this.state.phone);
        let data = {
            name: this.state.name,
            phone: phone,
            email: this.state.email !== '' ? this.state.email : phone.slice(1, phone.length)+'@clone-6a708.firebaseapp.com',
            password:this.state.password,
        }
        phoneVerification.sendVerificationCodeToPhoneNumber(data, this);
    }
    componentDidMount = () => {
        phoneVerification.generateRecaptcha(this);
    }
    showVarifyPhoneNumber = (value) => this.setState({ ...this.state, next: value });
    render() {
        if (this.state.next) return <VarifyPhoneNumberWithCode login={this}/>
        else return (
            <>
                <div className="login_container" style={{position:'relative'}}>
                    <p style={{ fontSize: '28px' }}>Create Account</p>
                    <form onSubmit={this.validedUsername} id="phoneNumberVarificationForm">
                        <div id="newUserRegistration"></div>
                        <div name="userName" className="username_container">
                            <div>Your Name</div>
                            <input name="userName" type="text" value={this.state.name} onChange={(event) => this.setState({ ...this.state, name: event.target.value })} autoFocus/>
                        </div>
                        <div className="username_container">
                            <div>Mobile Nummber</div>
                            <div style={{margin:0,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <select name="countryCode"className="product_quantity" defaultValue={this.state.prePhone} onChange={(event) => this.setState({ ...this.state, prePhone: event.target.value })} style={{margin:'0',height:'32px'}}>
                                    {
                                        Object.entries(PhoneNumberCredintial).map(value => <option value={value[1]} key={value[0]}>{value[0].slice(0,2)+' '+ value[1]}</option> )
                                    }
                                </select>
                                    <input name="phoneNumber" type="text" pattern="^(\+?)\d{10,12}$" placeholder="Mobile number"value={this.state.phone} onChange={(event) => this.setState({ ...this.state, phone: event.target.value })} style={{width:'65%',margin:0}}/>
                            </div>
                        </div>
                        <div className="username_container">
                            <div>Email (optional)</div>
                            <input name="email"type="email" value={this.state.email} onChange={(event) => this.setState({ ...this.state, email: event.target.value })} />
                        </div>
                        <div className="username_container">
                            <div>Password</div>
                            <input name="password"style={{margin:0}} type="password" autoComplete='true' minLength={6} placeholder="At least 6 characters" value={this.state.password} onChange={(event) => this.setState({ ...this.state, password: event.target.value })} />
                            <span className="passwordNote">Passwords must be at least 6 characters.</span>
                        </div>
                        <div style={{fontSize:12,margin:'20px 0'}}> 
                            We will send you a text to verify your phone.
                            Message and Data rates may apply.
                        </div>
                        <button className="login_submit subtotal_button" disabled={this.state.disabled}>Continue</button>
                    </form>
                    {/* <div className = "login_shadow" ></div> */}
                    <div className="stay_login" style={{margin:'40px 0 0 0'}}>
                        Already have an account?&nbsp;
                        <span className="link" onClick={()=>this.state.parent.newUser(false)}>Sign in<ArrowRightIcon className="arrow" /></span>
                    </div>
                </div>
            </>
        )
    }
}

class VarifyPhoneNumberWithCode extends Component{
    constructor(props) {
        super(props)

        this.state = {
            verificationCode:'',
            parent: this.props.login,
        }
    }
    varifyPhoneNumber = (event) => {
        event.preventDefault();
        if (this.state.verificationCode !== '') phoneVerification.verifyPhoneNumebr(this.state.verificationCode);
    }
    render() {
        return (
            <>
                <div className="login_container">
                    <p style={{ fontSize: '28px' }}>Verify mobile number</p>
                    <p className="username_display">
                        A text with a One Time Password(OTP) has been sent to your mobile number: {this.props.phoneNumber} <span className="link" onClick={()=>this.state.parent.showVarifyPhoneNumber(false)}>Change</span>
                    </p>
                    <form onSubmit={this.varifyPhoneNumber}>
                        <div className="username_container">
                            <div><span>Enter OTP:</span><span className="link">Resend OTP</span> </div>
                            <input type="text" name="verificationCode" value={this.state.verificationCode } onChange={(event) => this.setState({ ...this.state, verificationCode: event.target.value })} autoFocus/>
                        </div>
                        <button type="submit" className="login_submit subtotal_button">Create your Amazon account</button>
                    </form>
                    <div className="username_container" style={{ margin:'30px 0px 15px',fontSize:"12px"}}>
                        By creating an account or logging in , you agree to Amazon’ s Conditions of Use and Privacy Policy.to your account.
                    </div>
                </div>
            </>
        )
    }
}
