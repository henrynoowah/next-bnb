import Link from "next/link";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAPI } from "../lib/api/auth";
import { useSelector } from "../store";
import { userActions } from "../store/user";
import OutsideClickHander from "react-outside-click-handler";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";

const HeaderUserProfile: FC = () => {
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const dispatch = useDispatch();
  const userProfileImage = useSelector((store) => store.user.profileImage);

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
      setIsUserMenuOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <OutsideClickHander
        onOutsideClick={() => {
          if (isUserMenuOpened) {
            setIsUserMenuOpened(false);
          }
        }}
      >
        <button
          className="header-user-profile"
          type="button"
          onClick={() => setIsUserMenuOpened(!isUserMenuOpened)}
        >
          <HamburgerIcon />
          <img
            className="header-user-profile-image"
            src={userProfileImage}
            alt=""
          />
        </button>
        {isUserMenuOpened && (
          <ul className="header-usermenu">
            <li>숙소 관리</li>
            <Link href="/room/register/building">
              <a role="presentation" onClick={() => {}} />
            </Link>
            <li>숙소 등록하기</li>
            <Link href="/room/register/building">
              <a role="presentation" onClick={() => {}} />
            </Link>
            <div className="header-usermenu-divider" />
            <li role="presentation" onClick={logout}>
              로그아웃
            </li>
          </ul>
        )}
      </OutsideClickHander>
    </>
  );
};

export default HeaderUserProfile;
