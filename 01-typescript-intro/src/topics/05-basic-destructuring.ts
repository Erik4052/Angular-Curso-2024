interface AudioPlayer {
    audioVolume: number;
    song: string;
    songDuration: number;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 100,
    song: 'Bohemian Rhapsody',
    songDuration: 367,
    details: {
        author: "Alexander Abreu",
        year: 2012
    }
}

const song = 'New song';
// Destructuring
//const { song:anotherSong, songDuration:duration, details } = audioPlayer;
//console.log(audioVolume, song, songDuration, author, year);
/* console.log(anotherSong, duration);
console.log(details.author, details.year); */

const [,,p3]: string[] = ['Goku', 'Vegeta', 'Gohan', 'Trunks', 'Goten'];
console.log( p3);








export {}