import Link from 'next/link';
import React from 'react';

interface Props {
}

const Header: React.FC<Props> = ({}) => {
  return (
    <div>
      <Link href={'/'}>chorditure</Link>
    </div>
  )
}

export default Header;