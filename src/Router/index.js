import React from 'react';
import { AuthProvider } from './AuthProvider';
import Router from '../Router/Router'

const Providers = ()=> {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
export default Providers;