import LogoutButton from "../buttons/LogoutButton";
import LoginButton from "../buttons/LoginButton";
import SignupButton from "@components/buttons/SignupButton";

type Prop = {
  session: any;
  className: string;
  hidden: boolean;
};

const HeaderButtons: React.FC<Prop> = ({ session, className, hidden }) => {
  return (
    <div className={className}>
      {session ? (
        <LogoutButton hidden={hidden}/>
      ) : (
        <>
          <LoginButton hidden={hidden}/> <SignupButton />
        </>
      )}
    </div>
  );
};

export default HeaderButtons;
