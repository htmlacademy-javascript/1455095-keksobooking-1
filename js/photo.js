
const AVATAR_DEFAULT_PATH = 'img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const photoContainer = document.querySelector('.ad-form__photo-container');
const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  const array = Array.from(photoChooser.files);
  array.forEach((element) => {
    const file = element;
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      const photoPreviewClone = photoPreview.cloneNode(true);
      photoPreview.remove();
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      photoPreviewClone.append(img);
      photoContainer.append(photoPreviewClone);
    }
  });
});

export function resetPhoto(){
  avatarPreview.src = AVATAR_DEFAULT_PATH;
  const photos = document.querySelectorAll('.ad-form__photo');
  photos.forEach(((item) => {
    item.remove();
  }));
  photoContainer.append(photoPreview);
}
