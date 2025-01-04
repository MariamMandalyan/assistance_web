
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../store/store';
import { getMe } from '../../store/authSlice';

type Props = {
  children?: React.ReactNode;
};

const PrivatePage: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(getMe());
      navigate('/chat')
    } else {
      navigate('/');
    }
  }, [accessToken]);

  return <div style={{ width: '100%' }}>{children}</div>;
};

export default PrivatePage;
