import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { TokenWrapper } from "@database/TokenWrapper";
import ServerWrapper from "@server/ServerWrapper";
import { isEmpty } from "@utils/util";
import { validate, stubMedal } from "@utils/util";

const StubButton: React.FC = () => {
  const [medal, setMedal, { removeItem }] = useLocalStorageState("experiment");
  const [token, setToken]: any = useLocalStorageState("spotify-token");
  const [session]: any = useLocalStorageState("sb-localhost-auth-token");
  const tokens = new TokenWrapper(session.access_token, session.user.id);
  const server = new ServerWrapper(session.access_token, session.user.id);

  useEffect(() => {
    console.log("experiment modified: ", medal);
  }, [medal]);

  const add = () => {
    setMedal("added");
  };

  const remove = () => {
    console.log("remove experiment");
    removeItem();
  };
  const someThing = (inp: string) => {
    return inp + " AHHHH!";
  };
  const stubby = () => {
    stubMedal(someThing, "Kirby", setMedal);
  };

  const clickUpdate = async () => {
    const refreshedTokens = await tokens.validateTokens(["spotify"]);
    if (!isEmpty(refreshedTokens)) {
      setToken(refreshedTokens["spotify"]);
    }
    const message = await server.postUpdate({ spotify: token.access_token });
    console.log(message);
  };

  const clickUpdateGeneral = async () => {
    await validate(tokens.validateTokens, ["spotify"], { spotify: setToken });
    const message = await server.postUpdate({ spotify: token.access_token });
    console.log(message);
  };

  return (
    <div>
      <button onClick={add}>add token</button>
      <button onClick={remove}>remove token</button>
      <button onClick={clickUpdate}>CLICK TO UPDATE</button>
      <button onClick={clickUpdateGeneral}>GENERAL CLICK TO UPDATE</button>
      <button onClick={stubby}>Secret stubby</button>
      {token ? <p>I can see token</p> : <p>No token 🙁</p>}
      {medal ? <p>I can see medal {`${medal}`}</p> : <p>No medal 🙁</p>}
    </div>
  );
};

export default StubButton;
