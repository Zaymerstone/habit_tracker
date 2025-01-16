import "../styles/global.css"
import { ToastContainer } from "react-toastify";
import AppRouter from "./router/components/app-router.comp";
import { store } from "./store";
import { Provider } from "react-redux";


function App() {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <ToastContainer
        position="top-center" // Позиция в левом нижнем углу
        autoClose={3000} // Время автоматического закрытия (3 секунды)
        hideProgressBar={true} // Убрать анимацию прогресс-бара
        closeOnClick={true} // Закрыть при клике на уведомление
        pauseOnHover={true} // Пауза при наведении мыши
        draggable={true} // Возможность перетягивать тосты курсором
        limit={3}
      />
    </>
  );
}

export default App;
