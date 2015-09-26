var TempStore = GIBE.collections.TempStore;

var image = {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/IPhone_5.png/96px-IPhone_5.png",
    caption: "iphone"
    }

var image2 = {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/IPhone_5.png/96px-IPhone_5.png",
    caption: "cloudsight"
    }


Template.history.helpers({
  images: [image, image2]
});
