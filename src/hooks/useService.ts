import { useQuery } from "react-query";
import axios, { AxiosInstance } from "axios";
import { refreshHandlers } from "@services/refreshHandlers";
import { TokenWrapper as TokenWrapper } from "@database/TokenWrapper";
import { writeLocalStorage } from "@utils/localStorage";

const createInstance = (
  service: string,
  session: Session,
  access_token: string,
) => {
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  let originalRequest: any = null;
  instance.interceptors.request.use((config: any) => {
    originalRequest = config;
    return config;
  });
  instance.interceptors.response.use(
    (res) => res,
    async (err: any) => {
      if (err.response && err.response.status === 401) {
        const db = new TokenWrapper(session.auth_token, session.id);
        const refreshToken: string = await db.getRefreshToken(service);
        const { access_token, refresh_token, expires_in }: any =
          await refreshHandlers[service](refreshToken);
        const created_at = Date();
        //
        await db.writeRefreshTokens({ [service]: refresh_token });
        const serviceToken: Token = { access_token, created_at, expires_in };
        // writing to localStorage outside of react does not rerender components
        writeLocalStorage(`${service}-token`, serviceToken);
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(err);
    },
  );
  return instance;
};

const queryService = async (instance: AxiosInstance, url: string) => {
  const { data } = await instance.get(url);
  return data;
};

const makeServiceParams = (
  url: string,
  access_token: string,
  session: Session,
  service: string,
): ServiceParams => ({
  url,
  access_token,
  session,
  service,
});

export default function useService(
  key: string,
  serviceParams: ServiceParams,
  opt: any,
) {
  const { service, session, access_token, url } = serviceParams;
  const instance = createInstance(service, session, access_token);
  return useQuery([key, url], () => queryService(instance, url), opt);
}

export { makeServiceParams };
