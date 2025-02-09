const Alexa = require('ask-sdk-core');
const https = require('https');

// URL del JSON en jsDelivr
const JSON_URL = "https://cdn.jsdelivr.net/gh/dragonmoon1522/Pastillas-Inspiradoras/frases.json";

// Función para obtener una frase aleatoria del JSON
function getFraseAleatoria() {
    return new Promise((resolve, reject) => {
        https.get(JSON_URL, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const frases = JSON.parse(data);
                    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
                    resolve(`${fraseAleatoria.texto} - ${fraseAleatoria.autor}`);
                } catch (error) {
                    reject("Hubo un problema al procesar las frases.");
                }
            });
        }).on('error', (err) => {
            reject("No pude obtener las frases en este momento.");
        });
    });
}

// Handler para lanzar la skill
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = "Te doy la bienvenida a Pastillas Inspiradoras. Pide una frase de inspiración para comenzar.";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt("Dime si quieres una frase o si prefieres salir.")
            .getResponse();
    }
};

// Handler para el Intent de obtener una frase
const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'FrasesIntent';
    },
    async handle(handlerInput) {
        try {
            const frase = await getFraseAleatoria();
            const response = `${frase} ¿Quieres otra frase o prefieres salir?`;

            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            sessionAttributes.lastResponse = frase;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

            return handlerInput.responseBuilder
                .speak(response)
                .reprompt("Dime si quieres otra frase o podemos cerrar la skill.") // Mantiene la sesión abierta
                .getResponse();
        } catch (error) {
            return handlerInput.responseBuilder
                .speak("No pude obtener una frase en este momento. ¿Quieres intentarlo de nuevo?")
                .reprompt("Puedes decir 'Dame una frase' para intentarlo otra vez.")
                .getResponse();
        }
    }
};

// Handler para el RepeatIntent
const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const lastResponse = sessionAttributes.lastResponse || "No tengo nada para repetir en este momento. Pídeme una frase inspiradora.";

        return handlerInput.responseBuilder
            .speak(`${lastResponse} ¿Quieres otra frase o prefieres salir?`)
            .reprompt("Dime si quieres otra frase o podemos cerrar la skill.")
            .getResponse();
    }
};

// Handler para el HelpIntent
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = "Puedes pedirme una frase inspiradora diciendo 'Dame una frase'. ¿Quieres que te diga una frase ahora?";
        const repromptText = "Dime si quieres una frase inspiradora o prefieres salir.";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText) // Mantiene la sesión abierta
            .getResponse();
    }
};

// Handler para salir de la skill con un mensaje de despedida
const StopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent');
    },
    handle(handlerInput) {
        const speechText = "Gracias por usar Pastillas Inspiradoras. ¡Nos vemos pronto!";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true) // Esto asegura que la sesión se cierre correctamente
            .getResponse();
    }
};


// Handler para manejar el cierre de sesión de Alexa
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Sesión terminada: ${handlerInput.requestEnvelope.request.reason}`);

        // No se necesita respuesta verbal aquí
        return handlerInput.responseBuilder
            .withShouldEndSession(true)
            .getResponse();
    }
};

// Handler para respuestas inesperadas
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("Lo siento, no entendí eso. Puedes pedirme una frase de inspiración o decir 'cerrar' para salir.")
            .reprompt("¿Quieres una frase de inspiración o prefieres salir?")
            .getResponse();
    }
};

// Registro de los handlers en la skill
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FrasesIntentHandler,
        RepeatIntentHandler,  
        HelpIntentHandler,  
        StopIntentHandler,
        SessionEndedRequestHandler,
        FallbackIntentHandler
    )
    .lambda();
