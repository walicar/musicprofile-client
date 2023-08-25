import { useQuery } from "react-query";
import axios, { AxiosInstance } from "axios";
import { refreshHandlers } from "@services/refreshHandlers";
import { TokenWrapper as TokenWrapper } from "@database/TokenWrapper";
import { writeLocalStorage } from "@utils/localStorage";

const createInstance = (
  service: string,
  session: Session,
  access_token: string
) => {
  console.log("creating instance");
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
        console.log(err.response);
        console.log("REFRESHING TOKEN!!!");
        const db = new TokenWrapper(session.auth_token, session.id);
        const refreshToken: string = await db.getToken(service);
        const { access_token, refresh_token, expires_in }: any =
          await refreshHandlers[service](refreshToken);
        const created_at = Date();
        console.log(access_token, refresh_token, expires_in);
        //
        await db.writeTokens({ [service]: refresh_token });
        const serviceToken: Token = { access_token, created_at, expires_in };
        writeLocalStorage(`${service}-token`, serviceToken);
        console.log("ORIGINAL REQUEST REAL? ", !!originalRequest);
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(err);
    }
  );
  return instance;
};

const queryService = async (instance: AxiosInstance, url: string) => {
  console.log("queryService called");
  const { data } = await instance.get(url);
  console.log(data);
  return data;
};

export default function useService(
  key: string,
  url: string,
  access_token: string,
  service: string,
  session: Session,
  opt: any
) {
  const instance = createInstance(service, session, access_token);
  return useQuery([key, url], () => queryService(instance, url), opt);
}
