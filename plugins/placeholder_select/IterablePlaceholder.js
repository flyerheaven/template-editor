import PlaceholderBase from './PlaceholderBase.js';

export default class IterablePlaceholder extends PlaceholderBase {
  getPlaceholder() {
    return '% for ' + this.data + ' %} <br/><br/>{% endfor %}';
  }

  getWidgets() {}
}
