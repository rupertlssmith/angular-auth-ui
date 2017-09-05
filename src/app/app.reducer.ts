import { Reducer, combineReducers } from 'redux';
import { Auth, AuthReducer } from './shared/models/auth.model';

export interface AppState {
   auth: Auth;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
   authReducer: AuthReducer
});

export default rootReducer;
