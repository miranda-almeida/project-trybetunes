import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  // seta estado inicial da pesquisa inserida (input vazio)
  state = {
    searchInput: '',
    // adiciona pesquisa, array de resultados e carregamento
    searched: '',
    results: [],
    loading: false,
  };

  // função que define estados de acordo com requisição assíncrona (recebe pesquisa e busca em API)
  whenClicking = async () => {
    const { searchInput } = this.state;
    this.setState({ searchInput: '' });
    this.setState({ loading: true }, async () => {
      const returns = await searchAlbumsAPI(searchInput);
      this.setState({ loading: false, results: returns });
    });
  };

  render() {
    // define constante para evitar magic number
    const MIN_LENGTH = 2;
    // desestrutura chaves do estado inicial
    const { searchInput, searched, results, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {/* caso o componente de carregamento não esteja rodando, mostrar input e botão */}
        { !loading && (
          <div>
            <input
              data-testid="search-artist-input"
              // indica e desestrutura o valor inserido como valor da chave para a lógica de habilitação do botão
              onChange={ ({ target: { value } }) => {
                this.setState({ searchInput: value, searched: value });
              } }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              // seta a condição mínima de dois caracteres para habilitar o botão
              disabled={ searchInput.length < MIN_LENGTH }
              // indica função para executar busca em API ao clicar o botão
              onClick={ this.whenClicking }
            >
              Pesquisar
            </button>
          </div>
        )}
        {/* na condição de loading ser chamada enquanto aguarda retorno da promise, exibir componente de carregamento */}
        { loading && <Loading />}

        {/* cria nova div para exibição de resultados de pesquisa */}
        <div>
          {results.length > 0
            ? (
              <div>
                <p>{`Resultado de álbuns de: ${searched}`}</p>
                { results.map((album) => (
                  <div key={ album.artistId }>
                    <img
                      src={ album.artworkUrl100 }
                      alt={ `Arte da capa do álbum ${album.collectionName}` }
                    />
                    <h1>{ album.collectionName }</h1>
                    <h3>{ album.releaseDate }</h3>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Abrir álbum
                    </Link>
                  </div>
                ))}
              </div>
            )
            : (<h3>Nenhum álbum foi encontrado</h3>)}
        </div>
      </div>
    );
  }
}
