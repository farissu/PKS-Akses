import React from 'react';

const Alert = ({ message }:any) => {
  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">{message}</strong>
    </div>
  )
}

export default Alert;