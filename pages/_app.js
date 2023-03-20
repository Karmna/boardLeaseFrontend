import styles from "../styles/globals.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import user from "../reducers/user";
import filter from "../reducers/filter";
import search from "../reducers/search";
import surfs from "../reducers/surfs";
import favorites from "../reducers/favorites";
import booking from "../reducers/booking";

import Layout from "../components/Layout";

const reducers = combineReducers({
  user,
  filter,
  search,
  surfs,
  favorites,
  booking,
});

const persistConfig = { key: "boardLease", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const appDisplay = !matches ? (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>BoardLease : location de surfboards entre particuliers</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.733)",
      }}
    >
      <FontAwesomeIcon
        className={styles.iconDisplayError}
        icon={faMobileScreen}
        size="10x"
        style={{ color: "#060c5c" }}
      />
      <div style={{ fontSize: "35px", color: "white", marginTop: "3%" }}>
        Votre fenêtre est trop grande.
      </div>
      <div
        style={{
          fontSize: "25px",
          color: "white",
          marginTop: "1%",
          textAlign: "center",
        }}
      >
        Ce site est optimisé pour une utilisation sur appareils mobiles,
        <br /> réduisez votre fenêtre à moins de 768 pixels pour accéder aux
        ressources.
      </div>
    </div>
  );
  return <div>{appDisplay}</div>;
}

export default App;
