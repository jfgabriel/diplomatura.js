/* ## 3. Delay con callbacks

- Experimentar con la función setTimeout para que muestre un mensaje después de 3000 milisegundos.
   ```
   setTimeout(() =>  {.... do something ...}, delay_in_milliseconds);
   ```

- Crear una función `delay` que tome dos parámetros `mensaje` y `milisegundos` y muestre un mensaje después del tiempo indicado.
   
- Crear una función `run` con el siguiente código

   ```
   console.log(1);
   delay('Terminó 1', 1000);
   console.log(2);
   delay('Terminó 2', 1000);
   console.log(3);
   delay('Terminó 3', 1000);
  ```

  Luego invocarla con `run()`. ¿Cuál es el resultado?

- Modificar nuestra función `run` con el siguiente código. Ejecutarla y observar el resultado.

   ```
   console.log(1);
   delay('Terminó 1', 3000);
   console.log(2);
   delay('Terminó 2', 2000);
   console.log(3);
   delay('Terminó 3', 1000);
   ``` */

   export const delay1=()=>{
    console.log("esperar 3 segundos");
    setTimeout(()=>console.log("Listo, ya pasaron 3 segundos"),3000);
   }
   export const delay2=(mensaje,tiempo)=>{
      setTimeout(()=>console.log(mensaje),tiempo);
   }
   export const run=()=>{
      console.log(1);
      delay2('Terminó 1', 1000);
      console.log(2);
      delay2('Terminó 2', 1000);
      console.log(3);
      delay2('Terminó 3', 1000);
   }
   export const run2=()=>{
      console.log(1);
      delay2('Terminó 1', 3000);
      console.log(2);
      delay2('Terminó 2', 2000);
      console.log(3);
      delay2('Terminó 3', 1000);
   }