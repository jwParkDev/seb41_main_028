import React from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { useState } from 'react';
import Link from 'next/link';
import { Modal } from './modal';
import { CertificationModal } from './certificationModal';
import { useAppDispatch } from '../ducks/store';
import { initLoginIdentity } from '../ducks/loginIdentitySlice';
import { KaKaoShare } from '../module/kakaoShare';
import { getUserCertificate } from '../module/userFunctionMoudules';
import { useAppSelector } from '../ducks/store';

interface ItemProps {
  title: string;
  path: string;
}

export const MyPageMenuList = ({ email, successArr }) => {
  const [isCertActive, setIsCertActive] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [certId, setCertId] = useState(null);
  const [certInfo, setCertInfo] = useState(null);
  const userId = useAppSelector((state) => state.loginIdentity.userId);
  const dispatch = useAppDispatch();

  const menuStyle =
    'w-[90%] pl-5 cursor-pointer flex place-content-between h-10 text-lg items-center mb-1 w-[80%] bg-gray-500 text-white hover:bg-subColor rounded-full';
  // 'w-[49%] pl-5 cursor-pointer flex place-content-between h-10 text-lg items-center mb-1 w-[80%] bg-mainColor text-white hover:bg-subColor rounded-full';

  const CertDropDown = ({ success }): JSX.Element => {
    return (
      <div className="flex flex-col items-stretch w-[70%]">
        {success.length > 0 ? (
          success.map((el) => {
            return (
              <div
                key={el.challengeId}
                className={`flex place-content-between border solid border-black h-8 items-center mb-1 mx-2 rounded-xl ${
                  el.subTitle ? '' : 'justify-center'
                }`}
              >
                <span className={`${el.subTitle ? 'ml-5' : 'text-xl'}`}>
                  {el.subTitle || '성공 데이터 없음'}
                </span>
                {el.subTitle ? (
                  <button
                    className={`bg-mainColor text-white text-sm mr-4 px-2 rounded-full hover:bg-subColor`}
                    onClick={(): void => {
                      getUserCertificate({
                        userId,
                        habitId: el.habitId,
                      }).then((res) => {
                        setCertInfo(res.data);
                        setCertId(el.habitId);
                        setIsCertOpen(!isCertOpen);
                      });
                    }}
                  >
                    발급
                  </button>
                ) : (
                  ''
                )}
              </div>
            );
          })
        ) : (
          <div
            className="flex place-content-between border solid border-black h-8 items-center mb-1 mx-2 rounded-xl 
                justify-center"
          >
            <span className="text-lg">성공 데이터 없음</span>{' '}
          </div>
        )}
      </div>
    );
  };

  const handleCertOpen = (id: number): void => {};

  const MenuItem = ({ path, title }: ItemProps): JSX.Element => {
    return (
      <Link className={menuStyle} href={path}>
        <span>{title}</span>
        <div className="pr-5 ">
          <SlArrowRight className="inline align-middle dark:bg-white" />
        </div>
      </Link>
    );
  };

  const LogOut = ({ path, title }: ItemProps): JSX.Element => {
    return (
      <Link
        className={menuStyle}
        href={path}
        onClick={() => {
          dispatch(initLoginIdentity());
        }}
      >
        <span>{title}</span>
        <div className="pr-5 ">
          <SlArrowRight className="inline align-middle dark:bg-white" />
        </div>
      </Link>
    );
  };

  return (
    // <div className="mt-6 flex w-full items-center flex-wrap justify-evenly">
    <div className="mt-6 flex flex-col w-full items-center">
      {isCertOpen && (
        <Modal
          isOpen={isCertOpen}
          setIsOpen={setIsCertOpen}
          buttonName="종료"
          onClick={() => {
            console.log(certId);
            setIsCertOpen(!isCertOpen);
          }}
          children={<CertificationModal data={certInfo} />}
        />
      )}
      {isInviteOpen && (
        <Modal
          isOpen={isInviteOpen}
          setIsOpen={setIsInviteOpen}
          children={<KaKaoShare />}
        />
      )}
      <MenuItem title="찜한 습관" path="/user/mypage/savedhabit" />
      <MenuItem title="내가 만든 습관" path="/user/mypage/madehabit" />
      <div
        className={menuStyle}
        onClick={() => {
          setIsCertActive(!isCertActive);
        }}
      >
        <span>인증서 발급</span>
        <div className="pr-5 ">
          <SlArrowRight className="inline align-middle dark:bg-white" />
        </div>
      </div>
      {isCertActive && <CertDropDown success={successArr} />}
      <div
        className={menuStyle}
        onClick={() => {
          setIsInviteOpen(!isInviteOpen);
        }}
      >
        <span>친구 초대하기</span>
        <div className="pr-5 ">
          <SlArrowRight className="inline align-middle dark:bg-white" />
        </div>
      </div>
      {/* TODO : 고객센터 추가 */}
      <MenuItem title="고객 센터" path="/user/mypage" />
      <MenuItem title="회원 정보 수정" path="/user/mypage/edit" />
      <LogOut title="로그아웃" path="/" />
      <MenuItem
        title="회원탈퇴"
        path={`/user/mypage/withdraw?email=${email}`}
      />
    </div>
  );
};
