function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const randI = getRandomInt(9)



document.addEventListener('DOMContentLoaded', () => {
    const playlistCardsContainer = document.querySelector('.playlist-cards2');
    const songCardsContainer = document.querySelector('.song-cards');

    data.playlists.forEach((playlist) => {
        if (playlist.playlistID == randI){
            
            const card = document.createElement('div');
            card.classList.add('cardF');
            card.setAttribute('data-playlist-id', playlist.playlistID.toString());
            card.innerHTML = `<img src="${playlist.playlist_art}" alt="portadaP" class="portadaPlaylist">
                <div class="card-content">
                    <h3 class="playlistT">${playlist.playlist_name}</h3>
                    <p class="author">By ${playlist.playlist_creator}</p>
                </div>`;

            playlistCardsContainer.appendChild(card);

            
            playlist.songs.forEach((song) => {
                const songItem = document.createElement('div');
                card.classList.add('cardFS');
                songItem.innerHTML = `<img src="${song.cover_art}" alt="${song.title} Cover" class="song-cover">
                    <div class="song-info">
                        <span class="song-title">${song.title}</span>
                        <span class="song-artist">${song.artist}</span>
                        <div class="song-album">${song.album}</div>
                    </div>
                    <span class="song-duration">${song.duration}</span>`;
                    songCardsContainer.appendChild(songItem);
            });
        }
    });

});






