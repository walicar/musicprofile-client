import LogoutButton from "../buttons/LogoutButton";
import LoginButton from "../buttons/LoginButton";

type Prop = {
  session: any;
}

const NavBarPages: React.FC<Prop> = ({session}) => {

  return (
    <div className="nav-bar__tabs">
      {session ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default NavBarPages;
