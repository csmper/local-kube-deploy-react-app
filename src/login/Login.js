import React from 'react';
import { googleClientId } from '../secure';
function Login(props) {
    const handleLoginResponse = (response) => {props.handleLoginResponse(response)};
    window.handleLoginResponse = handleLoginResponse;

    return (
        <div>
            <div id="g_id_onload"
                data-client_id={googleClientId}
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleLoginResponse"
                data-auto_select="true"
                data-itp_support="true">
            </div>
            <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </div>
    );
}

export default Login;