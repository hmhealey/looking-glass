const SCRYFALL_API = 'https://api.scryfall.com';

export class Client {
    constructor(api = SCRYFALL_API) {

        this.api = api;
    }

    getAllSets() {
        const url = '/sets';
        return this.fetch(url);
    }

    getSet(code) {
        const url = `/sets/${code}`;
        return this.fetch(url);
    }

    getAllCards(page = 1) {
        const url = `/cards?page=${page}`;
        return this.fetch(url);
    }

    searchCards(query, page = 1, options) {
        let url = `/cards/search?q=${encodeURIComponent(query)}+page=${page}`;

        if (options) {
            if (options.unique) {
                url += `+unique=${options.unique}`;
            }

            if (options.order) {
                url += `+order=${options.order}`;
            }

            if (options.direction) {
                url += `+dir=${options.direction}`;
            }
        }

        return this.fetch(url);
    }

    getCardByName(name, options) {
        let url = '/cards/named';

        if (options && options.fuzzy) {
            url += `?fuzzy=${encodeURIComponent(name)}`;
        } else {
            url += `?exact=${encodeURIComponent(name)}`;
        }

        if (options && options.set) {
            url += `&set=${encodeURIComponent(options.set)}`;
        }

        return this.fetch(url);
    }

    getCards(identifiers) {
        const url = '/cards/collection';

        return this.fetch(url, {
            method: 'post',
            body: identifiers,
        });
    }

    autocompleteCardNames(query) {
        const url = `/cards/autocomplete?q=${encodeURIComponent(query)}`;
        return this.fetch(url);
    }

    getRandomCard() {
        const url = '/cards/random';
        return this.fetch(url);
    }

    getCardByID(id) {
        const url = `/cards/${encodeURIComponent(id)}`;
        return this.fetch(url);
    }

    async fetch(url, options = {}) {
        const response = await fetch(this.api + url, options);

        let data;
        try {
            data = await response.json();
        } catch {
            return {
                error: {
                    status: 0,
                    code: '',
                    details: 'Unable to deserialize json response'
                }
            };
        }

        if (!response.ok) {
            return {
                error: data
            };
        }

        return {
            data
        };
    }
}
