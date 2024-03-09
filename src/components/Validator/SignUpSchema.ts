import { z } from 'zod';

const phoneRegex = /^010\d{8}$/;
const regex_pwd =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: '최소 두 글자 이상 입력하세요' }),
  email: z
    .string()
    .min(1, { message: 'this filed has to be filled' })
    .email({ message: 'invalid email address' }),
  phone: z.string().regex(phoneRegex, 'invalid PhoneNumber'),
});

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        regex_pwd,
        '최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다'
      ),
    checkPassword: z
      .string()
      .regex(
        regex_pwd,
        '최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다'
      ),
  })
  .superRefine(({ checkPassword, password }, ctx) => {
    if (checkPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다',
        path: ['checkPassword'],
      });
    }
  });
