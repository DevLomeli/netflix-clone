import { Provider } from "react-redux";
import App from "./components/App";

import store from "./redux/store";
const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
