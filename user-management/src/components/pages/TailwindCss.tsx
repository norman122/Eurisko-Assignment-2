import React from 'react';
import { UserCard } from "../atoms/UserCard"; 

const TailwindCss: React.FC = () => {
  return (
    <div className="w-full pt-1 pb-4 pl-4 pr-4">
      <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <UserCard user={{firstName: "John", lastName: "Doe", email: "john@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Jane", lastName: "Smith", email: "jane@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Alice", lastName: "Johnson", email: "alice@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Bob", lastName: "", email: "bob@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Charlie", lastName: "Davis", email: "charlie@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Diana", lastName: "Evans", email: "diana@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Eve", lastName: "Carter", email: "eve@example.com", status: "locked", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "David", lastName: "Lee", email: "david@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Eva", lastName: "Walker", email: "eva@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Frank", lastName: "White", email: "frank@example.com", status: "locked", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Grace", lastName: "Black", email: "grace@example.com", status: "active", dob: "1990-01-01"}} />
        <UserCard user={{firstName: "Herman", lastName: "Wright", email: "herman@example.com", status: "active", dob: "1990-01-01"}} />
      </div>
    </div>
  );
};

export { TailwindCss };
