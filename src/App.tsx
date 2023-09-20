import { useEffect, useRef, useState, useMemo } from 'react';
import './App.css';
import { Sort, User } from './types/user';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColor, setShowColor] = useState<boolean>(false);
  const [sort, setSort] = useState<Sort>(Sort.NONE);
  const [countryFilter, setCountryFilter] = useState<string>('');
  const originalUsers = useRef<User[]>([]);

  const toggleColor = () => {
    setShowColor(!showColor);
  };

  const toggleSortByCountry = () => {
    const updatedSort = sort === Sort.NONE ? Sort.COUNTRY : Sort.NONE;
    setSort(updatedSort);
  };

  const handleSort = (sort: Sort) => {
    setSort(sort);
  };

  const handleRestore = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (uuid: string) => {
    const updatedUsers = users.filter((user) => user.login.uuid != uuid);
    setUsers(updatedUsers);
  };

  const handleCountryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCountryFilter(e.target.value);
  };

  const filteredUsers = useMemo(
    () =>
      countryFilter && countryFilter.length > 0
        ? users.filter((user) =>
            user.location.country
              .toLowerCase()
              .includes(countryFilter.toLowerCase())
          )
        : users,
    [users, countryFilter]
  );

  const sortedList = useMemo(() => {
    switch (sort) {
      case Sort.COUNTRY:
        return [...filteredUsers].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        );
      case Sort.NAME:
        return [...filteredUsers].sort((a, b) =>
          a.name.first.localeCompare(b.name.first)
        );
      case Sort.LASTNAME:
        return [...filteredUsers].sort((a, b) =>
          a.name.last.localeCompare(b.name.last)
        );
      default:
        return filteredUsers;
    }
  }, [filteredUsers, sort]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      });
  }, []);

  return (
    <>
      <header>
        <button onClick={toggleColor}>Change color</button>
        <button onClick={toggleSortByCountry}>Sort by country</button>
        <button onClick={handleRestore}>Restore list</button>

        <input
          type='text'
          value={countryFilter}
          onChange={(e) => handleCountryFilter(e)}
          placeholder='Filter by country'
        />
      </header>
      <main>
        <UsersList
          users={sortedList}
          showColor={showColor}
          handleDelete={handleDelete}
          handleSort={handleSort}
        />
      </main>
    </>
  );
}

export default App;
