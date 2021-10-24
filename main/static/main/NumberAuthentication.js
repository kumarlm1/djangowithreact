window.onload=function () {
    console.log("loaded")
  render();
};
function render() {
    window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase
    //it takes two parameter first one is number,,,second one is recaptcha
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        alert("Message sent");
        document.getElementById('otpverify').style.display='block';
    }).catch(function (error) {
        alert(error.message);
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
                alert("success");
                location.reload()
            }
        
        }).catch(console.error)

    }).catch(function (error) {
        alert(error.message);
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