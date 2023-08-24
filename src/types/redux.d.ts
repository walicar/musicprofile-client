type ValidatePayload = {
    services: string[];
    session: {
        accessToken: string,
        id: string
    }
}