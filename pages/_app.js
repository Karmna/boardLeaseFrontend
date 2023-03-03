import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import user from "../reducers/user";
import filter from "../reducers/filter";
import search from "../reducers/search";
import surfs from "../reducers/surfs";
import post from "../reducers/post";
import favorites from "../reducers/favorites";

const reducers = combineReducers({ user, filter, search, surfs, favorites, post });


const persistConfig = { key: "boardLease", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>BoardLease</title>
        </Head>
        <Header />
        <Component {...pageProps} />      
        <Footer/> 
      </PersistGate>
    </Provider>
  );
}

export default App;
