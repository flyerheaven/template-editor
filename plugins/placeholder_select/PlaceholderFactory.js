import Placeholder from './Placeholder.js';
import IterablePlaceholder from './IterablePlaceholder.js';

export default class PlaceholderFactory {
  static build(data) {
    const placeholders = [];

    switch (data.type) {
      case 'iterable':
        // e.g. order in orders
        placeholders.push(
          new IterablePlaceholder(
            data.placeholders[0].split('.')[0] + ' in ' + data.name
          )
        );
        break;
    }
    data.placeholders.forEach((placeholder) => {
      placeholders.push(new Placeholder(placeholder));
    });

    return placeholders;
  }
}
