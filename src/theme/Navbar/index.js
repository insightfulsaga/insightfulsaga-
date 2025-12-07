import React from 'react';
import Navbar from '@theme-original/Navbar';
import TechBar from '../../components/TechBar';

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      <TechBar />
    </>
  );
}
