import Link from 'next/link';
import React from 'react';

interface Props {
}

const Header: React.FC<Props> = ({}) => {
  return (
    <div className='py-2 flex justify-between items-center'>
      <Link href={'/'}>
        <img className='w-6' src="/logo.svg" alt="chorditure" />
      </Link>
      <Link href={'/editor'}>editor</Link>
    </div>
  )
}

export default Header;