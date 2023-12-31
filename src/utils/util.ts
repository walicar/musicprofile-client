const isEmpty = (obj: { [key: string]: any }) => {
  return Object.keys(obj).length === 0;
};

type TokenSetters = {
  spotify?: any;
  lastfm?: any;
};

const validate = async (
  validator: any,
  services: string[],
  setters: TokenSetters,
) => {
  const newTokens: Tokens = await validator(services);
  if (!isEmpty(newTokens)) {
    for (const service in newTokens) {
      const token: Token | undefined = newTokens[service as SupportedService];
      if (token) {
        setters[service as SupportedService](token);
      }
    }
  }
};

const stubMedal = (foo: any, bar: string, setter: any) => {
  const newInput = foo(bar);
  setter(newInput);
};

export { isEmpty, validate, stubMedal };
