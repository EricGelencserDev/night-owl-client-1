import { playerConstants } from '../_constants';
import { playerService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const playerActions = {
    registerOne
};

function registerOne(player) {
    return dispatch => {
        dispatch(request(player));
        dispatch(alertActions.clear());

        playerService.registerOne(player)
            .then(
                player => {
                    dispatch(success(player));
                    dispatch(alertActions.success("Player registered"));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(player) { return { type: playerConstants.PLAYER_REGISTER_REQUEST, player } }
    function success(player) { return { type: playerConstants.PLAYER_REGISTER_SUCCESS, player } }
    function failure(error) { return { type: playerConstants.PLAYER_REGISTER_FAILURE, error } }
}

