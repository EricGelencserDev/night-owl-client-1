import { playerConstants } from '../_constants';

export function playerRegistration(state = {}, action) {
  console.log("In player.reducer, action = " + JSON.stringify(action, null, 2));
  switch (action.type) {
    case playerConstants.PLAYER_REGISTER_REQUEST:
      return {
        isPending: true,
        ...action.player
      };
    case playerConstants.PLAYER_REGISTER_SUCCESS:
      return {
        isPending: false,
        isRegistered: true,
        ...action.player
      };
    case playerConstants.PLAYER_REGISTER_FAILURE:
      return {
        isPending: false,
        isRegistered: false
      };
    default:
      return state
  }
}