import { Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../state/auth';

export { PrivateRoute };

//@ts-ignore
function PrivateRoute({ component: Component, ...rest }) {
    const auth = useRecoilValue(authAtom);
    return (
        //@ts-ignore
        <Route {...rest} render={props => {
            if (!auth) {
                // not logged in so redirect to login page with the return url
                return <Navigate replace to='/login' />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}