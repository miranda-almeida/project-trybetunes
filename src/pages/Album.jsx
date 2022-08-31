import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  // seta estado inicial da lista de músicas a ser preenchida pelo retorno da API, favoritadas (arrays vazios) e carregamento (falso)
  // adiciona chaves de favoritados (array) e carregamento (falso) para retornar o estado de músicas salvas mais adiante
  state = {
    songs: [],
    favorited: [],
    loading: false,
  };

  // utiliza ciclo de vida do react para retornar as músicas após validação assíncrona do álbum selecionado
  // adiciona função catchFavorites() para retornar as músicas favoritadas
  componentDidMount() {
    this.catchSongs();
    this.catchFavorites();
  }

  // função que captura assincronamente o retono da musicsAPI para validar músicas a serem exibidas

  catchSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const getSongs = await getMusics(id);
    this.setState({ songs: getSongs });
  };

  // função que captura assincronamente as músicas favoritadas

  catchFavorites = async () => {
    const favorite = await getFavoriteSongs();
    const filter = favorite.map((song) => song.trackId);
    this.setState({ favorited: filter, loading: false });
  };

  render() {
    const { songs, favorited, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        { loading ? <Loading /> : (
          <>
            { songs.length > 0 && (
              <div>
                {/* utiliza index [0] para capturar nome de artista e álbum */}
                <h1 data-testid="artist-name">{ songs[0].artistName }</h1>
                <h2 data-testid="album-name">{ songs[0].collectionName }</h2>
              </div>
            )}
            { songs.length > 0 && (
              songs.map((music, index) => (
                index > 0 && (
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    object={ songs }
                    // adiciona condição de exibir checked marcado caso já tenha sido favoritado anteriormente
                    checked={ favorited.find((song) => song === music.trackId) }
                  />
                )
              ))
            )}
          </>
        )}
      </div>
    );
  }
}

// propTypes obrigatórias
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
