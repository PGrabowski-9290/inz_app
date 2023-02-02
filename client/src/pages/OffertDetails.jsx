import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const OffertDetails = ({id}) => {
  const location = useLocation()
  return (
    <div>OffertDetails: {location?.state.id}</div>
  )
}

export default OffertDetails