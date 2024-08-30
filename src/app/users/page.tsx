"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Members from '@/components/Members';

interface User {
  id: string;
  name: string;
  email: string;
  cargo: 'Membro' | 'Produtor' | 'Gerenciador' | 'Administrador';
}

export default function UsersPage(){
  return (
    <>
    <Header />
    <Members />
    <Footer />
    </>
  )
}