const mapElements = document.querySelectorAll('.map');

if (mapElements.length) {
  mapElements.forEach((mapElement) => {
    initMap(mapElement);
  })
}

async function initMap(mapElement) {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const map = new YMap(
    mapElement,
    {
      location: {
        center: [37.678718, 55.735028],
        zoom: 11,
      },
      behaviors: [
        'drag', // разрешаем перетаскивание
        // 'scrollZoom' - убираем скролл-зум
        // 'dblClickZoom' - убираем зум по двойному клику
        // 'multiTouch' - убираем мультитач-зум (для мобильных)
      ]
    }
  );

  // Добавляем базовые слои (обязательно ДО добавления маркеров)
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // Создаём HTML-элемент маркера
  const markerElement = document.createElement("a");
  markerElement.href = "https://yandex.com/maps/-/CPbrJW7K";
  markerElement.target = "_blank";
  markerElement.rel = "noopener noreferrer";
  markerElement.className = "map-marker";

  const icon = document.createElement("img");
  icon.src = "./images/map-icon.svg";
  icon.alt = "Метка карты";
  markerElement.appendChild(icon);

  const marker = new YMapMarker(
    {
      coordinates: [37.678000, 55.745000]
    },
    markerElement
  );

  map.addChild(marker);
}
