import React from 'react';
import { Button } from '../ui/button';

function Footer() {
  const openGitHub = (e) => {
    e.preventDefault(); 
    window.open('https://github.com/jasmineanand', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="footer min-h-32 w-full flex text-muted-foreground items-center justify-center p-4">
      <h1>
        <Button variant="link" onClick={openGitHub}>
          <p className='sm:font-semibold sm:text-lg text-muted-foreground border-b-2'>
            Made by Jasmine Anand
          </p>
        </Button>
      </h1>
    </div>
  );
}

export default Footer;