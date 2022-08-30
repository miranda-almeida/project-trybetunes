import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  // seta estado inicial de usuário inserido (input vazio), clique do botão e carregamento de página (falsos)
  state = {
    user: '',
    click: false,
    loading: false,
  };

  // função que define estados de acordo com requisição assíncrona (clique e carregamento de página)

  whenClicking = () => {
    this.setState({ click: true });
    const { user } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: user });
      this.setState({ loading: false });
    });
  };

  render() {
    // define constante para evitar magic number
    const MIN_LENGTH = 3;
    // desestrutura chaves do estado inicial
    const { user, loading, click } = this.state;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <input
          data-testid="login-name-input"
          type="text"
          // indica e desestrutura o valor inserido como valor da chave para leitura do userAPI
          onChange={ ({ target: { value } }) => this.setState({ user: value }) }
        />

        <button
          type="button"
          // chama a função de validação e retorno de usuário e carregamento
          onClick={ this.whenClicking }
          data-testid="login-submit-button"
          // seta a condição mínima de três caracteres para habilitar o botão
          disabled={ user.length < MIN_LENGTH }
        >
          Entrar
        </button>
        {/* verifica a necessidade de exibir o componente de carregamento */}
        {loading === true && (<Loading />)}
        {/* redireciona o usuário p/ página search caso o carregamento esteja completo */}
        {(!loading && click) && (<Redirect to="/search" />)}
      </div>
    );
  }
}
