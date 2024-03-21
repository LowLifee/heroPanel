const initialState = {
   heroes: [],
   heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
   switch (action.type) {
      case 'HEROES_FETCHING':
         return {
            ...state,
            heroesLoadingStatus: 'loading'
         }
      case 'HEROES_FETCHED':
         return {
            ...state,
            heroes: action.payload,
            // ЭТО МОЖНО СДЕЛАТЬ И ПО ДРУГОМУ
            // Я специально показываю вариант с действиями тут, но более правильный вариант
            // будет показан в следующем уроке
            filteredHeroes: state.activeFilter === 'all' ?
               action.payload :
               action.payload.filter(item => item.element === state.activeFilter),
            heroesLoadingStatus: 'idle'
         }
      case 'HEROES_FETCHING_ERROR':
         return {
            ...state,
            heroesLoadingStatus: 'error'
         }

      case 'HERO_CREATED':
         return {
            ...state,
            heroes: [...state.heroes, action.payload]

         }
      case 'HERO_DELETED':
         return {
            ...state,
            heroes: state.heroes.filter(item => item.id !== action.payload)
         }
      default: return state
   }
}

export default heroes;