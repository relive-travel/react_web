import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setNotifyUserEmpty } from "redux/slice/statusSlice";

import UserInfoEmpty from "views/components/notify/exception/UserInfoEmpty";

function UserEmpty() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <section className="user-empty-component">
      <article>
        <section className="user-empty-main">
          <header>
            <UserInfoEmpty />
          </header>
          <footer>
            <button
              className="empty-ok-button"
              onClick={() => {
                dispatch(setNotifyUserEmpty(false));
                navigate("/");
              }}
            >
              알겠어요!
            </button>
          </footer>
        </section>
      </article>
    </section>
  );
}

export default UserEmpty;
