import Interface from "./components/Interface";
import "./style.css"
import {useState} from "react";
import Reg from "./components/Reg";
import Auth from "./components/Auth";
import {Provider} from "react-redux";
import store from "./components/store/Store";

const App = () => {
    const REG = "reg";
    const AUTH = "auth";
    const MAILS = "mails";

    const [page, setPage] = useState(
        (localStorage.getItem("password") && localStorage.getItem("id")) ? MAILS : AUTH
    );

    const authorisation = () => {
        setPage(MAILS)
    }

    const toRegistration = () => {
        setPage(REG)
    }

    const toAuthorisation = () => {
        setPage(AUTH)
    }

    return (<Provider store={store}>
        <div className={"container"}>
            {page === MAILS ? <Interface toAuthorisation={toAuthorisation}/> : page === REG ?
                <Reg toAuthorisation={toAuthorisation} authorisation={authorisation}/> :
                <Auth toRegistration={toRegistration} authorisation={authorisation}/>}
        </div>
    </Provider>);
}

export default App;
