const refresh_token_expire_days = 30;

export default {
    secret_token: "b3a8a6f3883b04647a727404f9b2a842",
    expires_in_token: "15m",
    secret_refresh_token: "f8587273ab561c212ea0cc2c038616f0",
    expires_in_refresh_token: `${refresh_token_expire_days}d`,
    refresh_token_expire_days
}