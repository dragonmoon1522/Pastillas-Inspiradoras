# 💊 Pastillas Inspiradoras - Skill para Alexa

📢 **Skill de Alexa que ofrece frases motivacionales y de inspiración al azar.**  

📅 **Última actualización:** *07 de Febrero de 2025*

## 📌 **Descripción del Proyecto**
**Pastillas Inspiradoras** es una skill para Amazon Alexa que proporciona frases motivacionales para cada día.  
Solo di:  
🗣️ `"Alexa, abre Pastillas Inspiradoras"`  
Y recibirás una frase de inspiración aleatoria.

✔ Frases motivacionales de autores famosos.  
✔ Acceso a una base de datos actualizable sin modificar la skill.  
✔ Funciona en español de **España, México y Estados Unidos**.  
✔ Compatible con **Amazon Echo y la app de Alexa en smartphones**.  

---

## 🚀 **Cómo usar la Skill**
Puedes activarla diciendo:  
- **"Alexa, abre Pastillas Inspiradoras"**  
- **"Alexa, dame una frase de ánimo"**  
- **"Alexa, quiero una pastilla de inspiración"**  

Si quieres repetir la última frase que escuchaste, di:  
- **"Alexa, repite la frase"**  

Para salir, puedes decir:  
- **"Alexa, salir"** o **"Alexa, cerrar skill"**  

---

## 📜 **Historial de Versiones**
Consulta el historial de cambios en:  
🔗 **[📜 Historial de versiones](./version.md)**  

---

## 🛠 **Instalación y Código Fuente**
El código fuente de esta skill está disponible en este repositorio.  
Para contribuir o modificar el código, sigue estos pasos:

### 1️⃣ **Requisitos**
- Cuenta en **Amazon Developer Console**.  
- Node.js con el SDK de Alexa (`ask-sdk-core`).  
- Editor de código (VS Code, Sublime Text, etc.).  

### 2️⃣ **Archivos Importantes**
📂 `skill-alexa.js` → Código principal de la skill.  
📂 `frases.json` → Archivo con frases motivacionales (se aloja en jsDelivr).  
📂 `version.md` → Registro de versiones y mejoras.  

### 3️⃣ **Cómo modificar las frases**
Para agregar más frases a la skill sin modificar el código:  
1. **Edita el archivo `frases.json` en GitHub.**  
2. **Las frases deben seguir este formato:**  

```json
[
    { "texto": "El éxito es ir de fracaso en fracaso sin perder el entusiasmo.", "autor": "Winston Churchill" },
    { "texto": "Haz lo que puedas, con lo que tengas, donde estés.", "autor": "Theodore Roosevelt" }
]
```
3. **Guarda los cambios y la skill usará automáticamente las frases nuevas.**  

---

## 🔒 **Política de Privacidad**
Esta skill **no almacena datos personales** ni requiere permisos adicionales.  
🔗 **[📄 Política de Privacidad](https://dragonmoon1522.github.io/Pastillas-Inspiradoras/Politica%20de%20Privacidad)**  

---

## 🎨 **Próximas Mejoras**
✅ **Añadir más frases inspiradoras.**  
✅ **Optimizar tiempos de respuesta en Alexa.**  
✅ **Mejorar la interacción para usuarios nuevos.**  

---

## 💜 **Agradecimientos**
Desarrollado por **Katherine Vargas** [(KathWare)](https://kathware.com.ar).  
Con el apoyo de la comunidad de desarrollo accesible.  

📢 **¡Gracias por probar "Pastillas Inspiradoras"!**
