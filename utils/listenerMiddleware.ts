import { setSearch } from '@/redux/SearchSlice/SearchSlice';
import { createListenerMiddleware } from '@reduxjs/toolkit';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setSearch,
  effect: (action) => {
    const searchText = action.payload;
    if (searchText) localStorage.setItem('searchText', searchText);
    else localStorage.removeItem('searchText');
    console.log('Данные search сохранены в localStorage');
  },
});

export default listenerMiddleware;
