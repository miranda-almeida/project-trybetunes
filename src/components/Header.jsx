import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  // seta estado inicial de usuário (objeto vazio) e carregamento de página (falso)
  state = {
    user: {},
    loading: false,
  };

  // utiliza ciclo de vida do react para retornar username após validação assíncrona do usuário
  componentDidMount() {
    this.showUser();
  }

  // função que captura assincronamente o retono da API getUser para validar carregamento da página e usuário a ser exibido
  showUser = () => {
    this.setState({ loading: true }, async () => {
      const username = await getUser();
      this.setState({ user: username, loading: false });
    });
  };

  render() {
    // desestrutura chaves do estado inicial
    const { user, loading } = this.state;
    return (
      <div data-testid="header-component">
        {/* ternário para verificar a condição de exibição do componente de carregamento ou nome de usuário */}
        {loading ? (
          <Loading />)
          : (
            <h2 data-testid="header-user-name">
              {user.name}
            </h2>
          )}
        <Link data-testid="link-to-search" to="/search">
          Search
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          Favorites
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          Profile
        </Link>
      </div>
    );
  }
}
