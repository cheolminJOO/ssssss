import React from 'react';
import { Button } from '@/components/ui/button';
import { PWInputWithLabel } from '../Input/passwordInput';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../Validator/Validation';
import { EmailInputWithLabel } from '../Input/emailInput';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

interface IProps {
  email: string;
  password: string;
}

const Body = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IProps>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onClickSignUP = () => {
    router.push('/SignUp');
  };

  const onClickLoginBtn = (data: IProps) => {
    console.log(data);
    if (
      localStorage.getItem('email') === data.email &&
      localStorage.getItem('password') === data.password
    ) {
      Swal.fire({
        title: '환영합니다',
        html: `${data.email}님 ! <br/> 주철민님의 포트폴리오로 이동됩니다 :)`,
        icon: 'success',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          window.open('https://min-portfolio-ky2q.vercel.app/', '_blank');
        }
      });
    } else if (
      localStorage.getItem('email') === data.email &&
      localStorage.getItem('password') !== data.password
    ) {
      Swal.fire({
        title: 'Error !!',
        text: '비밀번호가 일치하지 않아요. 다시 확인해주세요 :)',
        icon: 'error',
        confirmButtonText: '확인',
      });
    } else {
      Swal.fire({
        title: 'Error !!!',
        text: '아이디가 존재하지 않아요 다시 확인 부탁드려요 :)',
        icon: 'question',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onClickLoginBtn)}>
      <div className='flex justify-center items-center h-[800px]'>
        <div className='flex rounded-full justify-center items-center flex-col border-4 w-[500px] h-[600px] p-10'>
          <div>
            <h1 className='text-2xl font-bold text-center'>로그인</h1>
          </div>

          <div className='flex justify-center items-center flex-col'>
            <EmailInputWithLabel register={register} errors={errors} />
            <PWInputWithLabel register={register} errors={errors} />
          </div>
          <div className='mt-[10px] flex justify-center items-center'>
            <Button onClick={onClickSignUP} type='button' className='mr-2'>
              회원가입
            </Button>
            <Button type='submit'>로그인</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Body;
