window.onload=function () {
//     console.log("loaded")
  render();
};
function render() {
    window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
function phoneAuth() {

    var number=document.getElementById('number').value;

    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        
        document.getElementById('otpverify').style.display='block';
    }).catch(function (error) {
        
    });
}
function codeverify() {
    var code=document.getElementById('verificationCode').value;
    const url = '/'
    coderesult.confirm(code).then(function (result) {
        document.getElementById('otpverify').style.display='block';
        var number=result.user.phoneNumber;
        document.getElementById('otpverify').style.display='none';
        data = new Object()
        data.phone = number
        fetch('verified',
        {
            method:'POST',
            headers:{
                'Accept' : '*/*',
                'Content-Type' : 'appilication/json'
            },
            body : JSON.stringify(data)
        }).then(response=>response.json()).then(data=>{
            
            if(data.result == 'success'){
                
                window.location.href += "#hjhj";
                location.reload()
            }
        
        }).catch(console.error)

    }).catch(function (error) {
        
    });
}
function sendnumber(){
    data = new Object()
    data.phone = '+1 555-555-5556'
    fetch('verified',
        {
            method:'POST',
            headers:{
                'Accept' : '*/*',
                'Content-Type' : 'appilication/json'
            },
            body : JSON.stringify(data)
        }).then(response=>response.json()).then(data=>{console.log(data)}).catch(console.error)
}