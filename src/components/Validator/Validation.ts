import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
const regex_pwd =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;

export const loginSchema = z.object({
  email: z.string().regex(emailRegex, { message: '이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .regex(regex_pwd, { message: '비밀번호는 특수문자와 함께 써주세요' }),
});
