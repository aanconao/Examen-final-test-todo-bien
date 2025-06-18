//Primero hacemos un Login sencillo para despues pasar lo a Index para que

import { FunctionComponent } from "preact";

const Login: FunctionComponent = () => {
  return (
    <div>
      <form method="GET" action="/">
        <input type="text" name="username" placeholder="Usuario" />
        <input type="password" name="password" placeholder="Contraseña" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
