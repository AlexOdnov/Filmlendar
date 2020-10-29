export class OpenStreetMap {
  constructor(mapLink, selector = '.open-street-map') {
    this.mapContainer = document.querySelector(selector);
    this.mapLink = mapLink;
    this.mapInitializer = this.mapInitializer.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('scroll', this.mapInitializer);
    this.mapInitializer();
  }

  mapCreate() {
    this.map = document.createElement('iframe');
    this.map.width = this.mapContainer.offsetWidth;
    this.map.height = this.mapContainer.offsetHeight;
    this.map.scrolling = 'no';
    this.map.frameBorder = '0';
    this.map.src = this.mapLink;
    this.mapContainer.append(this.map);
  }

  mapUpdate() {
    this.map.width = this.mapContainer.offsetWidth;
    this.map.height = this.mapContainer.offsetHeight;
  }

  mapInitializer() {
    const mapCoord = this.mapContainer.getBoundingClientRect().top;
    const windowHeight = document.documentElement.clientHeight;
    if (mapCoord <= windowHeight * 2) {
      this.mapCreate();
      window.removeEventListener('scroll', this.mapInitializer);
      window.addEventListener('resize', this.mapUpdate.bind(this));
    }
  }
}
