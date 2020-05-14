import zxcvbn from 'zxcvbn';

export default (value) => {
  if (value) {
    const res = zxcvbn(value);

    return res.score >= 3;
  }

  return false;
};
