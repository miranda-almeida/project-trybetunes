import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  // seta estado inicial da checkbox e carregamento (falsos)
  state = {
    checked: false,
    loading: false,
  };

  // determina ação de confirmar checkbox apenas depois do retorno da promise de addSong

  whenClicked = async ({ target: value }) => {
    const { object } = this.props;
    const filter = object.find((id) => id.trackId === value);
    this.setState({ loading: true });
    await addSong(filter);
    this.setState({ checked: true, loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <>
              <h4>{ trackName }</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                .
                <code>audio</code>
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  id={ trackId }
                  checked={ checked }
                  onChange={ this.whenClicked }
                />
              </label>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
