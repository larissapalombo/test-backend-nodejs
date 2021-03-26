const validateProduct = async (req, res, next) => {
  const { title, description, price, category } = req.body;

  if (title === '') {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"title" cannot be empty',
      },
    });
  }

  if (description === '') {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"description" cannot be empty',
      },
    });
  }

  if (price === '') {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"price" cannot be empty',
      },
    });
  }

  if (category === '') {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"category" cannot be empty',
      },
    });
  }

  if (price && !Number(price)) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"price" must be a number in format 0.00',
      },
    });
  }

  next();
};

module.exports = { validateProduct };
