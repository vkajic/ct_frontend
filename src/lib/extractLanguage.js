function extract(arr, lang) {
  return arr.map((s) => {
    const translation = (s.translations && s.translations.length) ? s.translations
      .find(t => t.languageId === lang) : null;
    return {
      ...s,
      name: translation ? translation.displayTranslation : '',
    };
  });
}

export default extract;
