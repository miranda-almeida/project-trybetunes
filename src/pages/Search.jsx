import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  // seta estado inicial da pesquisa inserida (input vazio)
  state = {
    searchInput: '',
  };

  render() {
    // define constante para evitar magic number
    const MIN_LENGTH = 2;
    // desestrutura chave do estado inicial
    const { searchInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <input
          data-testid="search-artist-input"
          // indica e desestrutura o valor inserido como valor da chave para a lógica de habilitação do botão
          onChange={ ({ target: { value } }) => this.setState({ searchInput: value }) }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          // seta a condição mínima de dois caracteres para habilitar o botão
          disabled={ searchInput.length < MIN_LENGTH }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
