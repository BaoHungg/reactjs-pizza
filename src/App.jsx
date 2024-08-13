import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import { Header } from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Pizza from "./Components/Pizza/Pizza";
import PizzaDetail from "./Components/PizzaDetail/PizzaDetail";
import MyY from "./Components/MyY/MyY";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import UserInfo from "./Components/UserInfo/UserInfo";
import Checkout from "./Components/Checkout/Checkout";
import OrderDetail from "./Components/OrderDetail/OrderDetail";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Pizza" element={<Pizza/>}></Route>
          <Route path="/Pizza/:categoryId" element={<Pizza/>}></Route>
          <Route path="/PizzaDetail/:pizzaId" element={<PizzaDetail/>}></Route>
          <Route path="/MyY" element={<MyY/>}></Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Cart" element={<Cart/>}></Route>
          <Route path="/UserInfo" element={<UserInfo/>}></Route>
          <Route path="/Checkout" element={<Checkout/>}></Route>
          <Route path="/OrderDetail" element={<OrderDetail/>}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
