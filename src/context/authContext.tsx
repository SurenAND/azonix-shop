import { AuthReducerAction } from '@/src/types/enums';
import { AuthReducerActionType, AuthStateType } from '@/src/types/types';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 2);

const authInit = {
  isLogin: false,
  username: '',
  role: '',
  userId: '',
  firstname: '',
};

function authReducer(
  state: AuthStateType,
  action: AuthReducerActionType,
): AuthStateType {
  switch (action.type) {
    case AuthReducerAction.SET_USER:
      setCookie('role', action.payload.role, {
        expires: expireDate,
      });
      setCookie('_id', action.payload._id, {
        expires: expireDate,
      });
      setCookie('username', action.payload.username, {
        expires: expireDate,
      });
      setCookie('accessToken', action.payload.accessToken, {
        expires: expireDate,
      });
      setCookie('refreshToken', action.payload.refreshToken, {
        expires: expireDate,
      });
      setCookie('firstname', action.payload.firstname, {
        expires: expireDate,
      });
      return {
        isLogin: true,
        username: action.payload.username,
        role: action.payload.role,
        userId: action.payload._id,
        firstname: action.payload.firstname,
      };
    case AuthReducerAction.LOGOUT:
      deleteCookie('role');
      deleteCookie('username');
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('_id');
      deleteCookie('firstname');
      return {
        isLogin: false,
        username: '',
        role: '',
        userId: '',
        firstname: '',
      };
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  state: AuthStateType;
  dispatch: React.Dispatch<AuthReducerActionType>;
}>({
  state: authInit,
  dispatch: () => {},
});

export const useUserContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, authInit);

  useEffect(() => {
    const username = getCookie('username') ?? '';
    const role = getCookie('role') ?? '';
    const _id = getCookie('_id') ?? '';
    const accessToken = getCookie('accessToken') ?? '';
    const refreshToken = getCookie('refreshToken') ?? '';
    const firstname = getCookie('firstname') ?? '';
    if (!!accessToken) {
      dispatch({
        type: AuthReducerAction.SET_USER,
        payload: {
          username,
          role,
          _id,
          accessToken,
          refreshToken,
          firstname,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
