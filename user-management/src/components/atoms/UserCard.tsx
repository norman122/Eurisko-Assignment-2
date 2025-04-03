import React from 'react';

type UserProps = {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        status: 'active' | 'locked';
        dob: string;
    }
};

const UserCard: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md ">
      <div className="flex items-center justify-center mb-4 ">
        <div className="rounded-full text-white w-12 h-12 flex items-center justify-center text-xl" style={{backgroundColor: '#3251D0'}}>
          {`${user.firstName && user.firstName[0].toUpperCase()}${user.lastName && user.lastName[0].toUpperCase()}`}
        </div>
      </div>
      <div className="flex flex-col items-start space-y-0 w-max">
        <h2 className="text-l font-semibold">{user.firstName} {user.lastName}</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className={"text-sm text-gray-600"}>Status: {user.status}</p>
        <p className="text-gray-500 text-sm">Date of Birth: {user.dob}</p>
      </div>
      <div className="flex justify-end mt-4 ">
        <button className="text-white border rounded px-4 py-2 mr-2" style={{backgroundColor: '#3251D0', borderColor: '#3251D0'}}>Edit</button>
        <button className="text-white border bg-red-500 rounded px-4 py-2" style={{borderColor: '#ff0000'}}>Delete</button>
      </div>
    </div>
  );
};

export { UserCard };
