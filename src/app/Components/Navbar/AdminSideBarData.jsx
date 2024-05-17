import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const AdminSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome color='black' />,
    cName: 'nav-text'
  },
  {
    title: 'Student List',
    path: '/studentlist',
    icon: <IoIcons.IoIosPaper color='black' />,
    cName: 'nav-text'
  },


];