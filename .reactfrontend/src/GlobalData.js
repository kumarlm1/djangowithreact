import { LocalStorageRedux } from './components/LocalStorageRedux'
const redux = require('redux')


 export const ACTIONS = {
     ADD_QUESTION : 'ADD_QUESTION',
     REMOVE_QUESTION : 'REMOVE_QUESTION',
     ADD_LESSIONS : 'ADD_LESSIONS',
     INSERT_QUSETIONS : 'INSERT_QUSETIONS',
     CHANGE_LESSION_QUESTION_COUNT:'CHANGE_LESSION_QUESTION_COUNT',
     ADD_TABS : 'ADD_TABS',
     CHANGE_TAB_NAME : 'CHANGE_TAB_NAME',
     CHANGE_TAB_POSITION : 'CHANGE_TAB_POSITION',
     CHANGE_TAB_QNSCOUNT :'CHANGE_TAB_QNSCOUNT'

    }

 export const ACTIONCALLS = {
     addQuestion :{ type : ACTIONS.ADD_QUESTION } ,
     removeQuestion : {type: ACTIONS.REMOVE_QUESTION} ,
     addLessions : {type:ACTIONS.ADD_LESSIONS},
     insertQuestions : {type:ACTIONS.INSERT_QUSETIONS},
     changeLessionCount : {type:ACTIONS.CHANGE_LESSION_QUESTION_COUNT},
     addTabs :{ type:ACTIONS.ADD_TABS }
}
//const data = LocalStorageRedux.getReduxDataFromLocalStorage('root')
const initialState =
     {
    questions : [],
    lessions : [],
    qns : [],
    tabs:[]
   }



const Questionsreducer = (state =initialState ,action )=>{
    switch(action.type){
        case ACTIONS.ADD_QUESTION : return{ ...state , questions : {...state.questions, [action.info.payload.from]:{...state.questions[action.info.payload.from],[action.info.payload.id]:{...action.info.payload}} } }
        case ACTIONS.REMOVE_QUESTION :  delete state.questions[action.info.payload.from][action.info.payload.id]; return{ ...state }

        case ACTIONS.ADD_LESSIONS : return { ...state , lessions : {...state.lessions,...action.info.payload } }
        case ACTIONS.CHANGE_LESSION_QUESTION_COUNT : return {  ...state, lessions:{...state.lessions,[action.info.id]:{...state.lessions[action.info.id],count:{...state.lessions[action.info.id].count,[action.info.tabid]:action.info.cnt}}}}
        case ACTIONS.INSERT_QUSETIONS : return { ...state , qns : { ...state.qns , [action.info.payload.id]:action.info.payload }}

        case ACTIONS.ADD_TABS : return{...state,tabs:{...action.tabs}}
        case ACTIONS.CHANGE_TAB_NAME : return {...state,tabs:{...state.tabs,[action.name]:{...state.tabs[action.name],tabname:action.tabname}}}
        case ACTIONS.CHANGE_TAB_POSITION : return {...state,tabs:{...state.tabs,[action.name]:{...state.tabs[action.name],position:action.position }}}
        case ACTIONS.CHANGE_TAB_QNSCOUNT : return {...state,tabs:{...state.tabs,[action.name]:{...state.tabs[action.name],noofqns:action.noofqns }}}

        default : return {...state}
    }
}  
export const STATE = redux.createStore(Questionsreducer)

LocalStorageRedux.subscribeToRedux()