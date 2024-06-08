const overlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
let lastPlaylistId = 9;
/* Trash */
let trashedElements = [];


const getContent = (playlist) => {
    const modalH = document.createElement('div');
    modalH.classList.add('modal-header');
    modalH.innerHTML = `<img src="${playlist.playlist_art}" alt="portadaP" class="portadaPlaylist">
        <div class="info">
            <h3 class="playlistT">${playlist.playlist_name}</h3>
            <p class="author">By ${playlist.playlist_creator}</p>
        </div>`;

    //const shuffleButton = document.querySelector('.Shuffle');
    const shuffleButton = document.createElement("button");
    shuffleButton.className = "Shuffle";
    shuffleButton.innerText = "Shuffle";
    shuffleButton.addEventListener("click", () => {
        shuffleSongs(playlist.songs, modalContent);
    });

    

    modalH.appendChild(shuffleButton);

    //Update Modal
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.innerHTML = "";
    modalContent.appendChild(modalH);
    modalContent.appendChild(modalBody);
    addSongs(playlist.songs, modalContent);


    

    


    //const element = document.getElementById("shuffle");
    //element.addEventListener("click", shuffleSongs(playlist.songs, modalContent));

    
};

// ****************************************
function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
}


const shuffleSongs = (songs, modalContent) => {
    const songsList = document.createElement('ul');

    shuffle(songs);
    
    songs.forEach((song) => {
        const songItem = document.createElement('li');
        songItem.innerHTML = `<img src="${song.cover_art}" alt="${song.title} Cover" class="song-cover">
            <div class="song-info">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist}</span>
                <span class="song-album">${song.album}</span>
            </div>
            <span class="song-duration">${song.duration}</span>`;
        songsList.appendChild(songItem);
    });
    
    const songsList2 = modalContent.querySelector('.modal-body ul');
    // revisar si existe
    if (songsList2) {
        modalContent.querySelector('.modal-body').replaceChild(songsList, songsList2);
    } else {
        modalContent.querySelector('.modal-body').appendChild(songsList);
    }

};  





//const element = document.getElementById("shuffle");
//if (element) {
//    element.addEventListener("click", shuffleSongs(playlist.songs, modalContent));
//}



// ****************************************




const addSongs = (songs, modalContent) => {
    const songsList = document.createElement('ul');
    songs.forEach((song) => {
        const songItem = document.createElement('li');
        songItem.innerHTML = `<img src="${song.cover_art}" alt="${song.title} Cover" class="song-cover">
            <div class="song-info">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist}</span>
                <span class="song-album">${song.album}</span>
            </div>
            <span class="song-duration">${song.duration}</span>`;
        songsList.appendChild(songItem);
    });
    
    const songsList2 = modalContent.querySelector('.modal-body ul');
    // revisar si existe
    if (songsList2) {
        modalContent.querySelector('.modal-body').replaceChild(songsList, songsList2);
    } else {
        modalContent.querySelector('.modal-body').appendChild(songsList);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const playlistCardsContainer = document.querySelector('.playlist-cards');

    document.getElementById('new-playlist').addEventListener('submit', handlePlaylistSubmit);

    data.playlists.forEach((playlist) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-playlist-id', playlist.playlistID.toString());
        card.innerHTML = `<img src="${playlist.playlist_art}" alt="portadaP" class="portadaPlaylist">
            <div class="card-content">
                <h3 class="playlistT">${playlist.playlist_name}</h3>
                <p class="author">By ${playlist.playlist_creator}</p>

                <p class="ID">${playlist.playlistID}</p>

                <div class="card-stats">
                    <input type="checkbox" id="like-${playlist.playlistID}" class="like-checkbox" aria-label="like this playlist" />
                    <label for="like-${playlist.playlistID}" class="heart-icon"><h2>♥</h2></label>
                    <span class="like-count">${playlist.likeCount}</span>

                    <input type="checkbox" id="trash-${playlist.playlistID}" class="trash-checkbox" aria-label="trash this playlist" />
                    <label for="trash-${playlist.playlistID}" class="trash-icon">🗑️</label>
                </div>
            </div>`;


        if(!trashedElements.includes(playlist.playlistID)){
            playlistCardsContainer.appendChild(card);
        }
        
    });


    document.getElementById('reload').addEventListener('click', reloadPlaylist);
    
    trashAction(); // TODO: rename to addeventlisteners for trash
    likeAction();
    playlistAction();
    
});

/* */
const reloadPlaylist = () => {
    const playlistCardsContainer = document.querySelector('.playlist-cards');
    // get all cards
    //let oldCards = playlistCardsContainer.querySelector(".card");
    //for (let i = 0; i < oldCards.length; i++) {
    //    oldCards[i].remove()
    //}

    document.querySelector('.playlist-cards').innerHTML = "";
    

    data.playlists.forEach((playlist) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-playlist-id', playlist.playlistID.toString());
        card.innerHTML = `<img src="${playlist.playlist_art}" alt="portadaP" class="portadaPlaylist">
            <div class="card-content">
                <h3 class="playlistT">${playlist.playlist_name}</h3>
                <p class="author">By ${playlist.playlist_creator}</p>

                <p class="ID">${playlist.playlistID}</p>

                <div class="card-stats">
                    <input type="checkbox" id="like-${playlist.playlistID}" class="like-checkbox" aria-label="like this playlist" />
                    <label for="like-${playlist.playlistID}" class="heart-icon"><h2>♥</h2></label>
                    <span class="like-count">${playlist.likeCount}</span>

                    <input type="checkbox" id="trash-${playlist.playlistID}" class="trash-checkbox" aria-label="trash this playlist" />
                    <label for="trash-${playlist.playlistID}" class="trash-icon">🗑️</label>
                </div>
            </div>`;


        if(!trashedElements.includes(playlist.playlistID)){
            playlistCardsContainer.appendChild(card);

            playlistAction();
            likeAction();
        }
        
    });
}


overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});



const playlistAction = () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const playlistId = parseInt(card.getAttribute('data-playlist-id'));
            const playlist = data.playlists.find((p) => p.playlistID === playlistId);
            if (!playlist) return;
            getContent(playlist);
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
};


const likeAction = () => {

    document.querySelectorAll('.like-checkbox').forEach((checkbox) => {

        
        


        const parentElement = checkbox.closest('.card-content');
        
        const likeCountElement = parentElement.querySelector('.like-count');


        checkbox.addEventListener('change', () => {
            
            let likeCount = parseInt(likeCountElement.textContent);
            likeCount = checkbox.checked ? likeCount + 1 : likeCount - 1
            likeCountElement.textContent = likeCount;

            

            if(checkbox.checked ){
                checkbox.nextElementSibling.style.color = "red";
            } else{
                checkbox.nextElementSibling.style.color = "black";
            }
            
        });
    });
};



// Revisar
const trashAction = () => {
    document.querySelectorAll('.trash-checkbox').forEach((checkbox) => {

        checkbox.addEventListener('change', () => {
            if(checkbox.checked ){
                const parentElement = checkbox.closest('.card-content');
                const trashNow = parentElement.querySelector('.ID');
                console.log(parseInt(trashNow.textContent));

                trashedElements.push(parseInt(trashNow.textContent));

                console.log(trashedElements)

            } else{
                console.log("click");
            }
        });
    });
};

// ************************************

function handlePlaylistSubmit(event) {
    
    event.preventDefault();
    const title = document.getElementById('playlist-title').value;
    const author = document.getElementById('author').value;
    const image = document.getElementById('image').value;

    // Increment the lastReviewId for the new review
    lastPlaylistId += 1;


    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-playlist-id', lastPlaylistId.toString());
    card.innerHTML = `<img src="${image}" alt="portadaP" class="portadaPlaylist">
        <div class="card-content">
            <h3 class="playlistT">${title}</h3>
            <p class="author">By ${author}</p>
                <div class="card-stats">
                <input type="checkbox" id="like-${lastPlaylistId}" class="like-checkbox" aria-label="Like this playlist" />
                <label for="like-${lastPlaylistId}" class="heart-icon"><h2>♥</h2></label>
                <span class="like-count">${0}</span>

                <input type="checkbox" id="trash-${lastPlaylistId}" class="trash-checkbox" aria-label="trash this playlist" />
                <label for="trash-${lastPlaylistId}" class="trash-icon">🗑️</label>
            </div>
        </div>`;


    const playlistCardsContainer = document.querySelector('.playlist-cards');
    playlistCardsContainer.insertBefore(card, playlistCardsContainer.firstChild);






}


/* ************************************************************************************************* */

function mySearchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    ul = document.querySelectorAll('.card')

    let nameList = []
    
    ul.forEach(ele => nameList.push(ele.innerText))

    for (i = 0; i < nameList.length; i++) {
        txtValue = nameList[i];
        //console.log(txtValue)
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            ul[i].style.display = "";
        } else {
            ul[i].style.display = "none";
        }
    }
}



