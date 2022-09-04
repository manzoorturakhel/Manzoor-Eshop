class APIFeatures {
  constructor(queryString, query) {
    (this.queryString = queryString), (this.query = query);
  }

  sort() {
    if (this.queryString.sort) {
      const sort = this.queryString.sort.split(",").join(" ");

      this.query.sort(sort);
    } else {
      this.query.sort("-createdAt");
    }
  }
  search() {
    if (this.queryString.search) {
      const searchTerm = this.queryString.search.split(",")[0];
      this.query.find({ name: { $regex: `${searchTerm}`, $options: "i" } });
    }
  }
  category() {
    if (this.queryString.category) {
      this.query.find().where({ category: this.queryString.category });
    }
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;

    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);
  }
}

module.exports = APIFeatures;
