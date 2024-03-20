import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetching, heroesFiltered } from '../../actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const [selected, setSelected] = useState('all');

    const { heroes } = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(heroesFetching())
        const filtered = heroes.filter(heroes => {
            if (selected === 'all') {
                return true;
            } else {
                return heroes.element === selected
            }
        });
        dispatch(heroesFiltered(filtered))
    }, [selected, heroes])

    const onSelectFilter = useCallback((e) => {
        setSelected(e.target.getAttribute('data-filter'));

    }, [selected]);

    const all = classNames({
        'btn': true,
        'btn-outline-dark': true,
        'active': selected === 'all'
    });

    const fire = classNames({
        'btn': true,
        'btn-danger': true,
        'active': selected === 'fire'
    });

    const water = classNames({
        'btn': true,
        'btn-primary': true,
        'active': selected === 'water'
    });

    const wind = classNames({
        'btn': true,
        'btn-success': true,
        'active': selected === 'wind'
    });

    const earth = classNames({
        'btn': true,
        'btn-secondary': true,
        'active': selected === 'earth'
    });

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={(e) => onSelectFilter(e)} data-filter="all" className={all}>Все</button>
                    <button onClick={(e) => onSelectFilter(e)} data-filter="fire" className={fire}>Огонь</button>
                    <button onClick={(e) => onSelectFilter(e)} data-filter="water" className={water}>Вода</button>
                    <button onClick={(e) => onSelectFilter(e)} data-filter="wind" className={wind}>Ветер</button>
                    <button onClick={(e) => onSelectFilter(e)} data-filter="earth" className={earth}>Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;


{/*<button data-filter="all" className="btn btn-outline-dark active">Все</button>
<button data-filter="fire" className="btn btn-danger">Огонь</button>
<button data-filter="water" className="btn btn-primary">Вода</button>
<button data-filter="wind" className="btn btn-success">Ветер</button>
<button data-filter="earth" className="btn btn-secondary">Земля</button>*/}