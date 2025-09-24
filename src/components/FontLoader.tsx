import React, { useEffect, useState } from 'react';

interface FontLoaderProps {
  children: React.ReactNode;
}

export default function FontLoader({ children }: FontLoaderProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Check if custom fonts are available
        await document.fonts.load('400 16px CustomTelugu');
        await document.fonts.load('500 16px CustomTelugu');
        await document.fonts.load('700 16px CustomTelugu');
        
        setFontsLoaded(true);
      } catch (error) {
        console.log('Custom fonts not available, using fallback fonts');
        setFontsLoaded(true);
      }
    };

    // Check if fonts are already loaded
    if (document.fonts.check('400 16px CustomTelugu')) {
      setFontsLoaded(true);
    } else {
      loadFonts();
    }
  }, []);

  return (
    <div className={`${fontsLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      {children}
    </div>
  );
}