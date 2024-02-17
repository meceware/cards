'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default ( { children, ...props } ) => {
  const [ mounted, setMounted ] = useState( false );
  useEffect( () => {
    setMounted( true );
  }, [] );

  if ( ! mounted ) {
    return (
      <></>
    );
  }

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem { ...props }>
      { children }
    </ThemeProvider>
  );
};
