const axios = require('axios')
const twilio = require('twilio')
require('dotenv').config()

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const sendMessage = async (body, to, from) => {
    const client = twilio(accountSid, authToken)
    client.messages.create({
            to,
            from,
            body,
        })
        .then(message => console.log('message sent successfully', message))
        .catch(error => console.log('Messae not sent , an error occured', error))
}



const getMadCurrencyRate = async (numbers) => {
    const url = `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_TOKEN}&format=1`
    const currency_data = await axios.get(url)
    const currentMadRate = currency_data.data.rates.MAD
    const message = `Taux interbancaire actuel : 1 euro => ${currentMadRate} dirhams`
    numbers.map(number => sendMessage(message, number, process.env.TWILIO_NUMBER))
}

const numbers = process.env.NUMBERS.split(',')
getMadCurrencyRate(numbers)
