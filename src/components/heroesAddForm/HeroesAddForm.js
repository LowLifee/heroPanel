import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from 'react-redux';
import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');
    const [option, setOption] = useState([]);

    const dispatch = useDispatch();

    const { request } = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(res => setOption(res))
            .catch(() => console.log('error rendering option'));
    }, [])

    const onChange = useCallback((e) => {
        const target = e.target;
        switch (target.getAttribute('data-form')) {
            case 'name':
                return setName(target.value);
            case 'derection':
                return setDescription(target.value);
            case 'element':
                return setElement(target.value);
            default: throw new Error('unexpected value');
        }
    }, [name, description, element]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(heroesFetching());
        const newHero = {
            name,
            description,
            element,
            id: uuidv4()
        };

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(() => console.log('sent'))
            .catch(() => dispatch(heroesFetchingError()));

        request("http://localhost:3001/heroes")
            .then(res => dispatch(heroesFetched(res)))
            .catch(() => dispatch(heroesFetchingError()));

        setName('');
        setDescription('');
        setElement('')

    }, [name, description, element]);

    const renderOption = useCallback((options) => {

        const element = options.map((item, i) => {
            let text = '';

            switch (item) {
                case 'fire':
                    text = 'Огонь';
                    break;
                case 'water':
                    text = 'Вода';
                    break;
                case 'wind':
                    text = 'Ветер';
                    break;
                case 'earth':
                    text = 'Земля';
                    break;
                default:
                    text = null;
            }

            switch (item) {
                case 'fire':
                    return <option key={i} value={item}>{text}</option>
                case 'water':
                    return <option key={i} value={item}>{text}</option>
                case 'wind':
                    return <option key={i} value={item}>{text}</option>
                case 'earth':
                    return <option key={i} value={item}>{text}</option>
                default:
                    text = null;
            }
        })

        return element;
    }, [])

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    data-form='name'
                    value={name}
                    onChange={(e) => onChange(e)} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    data-form='derection'
                    value={description}
                    onChange={(e) => onChange(e)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    data-form='element'
                    onChange={(e) => onChange(e)}
                    value={element}>
                    <option >Я владею элементом...</option>
                    {renderOption(option)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;