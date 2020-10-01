const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// O controller tem 5 funções:
// index (lista), show (unico), store (criar), update (alterar), destroy (deletar)

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        // verificando se já existe usurio com este username
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);
            // ".split(',')" = corta toda vez que tiver uma virgula = array
            // ".trim()"" = remove os espaços

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev);
    },

    // desafio:

    
    // async update() {
        // nome, avatar, bio, localização, tecnologias
    // },

    // async destroy() {

    // },
}