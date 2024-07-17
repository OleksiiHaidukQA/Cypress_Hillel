const randomize = require('randomatic');

export class GenerateChars {
    getRandomName(length) {
        return `${randomize('Aa', length)}`;
    };

    getRandomEmail(length) {
        return `${randomize('aa', length)}@mailinator.com`
    };

    getRandomPassword(length) {
        return `${randomize('Aa0!', length)}`;
    };
}