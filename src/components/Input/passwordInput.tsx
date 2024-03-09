import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PWInputWithLabel(props: any) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='password'>Password</Label>
      <Input
        {...props.register('password')}
        type='password'
        id='password'
        placeholder='Password'
      />
      {!props.errors.password?.message && <div className='h-[25px]'></div>}
      {props.errors.password?.message && (
        <span className='text-red-500'>{props.errors.password?.message}</span>
      )}
    </div>
  );
}
