import { LoadingIndicator } from '../../components/loadingIndicator';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../ducks/store';
import { loginRequest } from '../../ducks/loginIdentitySlice';

const GuestLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  dispatch(
    loginRequest({ username: 'guest@mail.com', password: 'guest123!' }),
  ).then((data) => {
    data.payload;
    router.push('/');
  });

  return (
    <div className="h-screen flex items-center -mb-[100px]">
      <LoadingIndicator />
    </div>
  );
};

export default GuestLogin;
