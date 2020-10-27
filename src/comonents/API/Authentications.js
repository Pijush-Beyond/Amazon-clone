import { firebase, auth } from '../../firebase';

class PhoneVerification{
    generateRecaptcha = (component) => {
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('newUserRegistration', {'size': 'invisible'});
        this.recaptchaVerifier.render()
            .then(widgetId =>component.setState({ ...component.state, disabled: false }));
    }

    sendVerificationCodeToPhoneNumber = (data, component) => {
        this.data = data;
        auth.signInWithPhoneNumber(data.prePhone+data.phone, this.recaptchaVerifier)
            .then((confirmationResult) =>{
                this.confirmationResult = confirmationResult;
                component.setState({ ...component.state, next: true });
            }).catch(error=>console.log(error));
    }

    verifyPhoneNumebr = (code) => {
        this.confirmationResult.confirm(code)
            .then(result =>auth.currentUser.updateEmail(this.data.email))
            .then(() =>auth.currentUser.updatePassword(this.data.password))
            .then(() =>auth.currentUser.updateProfile({ displayName: this.data.name }))
            .then(() => {
                alert('Login Successfull');
                console.log(auth.currentUser);
            })
            .catch(error => console.error('Error while checking the verification code', error));
    }
}
const phoneVerification = new PhoneVerification();
export { phoneVerification };