import { helpers } from 'vuelidate/lib/validators';

export default param => helpers.withParams({ type: 'richTextMaxCharacters', max: param }, (value) => {
  if (value) {
    const stripped = value.replace(/(<([^>]+)>)/gi, '');
    return stripped.length <= param;
  }

  return true;
});
