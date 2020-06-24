import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchData } from "../../fetchData";

const Wrapper = styled.div`
  border: 1px solid black;
  margin: 20px;
  padding: 10px;
  width: 200px;
  font-size: 12px;
`;

const UsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default class Users extends React.Component {
  state = {
    users: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetchData("https://jsonplaceholder.typicode.com/users?mode=no-cors")
      .then((res) => {
        this.setState({ users: res, isLoading: false });
      })
      .catch((error) => alert(error));
  }

  render() {
    const { users, isLoading } = this.state;

    return (
      <div>
        <h1>Users</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <UsersContainer>
            {users.map((user) => (
              <Wrapper key={user.id}>
                <Link to={`/albums/${user.id}`}>{user.name}</Link>
              </Wrapper>
            ))}
          </UsersContainer>
        )}
      </div>
    );
  }
}
