import React from 'react';
import { ModeToggle } from '../darkMode';

const Header = () => {
  return (
    <div className='flex justify-end'>
      <ModeToggle />
    </div>
  );
};

export default Header;
