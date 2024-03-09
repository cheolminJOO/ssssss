import { PasswordSchema } from '@/components/Validator/SignUpSchema';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

interface IProps {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

interface IPassword {
  password: string;
  checkPassword: string;
}

const SettingPW: React.FC<IProps> = ({ setNext, data }) => {
  const [image, setImage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassword>({
    resolver: zodResolver(PasswordSchema),
    mode: 'onChange',
  });

  const onClickBackBtn = () => {
    setNext((prev) => !prev);
  };

  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onClickImgChange = () => {
    if (fileRef.current) {
      fileRef.current?.click();
    }
  };

  const onChangeImg = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === 'string')
        setImage(event.target?.result);
    };
  };

  const onSubmitData = (passoword: IPassword) => {
    Swal.fire({
      title: '반갑습니다',
      html: `이름: <span class='text-blue-500'>${data.name}</span><br/>
             이메일:  <span class='text-blue-500'>${data.email}</span><br/>
             핸드폰 번호:  <span class='text-blue-500'>${data.phone}</span>`,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
    localStorage.setItem('email', data.email);
    localStorage.setItem('password', passoword.password);
    router.push('/');
  };

  return (
    <div className='h-screen p-4 justify-between'>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <div className='h-[500px]'>
          <p className='mb-3 mt-3'>비밀번호</p>
          <input
            className='border w-full h-10 rounded-md ml-2'
            type='password'
            {...register('password')}
          />
          {!errors.password?.message && <div className='mb-[60px]'></div>}
          {errors.password?.message && (
            <span className='text-red-500'>{errors.password?.message}</span>
          )}
          <p className='mb-3 mt-3'>비밀번호 확인</p>
          <input
            className='border w-full h-10 rounded-md ml-2'
            type='password'
            {...register('checkPassword')}
          />
          {!errors.checkPassword?.message && <div className='mb-[60px]'></div>}
          {errors.checkPassword?.message && (
            <span className='text-red-500'>
              {errors.checkPassword?.message}
            </span>
          )}

          <p className='mb-3 mt-3'>프로필 이미지</p>
          <div className='flex justify-center items-center flex-col'>
            {image === '' && (
              <Image
                className='w-[200px] h-[200px]'
                src='avatar.png'
                alt='기본 이미지'
              />
            )}
            {image !== '' && (
              <Image className='w-[200px] h-[200px]' src={image} alt='이미지' />
            )}

            <button
              className='border-2 hover:text-purple-700 w-[150px] rounded-full'
              type='button'
              onClick={onClickImgChange}
            >
              이미지 변경
            </button>
            <input
              onChange={onChangeImg}
              type='file'
              ref={fileRef}
              className='hidden'
            />
          </div>
        </div>
        <div className=' h-[120px] flex justify-around items-end'>
          <button
            onClick={onClickBackBtn}
            className='border h-[40px] w-[80px] rounded-md text-[13px]'
          >
            이전으로
          </button>
          <Button type='submit' className='bg-primary text-primary-foreground'>
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingPW;
