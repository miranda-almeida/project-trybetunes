import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  // seta estado inicial da lista de músicas a ser preenchida pelo retorno da API (array vazio)
  state = {
    songs: [],
  };

  // utiliza ciclo de vida do react para retornar as músicas após validação assíncrona do álbum selecionado
  componentDidMount() {
    this.catchSongs();
  }

  // função que captura assincronamente o retono da musicsAPI para validar músicas a serem exibidas

  catchSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const getSongs = await getMusics(id);
    this.setState({ songs: getSongs });
  };

  render() {
    const { songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
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
              />
            )
          ))
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
