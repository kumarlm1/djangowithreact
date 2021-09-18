import { STATE } from "../GlobalData";

export  class LocalStorageRedux {
    constructor(){
        
     this.KEYS = {
            ROOT : 'root'
      }
    }

    
    static subscribeToRedux(){
        STATE.subscribe(()=>{
           // console.log(STATE.getState())
            localStorage.setItem('root',JSON.stringify(STATE.getState().questions))
        })
    }

    // static getReduxDataFromLocalStorage(key){
    //     return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key))  : []
        

    // }
    static putreduxDataToLocalStorage(key,value){
        
    }

    static deleteReduxDataLocalStorage(key){
        localStorage.removeItem(key)
    }

    static removeAllLocalStorageData(){
        console.log('removed all item')
        localStorage.clear()
    }

}




