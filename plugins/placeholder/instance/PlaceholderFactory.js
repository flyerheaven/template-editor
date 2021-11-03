import Placeholder from "./Placeholder.js";
import IterablePlaceholder from "./IterablePlaceholder.js";

export default class PlaceholderFactory{

    static build(data) {
        const placeholders = [];

        switch (data.type) {
            case 'iterable':
                // e.g. order in orders
                const name = data.placeholders[0].split('.')[0] + ' in ' + data.name;
                placeholders.push(new IterablePlaceholder(name));
                break;
        }
        data.placeholders.forEach((placeholder, index) => {
            placeholders.push(new Placeholder(placeholder));
        });

        return placeholders;
    }
}
