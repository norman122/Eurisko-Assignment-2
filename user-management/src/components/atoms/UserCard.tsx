import React from 'react';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md ">
      <div className="flex items-center justify-center mb-4 ">
        <div className="rounded-full text-white w-12 h-12 flex items-center justify-center text-xl bg-primary">
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
        <button className="text-white border-primary bg-primary rounded px-4 py-2 mr-2 cursor-pointer">Edit</button>
        <button className="text-white border-red-500 bg-red-500 rounded px-4 py-2 cursor-pointer">Delete</button>
      </div>
    </div>
  );
};

export { UserCard };
