import axios from 'axios';
import { useState } from 'react';
import styles from './App.module.css';
import RangeInput, { useRangeInput } from './components/RangeInput';

const apiKey = 'k_2pw3cpr8';

export default function App() {
    const raiting = useRangeInput();

    const [result, setResult] = useState();
    const [wait, setWait] = useState(false);

    const search = async () => {
        setWait(true);
        const params = {};
        if (raiting.min !== '' && raiting.max !== '') {
            params.user_rating = raiting.min + ',' + raiting.max;
        }
        const res = await axios.get(`https://imdb-api.com/API/AdvancedSearch/${apiKey}`, {
            params,
        });
        setResult(res.data.results);
        setWait(false);
    }

    return (
        <div className={styles.main}>
            <RangeInput title="Рейтинг" {...raiting} />
            {wait ? 'Загрузка...' : <button onClick={search}>Поиск</button>}
            <div className={styles.films}>
                {result && result.map((film, i) => (
                    <div key={i} className={styles.film}>
                        <h4>{film.title}</h4>
                        <div className={styles.filmImageBlock}>
                            <img className={styles.filmImage} width="200px" src={film.image} alt='Poster' />
                        </div>
                        <div>
                            Content Rating: {film.contentRating}
                        </div>
                        <div>
                            Description: {film.description}
                        </div>
                        <div>
                            Жанры: {film.genres}
                        </div>
                        <div>
                            imDb Rating: {film.imDbRating}
                        </div>
                        <div>
                            imDb Голосов: {film.imDbRatingVotes}
                        </div>
                        <div>
                            Metacritic Rating: {film.metacriticRating}
                        </div>
                        <div>
                            plot: <p>{film.plot}</p>
                        </div>
                        <div>
                            Продолжительность: {film.runtimeStr}
                        </div>
                        <div>
                            Актеры: {film.stars}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
