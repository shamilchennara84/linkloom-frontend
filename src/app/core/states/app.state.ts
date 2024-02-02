
import * as fromUser from '../states/users/user.reducer';


export interface RootState {
    user:fromUser.UserState
}


export const reducer = {
    user:fromUser.userReducer
}