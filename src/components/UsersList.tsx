import { Sort, User } from '../types/user';

interface Props {
  users: User[];
  showColor: boolean;
  handleDelete: (uuid: string) => void
  handleSort: (sort: Sort) => void
}

const UsersList = ({ users, showColor, handleDelete, handleSort }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th onClick={() => handleSort(Sort.NAME)}>Name</th>
          <th onClick={() => handleSort(Sort.LASTNAME)}>Lastname</th>
          <th onClick={() => handleSort(Sort.COUNTRY)}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ picture, name, location, login }, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555';

          return (
            <tr key={login.uuid} style={{ backgroundColor: showColor ? backgroundColor : '' }}>
              <td>
                <img src={picture.thumbnail} alt={`${name.first} ${name.last}`} />
              </td>
              <td>{name.first}</td>
              <td>{name.last}</td>
              <td>{location.country}</td>
              <td>
                <button onClick={() => handleDelete(login.uuid)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersList;
