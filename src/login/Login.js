import React from 'react';

function Login(props) {
    const handleLoginResponse = (response) => {props.handleLoginResponse(response)};
    window.handleLoginResponse = handleLoginResponse;

    return (
        <div>
            <div id="g_id_onload"
                data-client_id="796381247590-18dctu7fubu8f91nsgd9kie2jkr9cq92"
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