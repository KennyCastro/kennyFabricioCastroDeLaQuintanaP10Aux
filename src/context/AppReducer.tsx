import {Types} from "./ContantTypes";
export interface ActionType {
    type: string,
    payload: any
}
export default (state: any, action: ActionType) => {
    switch (action.type) {
        case Types.CHANGEITEMPOST: {
            return {
                ...state,
                itempost: action.payload
            }
        }

        case Types.CHANGEITEMUSER: {
            return {
                ...state,
                itemuser: action.payload
            }
        }

        case Types.SIGN_IN: {
            return {
                ...state,
                SignIn:action.payload
            }
        }
        case Types.RESTORE_TOKEN:
            return {
              ...state,
              userToken: action.payload,
              
        };
        /*case Types.CHANGEURI: {
            return {
                ...state,
                uriphoto: action.payload
            }
        }
        case Types.SEARCHBARVISIBLE: {
            return {
                ...state,
                searchbarVisible: action.payload
            }
        }*/
        default: {
            return state;
        }
    }
}