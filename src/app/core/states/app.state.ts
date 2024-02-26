
import * as fromUser from '../states/users/user.reducer';


export interface RootState {
    user:fromUser.UserState
    // conversation:fromConversation.ConversationState
}


export const reducer = {
    user:fromUser.userReducer
}